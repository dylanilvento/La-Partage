#pragma strict

var collidedWith: GameObject;

var jackScript: JackScript;

function Start () {

}

function Update () {

}

function OnTriggerEnter (other : Collider) {
	
	collidedWith = other.gameObject;
	
	jackScript = collidedWith.GetComponent(JackScript);
	
	if (collidedWith.tag == "Player") {
	
		jackScript.SetStopLeftMov(true);
	
	}
	

}

function OnTriggerExit (other : Collider) {

	jackScript.SetStopLeftMov(false);
}