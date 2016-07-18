#pragma strict

var npcScript: NPCScript;
var jackInteractionScript: JackInteractionScript;

var reginaDrugDialogueAsset = new TextAsset [25]; //reginaLoadedDialogue[0]
var reginaNoDrugDialogueAsset = new TextAsset[32]; //reginaLoadedDialogue[1]
var reginaNoDrug_CooperDialogueAsset = new TextAsset [10]; //reginaLoadedDialogue[2]
var reginaIntroDialogueAssets = new TextAsset[37]; //reginaLoadedDialogue[3]

var reginaLoadedDialogue = new boolean [4];

var collisionBox: BoxCollider;

function Start () {

	npcScript = GetComponent(NPCScript);
	jackInteractionScript = GameObject.Find("Jack").GetComponent(JackInteractionScript);
	
	collisionBox = GetComponent(BoxCollider);

}

function Update () {

	if (jackInteractionScript.VarExists("<Takes drugs>") && !(npcScript.dialogueActive) && !(reginaLoadedDialogue[0])) {
	
		npcScript.LoadDialogue(reginaDrugDialogueAsset);
		reginaLoadedDialogue[0] = true;
		collisionBox.enabled = true;
		
		
	}
	
	else if (jackInteractionScript.VarExists("<Did not take drugs>") && !(npcScript.dialogueActive) && !(reginaLoadedDialogue[1])) {
	
		npcScript.LoadDialogue(reginaNoDrugDialogueAsset);
		reginaLoadedDialogue[1] = true;
		collisionBox.enabled = true;
		
	}
	
	else if (jackInteractionScript.VarExists("<Spoke to manager about dealer>") && !(npcScript.dialogueActive) && !(reginaLoadedDialogue[2])) {
	
		npcScript.LoadDialogue(reginaNoDrug_CooperDialogueAsset);
		collisionBox.enabled = true;
		reginaLoadedDialogue[2] = true;
		
	}
	
	else if (!(npcScript.dialogueActive) && !(reginaLoadedDialogue[3])) {
	
		npcScript.LoadDialogue(reginaIntroDialogueAssets);
		reginaLoadedDialogue[3] = true;
		
	}

}
