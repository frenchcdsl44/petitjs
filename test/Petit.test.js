// @vitest-environment jsdom
import Petit from '../src/Petit.js'
import {KeyframeEffect, Animation}  from '../test/Mock.js'//only use for testing
import { vi, assert, expect, test } from 'vitest'


vi.stubGlobal('KeyframeEffect', KeyframeEffect);
vi.stubGlobal('Animation', Animation);

const div = document.createElement('div');
div.id = 'player';
const line = document.createElement('div');
div.appendChild(line);
line.id = 'line';
const p = document.createElement('div');
div.appendChild(p);
p.id = 'pentagone';
document.body.appendChild(div);

let playerEl = document.querySelector("#player");



// Edit an assertion and save to see HMR in action

test('Petit() no timing several keyframes several animations', () => {



  	let myPetit =  new Petit( playerEl, {
	
		"nm": "Example of animation",
		"v": "0.1",
		"ip": 0,
		"op": 175,
		"fr": 24,
		"layers": [

			{ 
				"sel":"#line", 
				"kf": [
						 {"transform":"translateX(0) rotate(0deg)", "easing": "cubic-bezier(0,.5,1,.5)", "kft":0},
						 {"transform":"translateX(90vw) rotate(2700deg)", "easing": "cubic-bezier(0,.5,1,.5)", "kft":80}
				]
			}
		]
	});
	

	myPetit.playAll();
	expect(myPetit.isPlaying).toEqual(true);
	expect(myPetit.animations[0].playState).toEqual("running");
	myPetit.pauseAll();
	expect(myPetit.isPlaying).toEqual(false);
	expect(myPetit.animations[0].playState).toEqual("paused");	
	myPetit.playAll();
	expect(myPetit.isPlaying).toEqual(true);
	expect(myPetit.animations[0].playState).toEqual("running");
	myPetit.finishAll();
	expect(myPetit.isPlaying).toEqual(false);
	expect(myPetit.animations[0].playState).toEqual("finished");
	expect(() => myPetit.animations[0].dispatchEvent(new Event('finish'))).not.toThrowError();
	expect(myPetit.animations.length).eq(1);
});

test('Petit() one keyframe with timing', () => {	  
	let myPetit = new Petit( playerEl, {
	
		"nm": "Example of animation",
		"v": "0.1",
		"ip": 0,
		"op": 175,
		"events": [24],
		"layers": [

			{ 
				"sel":"#line", 
				"kf": [
						 {"transform":"translateX(0) rotate(0deg)", "easing": "cubic-bezier(0,.5,1,.5)", "kft":0},
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
			}
		]
	});
	expect(myPetit.animations.length).eq(2)


})


test('Petit() with poster', () => {	  
	let myPetit = new Petit( playerEl, {
	
		"nm": "Example of animation",
		"v": "0.1",
		"ip": 0,
		"op": 175,
		"poster": 50,
		"events": [24],
		"layers": [

			{ 
				"sel":"#line", 
				"kf": [
						 {"transform":"translateX(0) rotate(0deg)", "easing": "cubic-bezier(0,.5,1,.5)", "kft":0},
				]
			},{ 
				"sel":"#pentagone", 
				"kf": [
						 {"transform":"translateX(0) rotate(0deg)", "kft":60},
						 {"transform":"translateX(90vw) rotate(2700deg)", "background":"red", "kft":140}
				]
			}
		]
	});
	
	expect(myPetit.showingPoster).eq(true)
	myPetit.playAll()
	expect(myPetit.showingPoster).eq(false)
	myPetit.setPoster(50)
	expect(myPetit.showingPoster).eq(true)
	myPetit.playAll()
	expect(myPetit.showingPoster).eq(false)
})



/*
test('JSON', () => {
  const input = {
    foo: 'hello',
    bar: 'world',
  }

  const output = JSON.stringify(input)

  expect(output).eq('{"foo":"hello","bar":"world"}')
  assert.deepEqual(JSON.parse(output), input, 'matches original')
})*/
