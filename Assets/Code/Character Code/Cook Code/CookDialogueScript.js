
var npcScript: NPCScript;
var jackInteractionScript: JackInteractionScript;

var cookEndDialogue = new TextAsset[1];

function Start () {

	npcScript = GetComponent(NPCScript);
	jackInteractionScript = GameObject.Find("Jack").GetComponent(JackInteractionScript);

}

function Update () {

	if (jackInteractionScript.VarExists("<Got Dale's job back>") && !(npcScript.dialogueActive)) {
	
		npcScript.LoadDialogue(cookEndDialogue);
		
	}

}
