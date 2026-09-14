AFRAME.registerComponent('cloak', {
  init: function() {
    let geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4)
    // geometry.faces.splice(4, 2)
     let material = new THREE.MeshBasicMaterial({
        colorWrite: false
     })
     let mesh = new THREE.Mesh(geometry, material)
     this.el.object3D.add(mesh)
  }
})