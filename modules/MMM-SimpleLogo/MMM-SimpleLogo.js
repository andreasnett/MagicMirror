Module.register("MMM-SimpleLogo", {
    // Default module config.
    defaults: {
        text: "",
        position: "left",
        width: "100%",
        height: "100%",
        refreshInterval: 0,
        imagePaths: ["https://i.imgur.com/fiti5Fl.jpeg"]
    },

    start: function() {
        this.imageIndex = 0;
        const cycleImages = () => {
            this.imageIndex = Math.floor(Math.random() * this.config.imagePaths.length);
            const img = document.querySelector(".simple-logo__container img");
            if (img) {
                img.setAttribute("src", this.config.imagePaths[this.imageIndex]);
            }
        };
        setInterval(cycleImages, 10000);
    },

    getStyles: function () {
        return [
            this.file('css/mmm-simplelogo.css')
        ];
    },

    notificationReceived: function(notification, payload) {
        if (notification == "SIMPLE_LOGO_UPDATE") {
            // stop auto-refresh (if any)
            if (this.config.refreshInterval > 0) {
                clearInterval(this.interval);
            }
            // update with new parameters
            for (var attr in payload) this.config[attr] = payload[attr];
            // restart auto-refresh (if any)
            this.start();
            this.updateDom();
        }
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.className = 'simple-logo__container';
        wrapper.classList.add(this.config.position);
        wrapper.style.width = this.config.width;
        wrapper.style.height = this.config.height;
        var text = document.createTextNode(this.config.text);
        wrapper.appendChild(text);
        var img = document.createElement("img");
        img.setAttribute('src', this.config.imagePaths[0]);
        wrapper.appendChild(img);
        return wrapper;
    }
});
