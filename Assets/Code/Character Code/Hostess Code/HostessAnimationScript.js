#pragma strict
var npcScript: NPCScript;
var jackScript: JackScript;
var jackEventScript: JackEventScript;

function Start () {

	npcScript = GetComponent(NPCScript);

}

function Update () {

}

function RunAnimation (num : String) {

	switch (num) {
		case "1": Animation1();
					 break;
						
		default: print ("No script available.");
	}

}

function Animation1 () {
	jackEventScript = npcScript.collidedWith.GetComponent(JackEventScript);
	jackScript = npcScript.collidedWith.GetComponent(JackScript);
	jackEventScript.WalkToTable();
	
	jackScript.enabled = false;
	GetComponent(BoxCollider).enabled = false;
	
	var startPosZ = transform.position.z;
	transform.localScale.x = (-1) * transform.localScale.x;
	
	while (transform.position.z < startPosZ + 7.9) {
		transform.position.z += 3 * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
	}
	
	startPosZ = transform.position.z;
	var startPosX = transform.position.x;
	
	var xMovementDone: boolean = false;
	var zMovementDone: boolean = false;
	
	while (!xMovementDone || !zMovementDone) {
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
		transform.position.z += 3 * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
	}
	
	
	transform.localScale.x = (-1) * transform.localScale.x;
	
	yield WaitForSeconds(1.0);
	
//***************************************
//Return to original position
//***************************************
	startPosZ = transform.position.z;
	
	while (transform.position.z > startPosZ - 10.9) {
		transform.position.z -= 3 * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
	
	}
	
	startPosZ = transform.position.z;
	startPosX = transform.position.x;
	
	xMovementDone = false;
	zMovementDone = false;
	
	while (!xMovementDone || !zMovementDone) {
		if (transform.position.x > startPosX - 2.9) {
			
			transform.position.x -= 3 * Time.deltaTime;
		
			yield WaitForSeconds(0.01);
			
		}
		
		else {
			xMovementDone = true;
		}
		
		
		if (transform.position.z > startPosZ - 5.2) {
			
			transform.position.z -= 3 * Time.deltaTime;
		
			yield WaitForSeconds(0.01);
			
		}
		
		else {
			zMovementDone = true;
		}
	}

	startPosZ = transform.position.z;
	
	while (transform.position.z > startPosZ + 7.9) {
		transform.position.z -= 3 * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
	}
}