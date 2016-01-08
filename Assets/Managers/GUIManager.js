#pragma strict

public var gameOverText : UI.Text = GetComponent("GameOverText");
public var instructionText : UI.Text = GetComponent("Instruction Text");
public var runnerText : UI.Text = GetComponent("Runner Text");
public var boostsText : UI.Text = GetComponent("Boosts Text");
public var distanceText : UI.Text = GetComponent("Distance Text");

private static var instance : GUIManager;
public var BG : AudioSource ;
public var sStart : AudioSource;

function Start () {

	instance = this;
	GameEventManager.GameStart += GameStart;
	GameEventManager.GameOver += GameOver;
	gameOverText.enabled = false;

}

function Update () {
	if(Input.GetButtonDown("Jump")){
		GameEventManager.TriggerGameStart();
		sStart.Play();
	}
}

private function GameStart(){
	gameOverText.enabled = false;
	instructionText.enabled = false;
	runnerText.enabled = false;
	enabled = false;

	BG.PlayDelayed(1);
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