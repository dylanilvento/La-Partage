#pragma strict

var npcScript: NPCScript;
var drugScript: DrugScript;
var menuScript: MenuScript;

function Start () {

	npcScript = GetComponent(NPCScript);
	drugScript = GameObject.Find("Jack").GetComponent(DrugScript);
	menuScript = GameObject.Find("Jack").GetComponent(MenuScript);

}

function Update () {

}

function RunAnimation (num : String) {

	switch (num) {
		case "1": Animation1();
					break;
					 
		case "2": Animation2();
					break;
		
		case "3": Animation3();
					break;
		
		case "4": Animation4();
					break;
					
		case "5": Animation5();
					break;
					
		default: print ("No script available.");
	}

}

//Calls Cooper over

function Animation1() {
	
	var cooperAnimationScript: CooperAnimationScript;
	cooperAnimationScript = GameObject.Find("Cooper").GetComponent(CooperAnimationScript);
	
	cooperAnimationScript.RunAnimation("2");
	
	

}

//Sends Cooper away

function Animation2() {

	var cooperAnimationScript: CooperAnimationScript;
	cooperAnimationScript = GameObject.Find("Cooper").GetComponent(CooperAnimationScript);
	
	cooperAnimationScript.RunAnimation("3");
	
}

function Animation3() {

	GetComponent(BoxCollider).enabled = false;
	Destroy (npcScript.interactionClone);
	

}

//Black out after drugs

function Animation4() {

	menuScript.SetGameOverScreen(true);

}

function Animation5 () {
	
	drugScript.score = 0;
	menuScript.SetBlackOutScreen(true, false);
	Destroy (GameObject.Find("Regina"));
	Destroy (GameObject.Find("InteractionPrefab(Clone)"));


}