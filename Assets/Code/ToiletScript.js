#pragma strict

var interactionBox: GameObject;

var interactionClone: GameObject;

var collidedWith: GameObject;

var jackInteractionScript: JackInteractionScript;

function Start () {

	jackInteractionScript = GameObject.Find("Jack").GetComponent(JackInteractionScript);

}

function Update () {
	if (collidedWith != null) {
		if (collidedWith.tag == "Player" && Input.GetKeyDown("space")) {
			jackInteractionScript.AddVar("<Used bathroom>");
		}
	}
	
	if (jackInteractionScript.VarExists("<Used bathroom>")) {
		GetComponent(BoxCollider).enabled = false;
		Destroy (interactionClone);
	}
	
	else {
		GetComponent(BoxCollider).enabled = true;
	}
}

function OnTriggerEnter (other : Collider) {
	collidedWith = other.gameObject;
	
	if (collidedWith.tag == "Player") {
		//print ("player pos: " + collidedWith.transform.localPosition.x);
		//print ("entrance center pos: " + transform.localPosition.x);

		//print ("entrance center pos: " + transform.position.x);
		
		interactionClone = Instantiate(interactionBox, Vector3(transform.position.x + 3.0, transform.position.y + 2.0, transform.position.z), Quaternion.Euler(180, 90, 0));
		
		//GameObject.Find("Talk Text").GetComponent(TextMesh).text = "Use";
		interactionClone.Find("Talk Text").GetComponent(TextMesh).text = "Use";
		
	//Quaternion.Euler(z, y, x);
	}
	
}

function OnTriggerExit (other : Collider) {
	collidedWith = null;
	Destroy (interactionClone);
	
}