#pragma strict

public var offset : Vector3;
public var rotationVelocity : Vector3;
public var recycleOffset : float;
public var spawnChance : float;

//public var boost : AudioSource;

function Start () {
	GameEventManager.GameOver += GameOver;
	gameObject.SetActive(false);

}

function Update () {

	if(transform.localPosition.x + recycleOffset < Runner.distanceTraveled){
		gameObject.SetActive(false);
		return;
	}
	transform.Rotate(rotationVelocity * Time.deltaTime);
}

function SpawnIfAvailable(position : Vector3){

	if(gameObject.activeSelf || spawnChance <= Random.Range(0,100)){
		return;
	}

	transform.localPosition = position + offset;
	gameObject.SetActive(true);
}

private function GameOver() {
	gameObject.SetActive(false);
}

function OnTriggerEnter(){
	GetComponent.<AudioSource>().Play();
	Runner.AddBoost();
	gameObject.SetActive(false);

}