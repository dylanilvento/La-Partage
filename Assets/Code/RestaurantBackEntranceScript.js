#pragma strict

var collidedWith: GameObject;

var jackScript: JackScript;
var jackInteractionScript: JackInteractionScript;

function Start () {

}

function Update () {

}

function OnTriggerEnter (other : Collider) {
	
	collidedWith = other.gameObject;
	
	jackScript = collidedWith.GetComponent(JackScript);
	jackInteractionScript = collidedWith.GetComponent(JackInteractionScript);
	
	if (collidedWith.tag == "Player" && !(jackInteractionScript.VarExists("<Jack passes out at date>"))) {
	
		jackScript.SetStopRightMov(true);
	
	}
	

}

function OnTriggerExit (other : Collider) {

	jackScript.SetStopRightMov(false);
}