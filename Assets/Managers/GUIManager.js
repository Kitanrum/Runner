#pragma strict

public var gameOverText : UI.Text = GetComponent("GameOverText");
public var instructionText : UI.Text = GetComponent("Instruction Text");
public var runnerText : UI.Text = GetComponent("Runner Text");
public var boostsText : UI.Text = GetComponent("Boosts Text");
public var distanceText : UI.Text = GetComponent("Distance Text");

public var BG : AudioClip;
private static var instance : GUIManager;

function Start () {

	instance = this;
	GameEventManager.GameStart += GameStart;
	GameEventManager.GameOver += GameOver;
	gameOverText.enabled = false;

}

function Update () {
	if(Input.GetButtonDown("Jump")){
		GameEventManager.TriggerGameStart();
		GetComponent.<AudioSource>().Play();
	}
}

private function GameStart(){
	gameOverText.enabled = false;
	instructionText.enabled = false;
	runnerText.enabled = false;
	enabled = false;
	var BG : AudioSource = GetComponent.<AudioSource>();
	BG.Play();
}

private function GameOver(){
	gameOverText.enabled = true;
	instructionText.enabled = true;
	enabled = true;
}

public static function SetBoosts(boosts : int){
	instance.boostsText.text = boosts.ToString();
}

public static function SetDistance(distance : float){
	instance.distanceText.text = distance.ToString("f0");
}