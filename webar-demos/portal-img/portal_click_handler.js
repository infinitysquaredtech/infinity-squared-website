document.addEventListener("DOMContentLoaded", function() {
  // Mind-AR system
  const sceneEl = document.querySelector('a-scene');
	const arSystem = sceneEl.systems["mindar-image-system"];
	const Target = document.querySelector('#animated-target');
	//Buttons
	const clickButton1 = document.querySelector('#button1');
	const clickButton2 = document.querySelector('#button2');
	const clickButton3 = document.querySelector('#button3');
	// const clickButton4 = document.querySelector('#button4');
	const examplePlaneBack = document.querySelector('#example-back');
  
  //Circle buttons
  const cirButton1 = document.querySelector('#cir1');
	const cirButton2 = document.querySelector('#cir2');
	const cirButton3 = document.querySelector('#cir3');
	const cirButton4 = document.querySelector('#cir4');
  const cirButton5 = document.querySelector('#cir5');
  const cirButton6 = document.querySelector('#cir6');

	// Cicle Menu
	const circleMenu = document.querySelector("#circle_menu");

	// Video Component
	const transVid = document.querySelector("#currentVid");
	const vidComp = document.querySelector("#trans-vid");
  const ytVid = document.querySelector("#coverVid");
  const ytComp = document.querySelector("#cover-vid");
  
  //Info-screens
	const info_1 = document.querySelector('#info_1');
	const info_2 = document.querySelector('#info_2');
	const info_3 = document.querySelector('#info_3');
	const info_4 = document.querySelector('#info_4');

	// Video Links
	const vid2 = "https://cdn.glitch.global/62a13213-a377-46d0-b165-d649252152ec/brain_storm.webm?v=1669205859118";
	const vid1 = "https://cdn.glitch.global/62a13213-a377-46d0-b165-d649252152ec/brain.webm?v=1669205860448";
  const yt = "https://cdn.glitch.me/62a13213-a377-46d0-b165-d649252152ec/yt.webm?v=1703674827620"

	// 3D models
	const bottleModel = document.querySelector('#animated-bottle');
	const groundModel = document.querySelector('#animated-ground');
	const pillModel = document.querySelector('#animated-pill');
  const mortModel = document.querySelector('#animated-morter');
  const cover = document.querySelector('#cover-vid');
	// const examplePlaneBack = document.querySelector('#example-plane-back');
	// const header = document.querySelector('#header-title');
  
  sceneEl.addEventListener("arReady", (event) => {
	  console.log("MindAR is ready")
	});
	// arError event triggered when something went wrong. Mostly browser compatbility issue
	sceneEl.addEventListener("arError", (event) => {
	  console.log("MindAR failed to start")
	});

	// detect click event
	cirButton1.addEventListener("click", event => {
	  // console.log("button 1 click");
    
    info_1.setAttribute("visible", "true");
    info_1.setAttribute("animation", "property: scale; from: 0 0 0; to: 1 1 1; dur: 500;")

	  circleMenu.setAttribute("animation", "property: scale; to: 0 0 0; dur: 500;");

	  examplePlaneBack.setAttribute("visible", "true");
	});

	// detect click event
	cirButton2.addEventListener("click", event => {
	  // console.log("button 2 click");

	  clickButton1.setAttribute("visible", "true");
	  clickButton2.setAttribute("visible", "true");
	  clickButton3.setAttribute("visible", "true");

	  transVid.setAttribute("src", vid2);
	  vidComp.setAttribute("animation", "property: scale; to: 1 1 1; dur: 500;");

	  bottleModel.setAttribute("visible", "false");

	  circleMenu.setAttribute("animation", "property: scale; to: 0 0 0; dur: 500;");

	  examplePlaneBack.setAttribute("visible", "true");
	});

	// detect click event
	cirButton3.addEventListener("click", event => {
	  // console.log("button 3 click");
    
    info_4.setAttribute("visible", "true");
    info_4.setAttribute("animation", "property: scale; from: 0 0 0; to: 1 1 1; dur: 500;")

	  circleMenu.setAttribute("animation", "property: scale; to: 0 0 0; dur: 500;");

	  examplePlaneBack.setAttribute("visible", "true");
	});

	// detect click event
	cirButton4.addEventListener("click", event => {
	  // console.log("button 4 click");
    
    info_3.setAttribute("visible", "true");
    info_3.setAttribute("animation", "property: scale; from: 0 0 0; to: 1 1 1; dur: 500;")

	  pillModel.setAttribute("visible", "true");
	  pillModel.setAttribute("scale", "0.15 0.15 0.15");

	  bottleModel.setAttribute("visible", "false");

	  circleMenu.setAttribute("animation", "property: scale; to: 0 0 0; dur: 500;");

	  examplePlaneBack.setAttribute("visible", "true");
	});
  
  // detect click event
	cirButton5.addEventListener("click", event => {
	  // console.log("button 5 click");

	  bottleModel.setAttribute("visible", "false");
    
    ytVid.setAttribute("src", yt);
	  ytComp.setAttribute("animation", "property: scale; to: 1 1 1; dur: 500;");

	  circleMenu.setAttribute("animation", "property: scale; to: 0 0 0; dur: 500;");

	  examplePlaneBack.setAttribute("visible", "true");
	});
  
  // detect click event
	cirButton6.addEventListener("click", event => {
	  // console.log("button 4 click");

	  mortModel.setAttribute("visible", "true");
	  mortModel.setAttribute("scale", "0.49 0.49 0.49");
    
    info_2.setAttribute("visible", "true");
    info_2.setAttribute("animation", "property: scale; from: 0 0 0; to: 1 1 1; dur: 500;")

	  bottleModel.setAttribute("visible", "false");

	  circleMenu.setAttribute("animation", "property: scale; to: 0 0 0; dur: 500;");

	  examplePlaneBack.setAttribute("visible", "true");
	});

	examplePlaneBack.addEventListener("click", event => {
		// console.log("back button clicked!");

		clickButton1.setAttribute("visible", "false");
	  clickButton2.setAttribute("visible", "false");
	  clickButton3.setAttribute("visible", "false");
    
    info_1.setAttribute("visible", "false");
    info_1.setAttribute("animation", "property: scale; to: 0 0 0; dur: 500;")
    info_2.setAttribute("visible", "false");
    info_2.setAttribute("animation", "property: scale; to: 0 0 0; dur: 500;")
    info_3.setAttribute("visible", "false");
    info_3.setAttribute("animation", "property: scale; to: 0 0 0; dur: 500;")
    info_4.setAttribute("visible", "false");
    info_4.setAttribute("animation", "property: scale; to: 0 0 0; dur: 500;")

		bottleModel.setAttribute("visible", "true");

		pillModel.setAttribute("visible", "false");
		pillModel.setAttribute("scale", "0 0 0");
    
    mortModel.setAttribute("visible", "false");
		mortModel.setAttribute("scale", "0 0 0");
    
    ytVid.setAttribute("src", "");
  	ytComp.setAttribute("animation", "property: scale; to: 0 0 0; dur: 500");

		transVid.setAttribute("src", "");
  	vidComp.setAttribute("animation", "property: scale; to: 0 0 0; dur: 500");

		circleMenu.setAttribute("animation", "property: scale; to: 1 1 1; dur: 500;");
		examplePlaneBack.setAttribute("visible", "false");
	})
  
  // detect target found
  Target.addEventListener("targetFound", event => {
	  // console.log("target found");
    const visi = ytComp.getAttribute("visible")
    if(visi==true){
      ytVid.play();
    }
	});
    
  // detect target lost
	Target.addEventListener("targetLost", event => {
	  // console.log("target lost");
    const visi = ytComp.getAttribute("visible")
    if(visi==true){
      ytVid.pause();
    }
	});
  
});