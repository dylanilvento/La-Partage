#pragma strict

var lineCount: int = 1;
var numOptions: int = 0;
var hiddenChoicesTotal: int = 0;
var collidedWith: GameObject;

var currentNPC: GameObject;

function Start () {

currentNPC = GameObject.FindWithTag("Player").GetComponent(JackInteractionScript).collidedWith;
numOptions = currentNPC.GetComponent(NPCScript).numOptions;
hiddenChoicesTotal = currentNPC.GetComponent(NPCScript).hiddenChoicesTotal;
//scrollbarScript.SizeScrollbar(numOptions);

}

function Update () {

	/*currentNPC = GameObject.FindWithTag("Player").GetComponent(JackInteractionScript).collidedWith;
	numOptions = currentNPC.GetComponent(NPCScript).numOptions;
	hiddenChoicesTotal = currentNPC.GetComponent(NPCScript).hiddenChoicesTotal;*/

	if (Input.GetKeyDown("up")) {
		if (lineCount != 1){
			transform.position.y += 0.66666666;
			lineCount--;
		}
	}
	
	if (Input.GetKeyDown("down")){
		if (lineCount != 4 && lineCount < (numOptions - hiddenChoicesTotal)) {
			transform.position.y -= 0.66666666;
			lineCount++;
		}
		
	}
}

function OnTriggerEnter (other : Collider) {
	collidedWith = other.gameObject;
}

function OnTriggerExit (other : Collider) {
	collidedWith = null;
}