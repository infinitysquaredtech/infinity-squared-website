AFRAME.registerComponent("controller", {
    init: function () {
        // this.modelVisible = false;
        // // track markerFound/markerLost
        // this.el.addEventListener("markerFound", () => this.modelVisible = true);
        // this.el.addEventListener("markerLost", () => this.modelVisible = false);
        // grab the model reference
        this.el.addEventListener('model-loaded', evt => {
            this.mesh = evt.detail.model
        })
        // hammerjs input helper
        const hammertime = new Hammer(document.body);

        // scale
        // scale is tricky, because it resets
        var currentScale = 1;
        hammertime.get('pinch').set({ enable: true });
        hammertime.on("pinchstart", (ev) => {
            currentScale = this.mesh.scale.x;
        })
        hammertime.on("pinchmove", (ev) => {
            // if (!this.modelVisible) return;
            this.mesh.scale.multiplyScalar(0).addScalar(ev.scale * currentScale);
        });

        // rotation
        // pan left/right for rotation
        this.isPanning = false;
        hammertime.on("panleft", () => {
            // if (!this.modelVisible) return;
            this.isPanning = true
            this.mesh.rotation.y -= 4 * Math.PI / 360;
        })
       
        hammertime.on("panright", () => {
            // if (!this.modelVisible) return;
            this.isPanning = true
            this.mesh.rotation.y += 4 * Math.PI / 360;
        })
        hammertime.on("panend", () => this.isPanning = false)
        hammertime.on("pancancel", () => this.isPanning = false)

        hammertime.on("swipeleft",  ({velocity}) => {
            // if (!this.modelVisible) return;
            this.swipeVelocity = velocity
        })
        hammertime.on("swiperight", ({velocity}) => {
            // if (!this.modelVisible) return;
            this.swipeVelocity = velocity
        })
    },
    tick: function() {
        if (!(this.swipeVelocity &&!this.isPanning)) return;
        this.mesh.rotation.y += this.swipeVelocity * 8 * Math.PI / 360;
        this.swipeVelocity *= 0.1;
        if (Math.abs(this.swipeVelocity) <= 1.5) this.swipeVelocity = 0;
    }
})