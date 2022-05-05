import './style.css'

import  Petit from './src/Petit';

		
let myPetit =  new Petit( document.getElementById('div-el'), {
	"nm": "Example of animation",
	"v": "0.1",
	"ip": 0,
	"op": 175,
	"fr": 24,
	"poster":20,
	"layers": [

		{ 
			"sel":"#line", 
			"kf": [
					 {"transform":"translateX(0) rotate(0deg)", "easing": "cubic-bezier(0,.5,1,.5)", "kft":0},
					 {"transform":"translateX(90vw) rotate(2700deg)", "easing": "cubic-bezier(0,.5,1,.5)", "kft":80}
			]
		},{ 
			"sel":".triangle", 
			"kf": [
					 {"transform":"translateX(0) rotate(0deg)", "kft":20},
					 {"transform":"translateX(90vw) rotate(2700deg)", "background":"#555", "kft":100}
			]
		},{ 
			"sel":"#square", 
			"kf": [
					 {"transform":"translateX(0) rotate(0deg)", "kft":40},
					 {"transform":"translateX(90vw) rotate(2700deg)", "kft":120}
			], 
			"t": {
				"duration": 3360, 
				"fill": "forwards", 
				"delay": 1680, 
				"endDelay": 1680
			
			}
		},{ 
			"sel":"#pentagone", 
			"kf": [
					 {"transform":"translateX(0) rotate(0deg)", "kft":60},
					 {"transform":"translateX(90vw) rotate(2700deg)", "background":"red", "kft":140}
			]
		},{ 
			"sel":"#hexablink", 
			"kf": [
					 {"opacity":0, "easing": "ease-in-out", "kft":0},
					 {"opacity":1, "kft":100}
			], 
			"t": {
				"duration": 500, 
				"fill": "both", 
				"delay": 0, 
				"direction":"alternate-reverse",
				"iterations": "Infinity"
			
			}
		},{ 
			"sel":"#hexagone", 
			"kf": [
					 {"transform":"translateX(0) rotate(0deg)", "easing": "ease-in-out", "kft":80},
					 {"transform":"translateX(90vw) rotate(2700deg)", "kft":160}
			]
		 },{ 
			"sel":"#spring", 
			"kf": [
					 {"kft":75},
					 {"kft":95},
					 {"kft":115},
					 {"kft":135},
					 {"kft":155}
			]
		},{ 
			"sel":"#waterdrop", 
			"kf": [
					 {"kft":0},
					 {"kft":20},
					 {"kft":40},
					 {"kft":60},
					 {"kft":80}
				]
		},{ 
			"sel":"#counting", 
			"kf": [
					 {"kft":0}
				]
		}
	]
})
window.myPetit = myPetit;
document.getElementById('div-el').addEventListener("ended", () => {
	myPetit.playAll();
});
myPetit.playAll();
