#pragma strict

public var gameOverText : UI.Text = GetComponent("GameOverText");
public var instructionText : UI.Text = GetComponent("Instruction Text");
public var runnerText : UI.Text = GetComponent("Runner Text");

function Start () {

	GameEventManager.GameStart += GameStart;
	GameEventManager.GameOver += GameOver;
	gameOverText.enabled = false;

}

function Update () {
	if(Input.GetButtonDown("Jump")){
		GameEventManager.TriggerGameStart();
	}
}

private function GameStart(){
	gameOverText.enabled = false;
	instructionText.enabled = false;
	runnerText.enabled = false;
	enabled = false;
}

private function GameOver(){
	gameOverText.enabled = true;
	instructionText.enabled = true;
	enabled = true;
}