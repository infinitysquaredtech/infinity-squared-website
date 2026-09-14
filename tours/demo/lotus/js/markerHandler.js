// Component for visibility fade with sliding/folding animation
AFRAME.registerComponent('visibility-fade', {
    schema: {
        fadeDuration: {type: 'number', default: 0.5},
        checkInterval: {type: 'number', default: 100},
        fovThreshold: {type: 'number', default: 60},
        animationType: {type: 'string', default: 'slide'}, // 'slide' or 'fold'
        targetPoint: {type: 'selector'}, // Target point to calculate angle from
        offsetX: {type: 'number', default: 0.5}, // Horizontal offset from target
        offsetY: {type: 'number', default: 0.6}, // Vertical offset from target
        offsetZ: {type: 'number', default: -0.5} // Depth offset from target
    },

    init: function() {
        this.camera = null;
        this.targetScale = 0;
        this.currentScale = 0;
        this.targetOpacity = 0;
        this.currentOpacity = 0;
        this.lastLoggedOpacity = 0;
        this.checkVisibility = this.checkVisibility.bind(this);
        this.slideContainer = null;
        this.positionSet = false;
        
        // Store original scale
        const scale = this.el.getAttribute('scale');
        this.originalScale = scale ? new THREE.Vector3(scale.x, scale.y, scale.z) : new THREE.Vector3(1, 1, 1);
        
        // Store original material properties
        this.el.addEventListener('loaded', () => {
            const material = this.el.getAttribute('material');
            if (material) {
                this.originalColor = material.color;
                // Ensure material is set to transparent
                this.el.setAttribute('material', 'transparent', true);
            }
            // Get slide container reference
            this.slideContainer = this.el.querySelector('#slide-container');
            
            // Set initial opacity to 0 for all materials
            this.el.object3D.traverse((node) => {
                if (node.material) {
                    node.material.opacity = 0;
                    node.material.transparent = true;
                    node.material.needsUpdate = true;
                }
            });
            
            // Set initial text opacity to 0
            const textEl = this.el.querySelector('a-text');
            if (textEl) {
                textEl.setAttribute('text', 'opacity', 0);
            }
            
            // Set initial scale to 0
            if (this.slideContainer) {
                this.slideContainer.object3D.scale.set(0, 1, 1);
            }
            
            // Auto-position marker relative to target point if not already positioned
            if (this.data.targetPoint && !this.positionSet) {
                this.autoPositionMarker();
                this.positionSet = true;
            }
            
            // console.log('Marker loaded, position:', this.el.getAttribute('position'));
        });
        
        // Wait for camera to be ready
        this.el.sceneEl.addEventListener('camera-set-active', (evt) => {
            this.camera = evt.detail.cameraEl;
        });
    },
    
    autoPositionMarker: function() {
        // Position marker relative to target point using offsets
        const targetPos = this.data.targetPoint.object3D.position;
        this.el.object3D.position.set(
            targetPos.x + this.data.offsetX,
            targetPos.y + this.data.offsetY,
            targetPos.z + this.data.offsetZ
        );
    },

    play: function() {
        this.interval = setInterval(this.checkVisibility, this.data.checkInterval);
    },

    pause: function() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    },

    checkVisibility: function() {
        if (!this.camera) {
            this.camera = document.querySelector('[camera]');
            if (!this.camera) return;
        }

        // Use target point position if specified, otherwise use marker position
        let referencePos;
        if (this.data.targetPoint) {
            referencePos = this.data.targetPoint.object3D.getWorldPosition(new THREE.Vector3());
        } else {
            referencePos = this.el.object3D.getWorldPosition(new THREE.Vector3());
        }
        
        const cameraPos = this.camera.object3D.getWorldPosition(new THREE.Vector3());
        const cameraDir = new THREE.Vector3();
        this.camera.object3D.getWorldDirection(cameraDir);

        // Vector from camera to reference point (target or marker)
        const toReference = new THREE.Vector3().subVectors(referencePos, cameraPos).normalize();
        
        // Calculate angle between camera direction and reference direction
        const angle = cameraDir.angleTo(toReference) * (180 / Math.PI);
        // console.log('Angle to reference point:', angle);
        
        // Set target opacity and scale based on field of view
        if (angle < this.data.fovThreshold) {
            this.targetOpacity = 0;
            this.targetScale = 0;
        } else {
            this.targetOpacity = 1;
            this.targetScale = 1;
        }
    },

    tick: function(time, deltaTime) {
        // Smooth transition
        const fadeSpeed = (deltaTime / 1000) / this.data.fadeDuration;
        
        // Update opacity
        if (this.currentOpacity < this.targetOpacity) {
            this.currentOpacity = Math.min(this.targetOpacity, this.currentOpacity + fadeSpeed);
        } else if (this.currentOpacity > this.targetOpacity) {
            this.currentOpacity = Math.max(this.targetOpacity, this.currentOpacity - fadeSpeed);
        }
        
        // Update scale for sliding/folding animation
        if (this.currentScale < this.targetScale) {
            this.currentScale = Math.min(this.targetScale, this.currentScale + fadeSpeed);
        } else if (this.currentScale > this.targetScale) {
            this.currentScale = Math.max(this.targetScale, this.currentScale - fadeSpeed);
        }

        // Apply scale animation to the slide container
        if (this.slideContainer) {
            if (this.data.animationType === 'slide') {
                // Slide from left to right by scaling the container
                this.slideContainer.object3D.scale.set(this.currentScale, 1, 1);
            } else if (this.data.animationType === 'fold') {
                // Fold effect (both horizontal and vertical)
                this.slideContainer.object3D.scale.set(this.currentScale, this.currentScale, 1);
            }
        }

        // Update material opacity for all children (plane)
        this.el.object3D.traverse((node) => {
            if (node.material) {
                node.material.opacity = this.currentOpacity;
                node.material.transparent = true;
                node.material.needsUpdate = true;
            }
        });
        
        // Update text opacity separately using A-Frame API
        const textEl = this.el.querySelector('a-text');
        if (textEl) {
            textEl.setAttribute('text', 'opacity', this.currentOpacity);
        }
        
        // Log only when opacity changes significantly
        if (Math.abs(this.currentOpacity - this.lastLoggedOpacity) > 0.1) {
            // console.log('Opacity changed to:', this.currentOpacity);
            this.lastLoggedOpacity = this.currentOpacity;
        }
    }
});

// Component for pulsing/blinking animation
AFRAME.registerComponent('pulse-target', {
    schema: {
        speed: {type: 'number', default: 1000},
        minScale: {type: 'number', default: 0.8},
        maxScale: {type: 'number', default: 1.2}
    },
    
    init: function() {
        this.time = 0;
    },
    
    tick: function(time, deltaTime) {
        this.time += deltaTime;
        const cycle = (Math.sin(this.time / this.data.speed) + 1) / 2; // 0 to 1
        const scale = this.data.minScale + (this.data.maxScale - this.data.minScale) * cycle;
        this.el.object3D.scale.set(scale, scale, scale);
        
        // Also pulse opacity
        const opacity = 0.6 + 0.4 * cycle;
        const material = this.el.getAttribute('material');
        if (material) {
            this.el.setAttribute('material', 'opacity', opacity);
        }
    }
});

// Component to draw a line from marker to target
AFRAME.registerComponent('pointer-line', {
    schema: {
        target: {type: 'selector'},
        color: {type: 'color', default: '#000000'},
        lineWidth: {type: 'number', default: 2}
    },
    
    init: function() {
        this.line = null;
        this.createLine();
    },
    
    createLine: function() {
        // Create line geometry
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(6); // 2 points x 3 coordinates
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        // Create line material
        const material = new THREE.LineBasicMaterial({
            color: new THREE.Color(this.data.color),
            linewidth: this.data.lineWidth,
            transparent: true
        });
        
        // Create line mesh
        this.line = new THREE.Line(geometry, material);
        this.el.object3D.add(this.line);
    },
    
    tick: function() {
        if (!this.data.target || !this.line) return;
        
        // Get positions
        const startPos = new THREE.Vector3();
        this.el.object3D.getWorldPosition(startPos);
        
        const endPos = new THREE.Vector3();
        this.data.target.object3D.getWorldPosition(endPos);
        
        // Convert to local space
        const localStart = this.el.object3D.parent.worldToLocal(startPos.clone());
        const localEnd = this.el.object3D.parent.worldToLocal(endPos.clone());
        
        // Update line geometry
        const positions = this.line.geometry.attributes.position.array;
        positions[0] = 0;
        positions[1] = 0;
        positions[2] = 0;
        positions[3] = localEnd.x - localStart.x;
        positions[4] = localEnd.y - localStart.y;
        positions[5] = localEnd.z - localStart.z;
        
        this.line.geometry.attributes.position.needsUpdate = true;
        
        // Match opacity with parent visibility-fade component
        const parent = this.el.closest('[visibility-fade]');
        if (parent && parent.components['visibility-fade']) {
            this.line.material.opacity = parent.components['visibility-fade'].currentOpacity;
        }
    }
});

// Component to make marker face the camera (billboard effect)
AFRAME.registerComponent('look-at-camera', {
    init: function() {
        this.camera = null;
    },
    
    tick: function() {
        if (!this.camera) {
            this.camera = document.querySelector('[camera]');
            if (!this.camera) return;
        }
        
        // Get camera position
        const cameraPos = new THREE.Vector3();
        this.camera.object3D.getWorldPosition(cameraPos);
        
        // Make the element look at the camera
        this.el.object3D.lookAt(cameraPos);
    }
});
