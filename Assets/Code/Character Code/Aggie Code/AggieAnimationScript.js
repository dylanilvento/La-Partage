#pragma strict

function Start () {

}

function Update () {

}

function RunAnimation (num : String) {

	switch (num) {
		case "1": Animation1();
					 break;
			
		case "2": Animation2();
					 break;
		
		default: print ("No script available.");
	}

}

//Runs Cooper's animation to talk to Dale

function Animation1 () {
	var cooper: GameObject;
	
	cooper = GameObject.Find("Cooper");
	
	cooper.GetComponent(CooperAnimationScript).RunAnimation("4");
}

//Sends Jack back to original axis


function Animation2 () {
	
	var cook: GameObject;
	var jack: GameObject;
	
	cook = GameObject.Find("Cook");
	jack = GameObject.Find("Jack");
	
	jack.GetComponent(JackEventScript).GoToRestaurantWalkingAxis(transform.position.x - 4.4);

}