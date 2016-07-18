#pragma strict

var npcScript: NPCScript;
var collidedWith: GameObject = null;

var dialogueCount: int = 0;

var mainCamera: Camera;

var dialogueBoxTailTexture: Texture;

var tempReset: boolean = false;
var noScore: boolean = false;
var hideInteractionObject: boolean = false;

var showTextboxTail: boolean = false;

var textureFlip: double;

var jackVars = new List.<String>();

function Start () {
	textureFlip = transform.localScale.x;
}

function Update () {
	 if (Input.GetKeyDown("space") && collidedWith.tag == "NPC") {
	 	//if (collidedWith.tag == "NPC") {
			GetComponent(JackScript).enabled = false;
			GetComponent(MenuScript).enabled = false;
			
			FlipCharacter();
			NPCDialogue();
			
		//}
	}
}

function FlipCharacter() {
	if (GetComponent(JackScript).xPos) {
		if (collidedWith.transform.position.x < transform.position.x) {
			transform.localScale.x = textureFlip;
		
		}
		
		else {
			transform.localScale.x = -textureFlip;
		}
	}
	
	if (GetComponent(JackScript).zPos) {
		if (collidedWith.transform.position.z < transform.position.z) {
			transform.localScale.x = -textureFlip;
		
		}
		
		else {
			transform.localScale.x = textureFlip;
		}
	}

}

function NPCDialogue () {

	if (dialogueCount == 0){
		npcScript.ReadDialogue(dialogueCount);
		
		//npcScript.DialogueBox(); //this is going away
		dialogueCount++;
	}
	else {
		npcScript.DestroyDialogue(); //this is going away
		npcScript.ReadDialogue(dialogueCount);
		//npcScript.DialogueBox(); //this is going away
		dialogueCount++;
	}
	
	if (/*GetComponent(JackScript) &&*/ npcScript.dialogueIsFinished) {
			npcScript.dialogueActive = false;
			if (npcScript.endAnimationExists) {
			
				npcScript.RunAnimation(npcScript.animationNum);
				
			}
	}
	
}



function SetTextboxTail (val: boolean) {
	showTextboxTail = val;
}

function SetHideInteractionObject (val : boolean) {
	hideInteractionObject = val;
}

function SetDialogueCount (d : int) {
	dialogueCount = d;

}

function AddVar(newVar: String) {
	for (var i = 0; i < jackVars.Count; i++) {
		if (newVar == jackVars[i]) {
			return;
		}
	}
	print(newVar);
	jackVars.Add(newVar);
}

function VarExists(compareVar: String) {
	if (compareVar == "<None>") {
		return true;
	}
	
	for (var i = 0; i < jackVars.Count; i++) {
		if (compareVar == jackVars[i]) {
			return true;
		}
	}
	
	return false;
}

function OnTriggerEnter (other: Collider) {
	collidedWith = other.gameObject;
	
	if (collidedWith.tag == "NPC") {
		npcScript = other.gameObject.GetComponent(NPCScript);
	}

}

function OnTriggerExit (other: Collider) {
	collidedWith = null;
	dialogueCount = 0;
}

function OnGUI () {  //DO NOT USE -- PLACES TAIL BEHIND TEXTBOX
	if (showTextboxTail) {	
		GUI.DrawTexture(Rect(mainCamera.WorldToScreenPoint(transform.position).x - Screen.width / 14.0, Screen.height / 2.48, Screen.width / 14.0 , Screen.height / 16.01), dialogueBoxTailTexture, ScaleMode.StretchToFill, true, 0);																
	}
}