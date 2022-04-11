export default class Petit {
	constructor (playerEl, petit) {
		this.version = 0.1;
		this.petit = petit;
		this.playerEl = playerEl;
		this.animations = [];
		//this.timings = [];
		this.isPlaying = false;
		//this.oldT= -1;
		this.normalSpeed = Math.round( 1000/( petit.fr ? petit.fr : 60 ) );

		petit.layers?.forEach((elCollection, i) => {
			const els = playerEl.querySelectorAll(elCollection.sel);
			let animArray = []
			
			let minkft = elCollection.kf[0].kft
			let maxkft = elCollection.kf[elCollection.kf.length-1].kft

			//console.log("maxkft", maxkft);
			const timing = {
			  duration: (maxkft-minkft)*this.normalSpeed,
			  fill: "both",
			  delay: minkft * this.normalSpeed,
			  endDelay: (petit.op - maxkft)*this.normalSpeed
			};
			
			
			const duration =  (maxkft-minkft>0 ? maxkft-minkft : 1)
						
			elCollection.kf.forEach(function (kf, index) {
				if(kf.kft) {
					let newkft = (kf.kft- minkft)/duration;
					kf.offset = newkft;
				}
				animArray.push(kf);
			});

			//console.log(animArray, (els, timing));
			els.forEach( (el) => {
				//console.log(el.id, animArray);
				let anim = new KeyframeEffect(
					el, // element to animate
					animArray,
					(elCollection.t ? elCollection.t : timing) // keyframe options
				);
			 	let animation = new Animation(anim);
				this.animations.push(animation);
				//this.timings.push((elCollection.t ? elCollection.t : timing));
				playerEl.dispatchEvent(
					new CustomEvent("added", {detail:{animation:animation, sequence:animArray, timining : timing}})
				);
			}); 
		});
		//console.log("timings", this.timings, this.animations);
		petit.events?.forEach((elCollection, i) => {			//TODO
		});

		this.animations[0].addEventListener("finish", () => {
			this.isPlaying = false;		  	
		  	playerEl.dispatchEvent(
				new CustomEvent("finished")
			);
		});
	}

	//TODO:this.animations[0].statettt instead of this.isPlaying

	pauseAll() {
		this.isPlaying = false;
		this.animations.forEach((animation) => {
			animation.pause();
		});
		this.playerEl.dispatchEvent(
			new CustomEvent("pause")
		);
	}
	finishAll() {
		this.isPlaying = false;
		this.animations.forEach((animation) => {
			animation.finish();
		});
		this.playerEl.dispatchEvent(
			new CustomEvent("finished")
		);		
	}
	playAll() {
		this.isPlaying = true;
		this.playerEl.dispatchEvent(
			new CustomEvent("play")
		);		
		this.animations.forEach((animation) => {
			animation.play();
		});
	}
}
