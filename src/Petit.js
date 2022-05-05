export default class Petit {
	constructor (playerEl, petit) {
		this.version = 0.2;
		this.petit = petit;
		this.playerEl = playerEl;
		this.animations = [];
		//this.timings = [];
		this.isPlaying = false;
		this.normalSpeed = 1000/( petit.fr ? petit.fr : 60 ) ; 
		this.showingPoster = false;
		this.poster = petit.poster;
		//console.log("petit", petit);
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
			//console.log("timing.delay + timing.duration + timing.endDelay", timing.delay + timing.duration + timing.endDelay, (timing.delay + timing.duration + timing.endDelay)*24/1000 );
			
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

		this.animations[0]?.addEventListener("finish", () => {
			this.isPlaying = false;		  	
		  	playerEl.dispatchEvent(
				new CustomEvent("ended")
			);
		});
		this.setPoster(this.poster);

		playerEl.dispatchEvent(
			new CustomEvent("canplay", {detail:this})
		);
	}

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
			new CustomEvent("ended")
		);		
	}
	playAll() {
		if(this.showingPoster){
			this.animations.forEach(animation => {
				animation.currentTime =0;
			});
		}
		this.showingPoster = false;
		this.isPlaying = true;
		this.playerEl.dispatchEvent(
			new CustomEvent("play")
		);		
		this.animations.forEach((animation) => {
			animation.play();
		});
	}
	setPoster(kf){
		this.poster = kf;
		if(this.poster!=null && !isNaN(this.poster)){
			this.animations.forEach(animation => {
				animation.currentTime = +kf*this.normalSpeed;
			});
			this.showingPoster = true;
		}
	}
}
