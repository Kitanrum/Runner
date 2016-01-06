#pragma strict

public static var distanceTraveled : float;
public var acceleration : float;
public var touchingPlatform : boolean;
public var jumpVelocity : Vector3;
public var gameOverY: float;
private var startPosition : Vector3;

function Start () {
	GameEventManager.GameStart += GameStart;
	GameEventManager.GameOver += GameOver;
	startPosition = transform.localPosition;
	GetComponent.<Renderer>().enabled = false;
	GetComponent.<Rigidbody>().isKinematic = true;
	enabled = false;

}

function Update () {

	if(touchingPlatform && Input.GetButtonDown("Jump")){
		GetComponent.<Rigidbody>().AddForce(jumpVelocity, ForceMode.VelocityChange);
		touchingPlatform = false;
	}
	//transform.Translate(5*Time.deltaTime, 0,0);
	distanceTraveled = transform.localPosition.x;
	if(transform.localPosition.y < gameOverY){
		GameEventManager.TriggerGameOver();
	}

}

function FixedUpdate(){
	if(touchingPlatform){
		GetComponent.<Rigidbody>().AddForce(acceleration,0,0,ForceMode.Acceleration);
	}
}

private function GameStart(){
	distanceTraveled = 0;
	transform.localPosition = startPosition;
	GetComponent.<Renderer>().enabled = true;
	GetComponent.<Rigidbody>().isKinematic = false;
	enabled = true;
}

private function GameOver(){
	GetComponent.<Renderer>().enabled = false;
	GetComponent.<Rigidbody>().isKinematic = true;
	enabled = false;
}

function OnCollisionEnter(){
	touchingPlatform = true;
}

function OnCollisionExit(){
	touchingPlatform = false;
}