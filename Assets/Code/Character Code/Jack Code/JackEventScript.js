#pragma strict

var jackScript: JackScript;
var jackInteractionScript: JackInteractionScript;
var menuScript: MenuScript;
var cameraScript: CameraScript;

function Start () {
	jackScript = GetComponent(JackScript);
	jackInteractionScript = GetComponent(JackInteractionScript);
	menuScript = GetComponent(MenuScript);
	cameraScript = GameObject.Find("Main Camera").GetComponent(CameraScript);
}

function Update () {

}

function EnterRestaurant(entranceCenterX : float) {
	jackScript.SwitchWalkingAxis("zPos", true);
	jackInteractionScript.SetHideInteractionObject(true);
	jackScript.enabled = false;
	menuScript.enabled = false;
	//var playerStartPositionX = transform.localPosition.x;
	//var playerStartPositionZ = transform.localPosition.z;
	var playerStartPositionZ = transform.position.z;
	
	var jackCentered: boolean = false;
	
	//print("playerX: " + transform.position.x);
	//print("entranceX: " + entranceCenterX);
	
	var distanceFromCenter = transform.position.x - entranceCenterX;
	
	if (transform.localScale.x < 0) {
		transform.localScale.x = (-1) * transform.localScale.x;
	}
	
	while (transform.position.z < playerStartPositionZ + 3.0) {
		jackScript.SetMat(1);
		jackScript.WalkAnimation ();
		transform.position.z += GetComponent(JackScript).moveSpeed * Time.deltaTime;
		
		//print(distanceFromCenter);
		
		if (distanceFromCenter > 0 && !jackCentered) {
			transform.position.x -= GetComponent(JackScript).moveSpeed * Time.deltaTime;
			distanceFromCenter -= GetComponent(JackScript).moveSpeed * Time.deltaTime;
			
			if (distanceFromCenter <= 0) {
				jackCentered = !jackCentered;
			}
		}
		
		else if (distanceFromCenter < 0 && !jackCentered){
			transform.position.x += GetComponent(JackScript).moveSpeed * Time.deltaTime;
			distanceFromCenter += GetComponent(JackScript).moveSpeed * Time.deltaTime;
			
			if (distanceFromCenter >= 0) {
				jackCentered = !jackCentered;
			}
		}
		
		yield WaitForSeconds(0.01);
		
	}
	jackScript.SetMat(0);
	jackInteractionScript.NPCDialogue();
	
	//jackScript.enabled = true;
	//menuScript.enabled = true;
}

function WalkToTable () {
	
	cameraScript.SetStopFollowX(true);

	//jackScript.SwitchWalkingAxis("None", false);
	var startPosZ = transform.position.z;
	//transform.localScale.x = (-1) * transform.localScale.x;
	
	while (transform.position.z < startPosZ + 7.9) {
		jackScript.SetMat(1);
		jackScript.WalkAnimation ();
		
		transform.position.z += 3 * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
	}
	
	startPosZ = transform.position.z;
	var startPosX = transform.position.x;
	
	var xMovementDone: boolean = false;
	var zMovementDone: boolean = false;
	
	while (!xMovementDone || !zMovementDone) {
		jackScript.SetMat(1);
		jackScript.WalkAnimation ();
		
		if (transform.position.x < startPosX + 2.9) {
			
			transform.position.x += 3 * Time.deltaTime;
		
			yield WaitForSeconds(0.01);
			
		}
		
		else {
			xMovementDone = true;
		}
		
		
		if (transform.position.z < startPosZ + 5.2) {
			
			transform.position.z += 3 * Time.deltaTime;
		
			yield WaitForSeconds(0.01);
			
		}
		
		else {
			zMovementDone = true;
		}
	}
	
	startPosZ = transform.position.z;
	
	while (transform.position.z < startPosZ + 10.9) {
		jackScript.SetMat(1);
		jackScript.WalkAnimation ();
		
		transform.position.z += 3 * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
	}
	
	jackInteractionScript.SetHideInteractionObject(false);
	//jackScript.SwitchWalkingAxis("zPos", true);
	
	jackScript.enabled = false;
	menuScript.enabled = false;
	
	//print(GameObject.Find("Regina").transform.position.z);
	//print(transform.position.z);
	
	cameraScript.CenterCamera((GameObject.Find("Regina").transform.position.z + transform.position.z) / 2.0, "z");
	jackInteractionScript.NPCDialogue();
	
	//transform.localScale.x = (-1) * transform.localScale.x;
}

function EnterBathroom (endPosition: float) {
	jackScript.enabled = false;
	menuScript.enabled = false;
	var playerStartPositionX = transform.position.x;
	
	while (transform.position.x > endPosition) {
		jackScript.SetMat(1);
		jackScript.WalkAnimation ();
		transform.position.x -= jackScript.moveSpeed * Time.deltaTime;
		yield WaitForSeconds(0.01);
	}
	
	jackScript.enabled = true;
	jackScript.SwitchWalkingAxis("zNeg", true);
	menuScript.enabled = true;


}

function ExitBathroom1 (zPosition : float) {
	if (zPosition < transform.position.z) {
		while (zPosition < transform.position.z) {
			transform.position.z -= jackScript.moveSpeed * Time.deltaTime;
			
			yield WaitForSeconds(0.01);
		}
	}
	
	if (zPosition > transform.position.z) {
		while (zPosition > transform.position.z) {
			transform.position.z += jackScript.moveSpeed * Time.deltaTime;
			
			yield WaitForSeconds(0.01);
		}
	}
	
	while (transform.position.x < GameObject.Find("Trey").transform.position.x) {
		transform.position.x += jackScript.moveSpeed * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
	}
	jackInteractionScript.SetHideInteractionObject(false);
	jackScript.enabled = false;
	menuScript.enabled = false;
	
	jackInteractionScript.NPCDialogue();
}

function ExitBathroom2 () {
	//print("Triggered");
	var startPosX: float = transform.position.x;
	
	while (transform.position.x < startPosX + 6.6) {
		transform.position.x += jackScript.moveSpeed * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
	}

}

function GoToDale () {
	
	jackScript.enabled = false;
	menuScript.enabled = false;
	
	var cook: GameObject;
	
	cook = GameObject.Find("Cook");
	
	while (transform.position.x > cook.transform.position.x) {
		transform.position.x -= 3 * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
	}
	
	while (transform.position.z < cook.transform.position.z - 1.0) {
		
		transform.position.z -= 3 * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
		
	}
	
	jackInteractionScript.NPCDialogue();

}

function GoToBar (aggiePos : float) {

	while (transform.position.x < aggiePos) {
		
		transform.position.x += jackScript.moveSpeed * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
		
	}

}

function GoToRestaurantWalkingAxis (endPos: float) {

		while (transform.position.x > endPos) {
		
		transform.position.x -= jackScript.moveSpeed * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
		
	}
}