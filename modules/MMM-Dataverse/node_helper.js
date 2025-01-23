const NodeHelper = require("node_helper");
const axios = require("axios");
const { ConfidentialClientApplication } = require("@azure/msal-node");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
        this.accessToken = null;
        this.msalClient = null;
    },

    initializeAuth: function(config) {
        console.log("Raw config received:", JSON.stringify({
            hasClientId: typeof config.clientId === 'string',
            clientIdValue: config.clientId,
            configKeys: Object.keys(config)
        }));

        // Strict validation
        if (typeof config.clientId !== 'string' || !config.clientId) {
            throw new Error(`Missing clientId (type: ${typeof config.clientId})`);
        }
        if (typeof config.clientSecret !== 'string' || !config.clientSecret) {
            throw new Error(`Missing clientSecret (type: ${typeof config.clientSecret})`);
        }
        if (typeof config.tenantId !== 'string' || !config.tenantId) {
            throw new Error(`Missing tenantId (type: ${typeof config.tenantId})`);
        }

        const msalConfig = {
            auth: {
                clientId: config.clientId,
                clientSecret: config.clientSecret,
                authority: `https://login.microsoftonline.com/${config.tenantId}`
            }
        };

        console.log("Creating MSAL config with:", {
            clientIdPresent: !!msalConfig.auth.clientId,
            clientSecretLength: msalConfig.auth.clientSecret?.length,
            authorityPresent: !!msalConfig.auth.authority
        });

        this.msalClient = new ConfidentialClientApplication(msalConfig);
        return true;
    },

    async getAccessToken() {
        try {
            const result = await this.msalClient.acquireTokenByClientCredential({
                scopes: [`${this.config.environment}/.default`]
            });
            return result.accessToken;
        } catch (error) {
            console.error("Error getting access token:", error);
            return null;
        }
    },

    async fetchRecords(config) {
        try {
            if (!this.msalClient) {
                throw new Error("Authentication not initialized");
            }

            const token = await this.getAccessToken();
            if (!token) {
                throw new Error("Failed to get access token");
            }

            console.log("Attempting to fetch records from:", config.environment);
            
            const response = await axios.get(
                `${config.environment}/api/data/v9.2/${config.entity}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    }
                }
            );

            console.log("Received records:", response.data);
            return response.data.value;
        } catch (error) {
            console.error("Error fetching records:", error.message);
            throw error;
        }
    },

    validateConfig: function() {
        if (!this.config.clientId || !this.config.clientSecret || !this.config.tenantId) {
            console.error("MMM-Dataverse: Missing required credentials");
            this.sendSocketNotification("ERROR", { message: "Missing required credentials" });
            return false;
        }
        console.log("MMM-Dataverse: Credentials validated successfully");
        return true;
    },

    socketNotificationReceived: async function(notification, payload) {
        if (notification === "INIT") {
            try {
                console.log("INIT received with payload:", {
                    payloadExists: !!payload,
                    payloadType: typeof payload,
                    keys: payload ? Object.keys(payload) : []
                });
                
                this.config = payload;
                const success = this.initializeAuth(this.config);
                if (!success) {
                    throw new Error("Auth initialization failed");
                }
            } catch (error) {
                console.error("Detailed auth error:", error);
                this.sendSocketNotification("ERROR", { 
                    message: error.message,
                    details: error.stack
                });
            }
        }
        
        if (notification === "FETCH_RECORDS") {
            try {
                if (!this.msalClient) {
                    throw new Error("Authentication not initialized");
                }
                const records = await this.fetchRecords(payload);
                this.sendSocketNotification("RECORDS_RESULT", records);
            } catch (error) {
                console.error("Error fetching records:", error);
                this.sendSocketNotification("ERROR", { message: error.message });
            }
        }
    }
});
