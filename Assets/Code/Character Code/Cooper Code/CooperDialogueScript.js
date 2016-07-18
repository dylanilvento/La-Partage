#pragma strict

var npcScript: NPCScript;
var jackInteractionScript: JackInteractionScript;

var cooperNoDrugAsset = new TextAsset[1];
var cooperDefaultDialogue = new TextAsset[49];
var cooperDaleDialogue = new TextAsset[1];

function Start () {

	npcScript = GetComponent(NPCScript);
	jackInteractionScript = GameObject.Find("Jack").GetComponent(JackInteractionScript);

}

function Update () {

	if (jackInteractionScript.VarExists("<Will talk to manager about drugs>") && !(jackInteractionScript.VarExists("<Jack passes out at date>")) && !(npcScript.dialogueActive)) {
	
		npcScript.LoadDialogue(cooperNoDrugAsset);
		
	}
	
	else if (jackInteractionScript.VarExists("<Convinced Cooper to talk to Dale>") && !(npcScript.dialogueActive)) {
	
		npcScript.LoadDialogue(cooperDaleDialogue);
		
	}
	
	else if (jackInteractionScript.VarExists("<Jack passes out at date>") && !(npcScript.dialogueActive)) {
	
		npcScript.LoadDialogue(cooperDefaultDialogue);
		
	}
	

}
