#pragma strict

import UnityEngine;

public var particleSystems : ParticleSystem[];

function Start () {
	GameEventManager.GameStart += GameStart;
	GameEventManager.GameOver += GameOver;
	GameOver();
}

function Update () {

}

private function GameStart(){
	for(var i : int = 0; i < particleSystems.Length; i++){
		particleSystems[i].Clear();
		particleSystems[i].enableEmission = true;
	}
}

private function GameOver(){
	for(var i : int = 0; i < particleSystems.Length; i++){
		particleSystems[i].enableEmission = false;
	}
}