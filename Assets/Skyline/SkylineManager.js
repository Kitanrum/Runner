#pragma strict

import System.Collections.Generic;

var prefab : Transform;
var numberOfObjects : int;
var startPosition : Vector3;
var recycleOffset : float;
var minSize : Vector3;
var maxSize : Vector3;

private var nextPosition : Vector3;
private var objectQueue : Queue.<Transform>;

function Start () {

	GameEventManager.GameStart += GameStart;
	GameEventManager.GameOver += GameOver;
	objectQueue = new Queue.<Transform>(numberOfObjects);
	for(var i : int = 0; i < numberOfObjects; i++){
		objectQueue.Enqueue(Instantiate(prefab, new Vector3(0,0,100), Quaternion.identity));
	}
	enabled = false;
}

function Update () {

	if(objectQueue.Peek().localPosition.x + recycleOffset < Runner.distanceTraveled){
		Recycle();
	}
}

private function GameStart(){
	
	nextPosition = startPosition;
	for(var i : int = 0; i < numberOfObjects; i++){
		Recycle();
	}
	enabled = true;
}

private function GameOver(){
	enabled = false;
}

function Recycle(){

		var scale : Vector3 = new Vector3(Random.Range(minSize.x,maxSize.x),Random.Range(minSize.y,maxSize.y),Random.Range(minSize.z,maxSize.z));

		var position : Vector3 = nextPosition;
		position.x += scale.x * 0.5;
		position.y += scale.y * 0.5;

		var o : Transform = objectQueue.Dequeue();
		o.localScale = scale;
		o.localPosition = position;
		nextPosition.x += scale.x;
		objectQueue.Enqueue(o);	
}










