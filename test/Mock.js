// copy the code from https://developer.mozilla.org/en-US/docs/Web/API/EventTarget#Simple_implementation_of_EventTarget
/*var EventTarget = function() {
  this.listeners = {};
};

EventTarget.prototype.listeners = null;
EventTarget.prototype.addEventListener = function(type, callback) {
  if (!(type in this.listeners)) {
    this.listeners[type] = [];
  }
  this.listeners[type].push(callback);
};

EventTarget.prototype.removeEventListener = function(type, callback) {
  if (!(type in this.listeners)) {
    return;
  }
  var stack = this.listeners[type];
  for (var i = 0, l = stack.length; i < l; i++) {
    if (stack[i] === callback){
      stack.splice(i, 1);
      return;
    }
  }
};

EventTarget.prototype.dispatchEvent = function(event) {
  if (!(event.type in this.listeners)) {
    return true;
  }
  var stack = this.listeners[event.type].slice();

  for (var i = 0, l = stack.length; i < l; i++) {
    stack[i].call(this, event);
  }
  return !event.defaultPrevented;
};
*/
let Animation;
let HTMLDivElement;
let KeyframeEffect;
if (typeof window.KeyframeEffect == 'undefined') {
	KeyframeEffect = class {
		constructor (a, b, c) {
			this.a=a;
			this.b=b;
			this.c=c;
		}
		getTiming(){}
	}
	Animation = class extends EventTarget {


		constructor (a) {
    		super();
    		this.a=a
    		this.playState = "paused";
    		this.effect = new KeyframeEffect();
		}
		finish() {
			const event = new Event('finish');
			// Dispatch the event.
			this.dispatchEvent(event);
    		this.playState = "finished";
		}
		play() {
    		this.playState = "running";
		}
		pause() {
    		this.playState = "paused";
  		}
  		
	}
}
else {
	KeyframeEffect = window.KeyframeEffect;
	Animation = window.Animation;
}

export { Animation, KeyframeEffect };

