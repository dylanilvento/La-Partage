#pragma strict

var jack: GameObject;
var regina: GameObject;

var collisionBox: BoxCollider;

var npcScript: NPCScript;

var moveToBathroom: boolean = false;

function Start () {

	jack = GameObject.Find("Jack");
	regina = GameObject.Find("Regina");
	
	collisionBox = GetComponent(BoxCollider);
	
	npcScript = GetComponent(NPCScript);

}

function Update () {

}

function RunAnimation (num : String) {

	switch (num) {
		case "1": Animation1();
					break;
					 
		case "2": Animation2(jack.transform.position.x, ((jack.transform.position.z + regina.transform.position.z) / 2));
					break;
					
		case "3": Animation3((jack.transform.position.z + regina.transform.position.z) / 2);
					break;
						
		case "4": Animation4();
					break;
					
		case "5": Animation5();
					break;
		
		default: print ("No script available.");
	}

}

//Cooper checks bathroom after talking to Jack

function Animation1() {
	var startPosZ = transform.position.z;
	var startPosX = transform.position.x;
	
	var xMovementDone: boolean = false;
	var zMovementDone: boolean = false;
	
	Destroy (npcScript.interactionClone);
	
	moveToBathroom = true;
	
	/*while (!xMovementDone || !zMovementDone) {
		if (transform.position.x < startPosX + 4.0) {
			
			transform.position.x += 3 * Time.deltaTime;
		
			yield WaitForSeconds(0.01);
			
		}
		
		else {
			xMovementDone = true;
		}
		
		
		if (transform.position.z < startPosZ + 6.2) {
			
			transform.position.z += 3 * Time.deltaTime;
		
			yield WaitForSeconds(0.01);
			
		}
		
		else {
			zMovementDone = true;
		}
	}*/
	
	collisionBox.enabled = false;
	
	while ((transform.position.z < GameObject.Find("BathroomEntranceCollider").transform.position.z) && moveToBathroom) {
		
		transform.position.z += 3 * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
	}
	
	startPosX = transform.position.x;
	
	while ((transform.position.x > startPosX - 7.9) && moveToBathroom) {
	
		transform.position.x -= 3 * Time.deltaTime;
		yield WaitForSeconds(0.01);
	
	}

}

//Cooper walks to table

function Animation2 (jackXPos : float, endZPosition: float) {
	
	moveToBathroom = false;
	
	transform.position.x = jackXPos - 0.5;
	transform.position.z = endZPosition + 8.0;
	
	while (transform.position.z > endZPosition) {
	
		transform.position.z -= 3 * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
		
	}
	
}

function Animation3 (endZPosition: float) {
	
	while (transform.position.z > endZPosition - 5.0) {
	
		transform.position.z -= 3 * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
		
	}

}

//Going to get Dale his job back

function Animation4 () {
	
	GetComponent(BoxCollider).enabled = false;
	
	var cook: GameObject;
	
	cook = GameObject.Find("Cook");
	
	jack.GetComponent(JackEventScript).GoToDale();
	
	while (transform.position.x > cook.transform.position.x) {
		transform.position.x -= 3 * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
	}
	
	while (transform.position.z < cook.transform.position.z - 0.5) {
		
		transform.position.z -= 3 * Time.deltaTime;
		
		yield WaitForSeconds(0.01);
		
	}
	
	GetComponent(BoxCollider).enabled = true;
	
	

}

//Did not convince Cooper, turn off collsion box

function Animation5 () {
	
	GetComponent(BoxCollider).enabled = false;

}