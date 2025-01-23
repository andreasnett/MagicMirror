Module.register("MMM-Dataverse", {
    defaults: {
        updateInterval: 60000,
        clientId: "",
        clientSecret: "",
        tenantId: "",
        environment: "",
        entity: "",
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

        const table = document.createElement("table");
        
        // Add header row
        const headerRow = document.createElement("tr");
        Object.keys(this.records[0]).forEach(key => {
            const th = document.createElement("th");
            th.innerHTML = key;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Add data rows
        this.records.forEach(record => {
            const row = document.createElement("tr");
            Object.values(record).forEach(value => {
                const cell = document.createElement("td");
                cell.innerHTML = value || "-";
                row.appendChild(cell);
            });
            table.appendChild(row);
        });

        wrapper.appendChild(table);
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
