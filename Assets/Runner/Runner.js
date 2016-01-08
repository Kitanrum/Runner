#pragma strict

public static var distanceTraveled : float;
public var acceleration : float;
public var touchingPlatform : boolean;
public var jumpVelocity : Vector3;
public var boostVelocity : Vector3;
public var gameOverY: float;
private var startPosition : Vector3;
public var jump : AudioSource;

private static var boosts : int;

function Start () {
	boosts = 0;
	GameEventManager.GameStart += GameStart;
	GameEventManager.GameOver += GameOver;
	startPosition = transform.localPosition;
	GetComponent.<Renderer>().enabled = false;
	GetComponent.<Rigidbody>().isKinematic = true;
	enabled = false;

}

function Update () {

	if(Input.GetButtonDown("Jump")){

		if(touchingPlatform){
			jump.Play();
			GetComponent.<Rigidbody>().AddForce(jumpVelocity, ForceMode.VelocityChange);
			touchingPlatform = false;
		}
		else if(boosts > 0){
			GetComponent.<Rigidbody>().AddForce(boostVelocity, ForceMode.VelocityChange);
			boosts -=1;
			GUIManager.SetBoosts(boosts);
		}
		
	}
	//transform.Translate(5*Time.deltaTime, 0,0);
	distanceTraveled = transform.localPosition.x;
	GUIManager.SetDistance(distanceTraveled);

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
	boosts = 0;
	GUIManager.SetBoosts(boosts);
	distanceTraveled = 0;
	GUIManager.SetDistance(distanceTraveled);
	transform.localPosition = startPosition;
	GetComponent.<Renderer>().enabled = true;
	GetComponent.<Rigidbody>().isKinematic = false;
	enabled = true;
}

public static function AddBoost(){
	boosts += 1;
	GUIManager.SetBoosts(boosts);
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