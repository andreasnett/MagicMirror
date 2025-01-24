Module.register("MMM-Dataverse", {
    defaults: {
        updateInterval: 60000,

        environment: "https://ingardiumleviosaacdc.crm4.dynamics.com",
        entity: "il_petses",
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.loaded = false;
        this.records = [];
        this.error = null;
        console.log("Initializing with config:", this.config); // Debug log
        this.sendSocketNotification("INIT", this.config);
        this.scheduleUpdate();
    },

    getDom: function() {
        const wrapper = document.createElement("div");
        wrapper.className = "dataverse-wrapper";

        if (this.error) {
            wrapper.innerHTML = `<div class="error-message">Error: ${this.error.message}</div>`;
            return wrapper;
        }

        if (!this.loaded) {
            wrapper.innerHTML = '<div class="loading-text">Loading Dataverse data...</div>';
            return wrapper;
        }

        if (!this.records || this.records.length === 0) {
            wrapper.innerHTML = '<div class="dimmed">No records found</div>';
            return wrapper;
        }

        const nifflerRecord = this.records.find(record => record.il_name === 'Niffler');
        
        if (!nifflerRecord) {
            wrapper.innerHTML = '<div class="dimmed">Niffler not found</div>';
            return wrapper;
        }

        const header = document.createElement("h2");
        header.innerHTML = nifflerRecord.il_name || "Name not found";
        wrapper.appendChild(header);

        const paragraph = document.createElement("p");
        paragraph.innerHTML = nifflerRecord.il_description || "Description not found";
        wrapper.appendChild(paragraph);

        return wrapper;
    },
    getStyles: function() {
        return ["MMM-Dataverse.css"];
    },

    scheduleUpdate: function() {
        this.sendSocketNotification("FETCH_RECORDS", this.config);
        setInterval(() => {
            this.sendSocketNotification("FETCH_RECORDS", this.config);
        }, this.config.updateInterval);
    },

    socketNotificationReceived: function(notification, payload) {
        console.log("Received notification:", notification, payload); // Debug log
        if (notification === "RECORDS_RESULT") {
            this.loaded = true;
            this.error = null;
            this.records = payload;
            this.updateDom();
        }
        if (notification === "ERROR") {
            this.loaded = true;
            this.error = payload;
            console.error("MMM-Dataverse ERROR:", payload);
            this.updateDom();
        }
    }
});
