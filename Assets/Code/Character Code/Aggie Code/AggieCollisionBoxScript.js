#pragma strict

var collidedWith: GameObject;

function Start () {

	collidedWith = null;

}

function Update () {

	if (collidedWith != null) {
	
		if (Input.GetKeyDown("space") && collidedWith.tag == "Player") {
			collidedWith.GetComponent(JackEventScript).GoToBar(transform.position.x);
		}
	}

}

function OnTriggerEnter (other : Collider) {
	collidedWith = other.gameObject;
}

function OnTriggerExit (other : Collider) {
	collidedWith = null;
}