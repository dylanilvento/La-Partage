#pragma strict
var npcScript: NPCScript;
//var jackScript: JackScript;
var drugScript: DrugScript;
var jackEventScript: JackEventScript;
var cameraScript: CameraScript;

function Start () {

	npcScript = GetComponent(NPCScript);
	cameraScript = GameObject.Find("Main Camera").GetComponent(CameraScript);
	drugScript = GameObject.Find("Jack").GetComponent(DrugScript);

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


//JACK TAKES DRUGS

function Animation1 () {
	/*****************************
	//CHANGE COLOR
	//*****************************
	var drugColor: Color;
	
	drugColor.r = 255 / 255.0;
	drugColor.g = 185 / 255.0;
	drugColor.b = 158 / 255.0;
	
	RenderSettings.ambientLight = drugColor;
	
	//*****************************/
	drugScript.score = 20;
	ExitBathroom();
	
}

//JACK DOES NOT TAKE DRUGS

function Animation2 () {
	
	ExitBathroom();
	
}

function ExitBathroom() {
	var mainCamera = GameObject.Find("Main Camera");
	var bathroomEntrance = GameObject.Find("BathroomEntranceCollider");
	var jack = GameObject.Find("Jack");
	var jackScript = jack.GetComponent(JackScript);
	
	var cameraRotationCount: int = 0;
	var jackRotationCount: int = 0;
	
	var cameraRotationDone: boolean = false;
	var jackRotationDone: boolean = false;
	var xMovementDone: boolean = false;
	
	cameraScript.SetStopFollow(true);
	
	jackScript.enabled = false;
	
	jackEventScript = npcScript.collidedWith.GetComponent(JackEventScript);
	jackEventScript.ExitBathroom2();
	
	while (mainCamera.transform.position.z < bathroomEntrance.transform.position.z) {
		mainCamera.transform.position.z += 0.1;
		yield WaitForSeconds (0.01);
	}
	
	while (mainCamera.transform.position.x < jack.transform.position.x - 2.0) {
		mainCamera.transform.position.x += 0.1; //doubling speed
		yield WaitForSeconds (0.01);
	}
	
	while (!(jackRotationDone) || !(cameraRotationDone) || !(xMovementDone)) {
		
		if (mainCamera.transform.position.x < jack.transform.position.x + 5.8) {
			//print(jack.transform.position.x);
			mainCamera.transform.position.x += 0.1;
			//mainCamera.transform.position.x += 0.2; //doubling speed
			yield WaitForSeconds (0.01);
		}
		
		else {
		
			xMovementDone = true;
			
		}
		
		if (jackRotationCount <= 36) {
			jack.transform.Rotate (0, 0, 5.0);
			jackRotationCount++;
			//yield WaitForSeconds (0.00001);
		}
		
		else {
			jackRotationDone = true;
		
		}
		
		if (cameraRotationCount < 36) {
			mainCamera.transform.Rotate (0, 5.0, 0);
			cameraRotationCount++;
			//yield WaitForSeconds (0.00001);
		}
		
		else {
			cameraRotationDone = true;
		
		}
		
		yield WaitForSeconds (0.00001);
	}
	
	while (mainCamera.transform.position.z < jack.transform.position.z + 3.1) {
		//print(jack.transform.position.z);
		//mainCamera.transform.position.x += 0.1;
		mainCamera.transform.position.z += 0.2; //doubling speed
		yield WaitForSeconds (0.01);
	}
	
	cameraScript.SetStopFollowX(true);
	
	jackScript.enabled = true;
	jackScript.SwitchWalkingAxis("zPos");
	
	

}