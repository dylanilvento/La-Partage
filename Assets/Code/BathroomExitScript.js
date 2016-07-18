#pragma strict
var jackInteractionScript: JackInteractionScript;
var jackEventScript: JackEventScript;

var interactionBox: GameObject;

var interactionClone: GameObject;

var collidedWith: GameObject;

function Start () {
	
	jackInteractionScript = GameObject.Find("Jack").GetComponent(JackInteractionScript);
	jackEventScript = GameObject.Find("Jack").GetComponent(JackEventScript);

}

function Update () {

	if (collidedWith != null) {
		if (collidedWith.tag == "Player" && Input.GetKeyDown("space")) {
			jackEventScript.ExitBathroom1(transform.position.z);
		}
	}

	if (jackInteractionScript.VarExists("<Used bathroom>")) {
		GetComponent(BoxCollider).enabled = true;
	}
	
	else {
		GetComponent(BoxCollider).enabled = false;
	}
}

function OnTriggerEnter (other : Collider) {
	collidedWith = other.gameObject;
	
	if (collidedWith.tag == "Player") {
		//print ("player pos: " + collidedWith.transform.localPosition.x);
		//print ("entrance center pos: " + transform.localPosition.x);

		//print ("entrance center pos: " + transform.position.x);
		
		interactionClone = Instantiate(interactionBox, Vector3(transform.position.x + 3.0, transform.position.y + 2.75, transform.position.z), Quaternion.Euler(180, 90, 0));
		
		//GameObject.Find("Talk Text").GetComponent(TextMesh).text = "Exit";
		interactionClone.Find("Talk Text").GetComponent(TextMesh).text = "Exit";
		
	//Quaternion.Euler(z, y, x);
	}
	
}

function OnTriggerExit (other : Collider) {
	collidedWith = null;
	Destroy (interactionClone);
	
}