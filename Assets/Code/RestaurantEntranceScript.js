#pragma strict

var collidedWith: GameObject;
var playerObject: GameObject; //Need this to reference player once they leave the collision box

var jackScript: JackScript;
var jackInteractionScript: JackInteractionScript;
var drugScript: DrugScript;
var menuScript: MenuScript;
var cameraScript: CameraScript;
var jackEventScript: JackEventScript;

var interactionBox: GameObject;

var interactionClone: GameObject;

var mainCamera: GameObject;

function Start () {
	
}

function Update () {
	if (collidedWith != null) {
		if ((Input.GetKeyDown("space") || Input.GetButtonDown("Fire1")) && collidedWith.tag == "Player") {
		
			RotatePlayer();
			//jackEventScript.EnterRestaurant();
		}
	}

}

function OnTriggerEnter (other : Collider) {
	collidedWith = other.gameObject;
	playerObject = other.gameObject;
	
	if (collidedWith.tag == "Player") {
		//print ("player pos: " + collidedWith.transform.localPosition.x);
		//print ("entrance center pos: " + transform.localPosition.x);
		
		//print ("player pos: " + collidedWith.transform.position.x);
		//print ("entrance center pos: " + transform.position.x);
		
		interactionClone = Instantiate(interactionBox, Vector3(transform.position.x, 4.02, 0), Quaternion.Euler(180, 0, 0));
		
		GameObject.Find("Talk Text").GetComponent(TextMesh).text = "Enter";
		
		jackScript = other.gameObject.GetComponent(JackScript);
		jackInteractionScript = other.gameObject.GetComponent(JackInteractionScript);
		jackEventScript = other.gameObject.GetComponent(JackEventScript);
		drugScript = other.gameObject.GetComponent(DrugScript);
		menuScript = other.gameObject.GetComponent(MenuScript);
		mainCamera = GameObject.FindWithTag("MainCamera");
		cameraScript = mainCamera.GetComponent(CameraScript);
	//Quaternion.Euler(z, y, x);
	}
	
}

function OnTriggerExit (other : Collider) {
	collidedWith = null;
	Destroy (interactionClone);
	
}

function RotatePlayer() {
	//collidedWith.transform.Rotate (0, 0, 90.0);
	
	//var cameraCurrentZ: float = mainCamera.transform.localPosition.z;
	//var cameraCurrentX: float = mainCamera.transform.localPosition.x;
	
	var cameraCurrentZ: float = mainCamera.transform.position.z;
	var cameraCurrentX: float = mainCamera.transform.position.x;
	
	//var zAxisRotationComplete: boolean = false;
	var zAxisMovementComplete: boolean = false;
	//var xAxisRotationComplete: boolean = false;
	var cameraRotationComplete: boolean = false;
	var playerRotationComplete: boolean = false;
	var cameraPivotComplete: boolean = false;
	
	var cameraRotationCount: int = 0;
	var playerRotationCount: float = 1.0;
	var zAxisDistanceCount: float = 0.0;
	
	var angleNum: int = 1;
	var subAngle: float = 0.0;
	
	cameraScript.SetStopFollow(true);
	
	/*var cameraInitialPosX = mainCamera.transform.localosition.x;
	var cameraInitialPosZ = mainCamera.transform.localPosition.z;*/
	
	var cameraInitialPosX = mainCamera.transform.position.x;
	var cameraInitialPosZ = mainCamera.transform.position.z;
	
	/*var screenCenterInitialPosX = mainCamera.transform.localPosition.x;
	var screenCenterInitialPosZ = playerObject.transform.localPosition.z;*/
	
	var screenCenterInitialPosX = mainCamera.transform.position.x;
	var screenCenterInitialPosZ = playerObject.transform.position.z;
	
	/*var pivotPosX = screenCenterInitialPosX;
	var pivotPosZ = mainCamera.transform.localPosition.z - (playerObject.transform.localPosition.x - screenCenterInitialPosX);*/
	
	var pivotPosX = screenCenterInitialPosX;
	var pivotPosZ = mainCamera.transform.position.z - (playerObject.transform.position.x - screenCenterInitialPosX);
	
	print("z: " + pivotPosZ + ", x: " + pivotPosX);
	
	while (zAxisMovementComplete == false || cameraRotationComplete == false || cameraPivotComplete == false || playerRotationComplete == false) {
		
		if (playerRotationCount <= 18.0) {
			playerObject.transform.Rotate (0, 0, 5.0);
			playerRotationCount += 1.0;
		}
		
		else {
			playerRotationComplete = true;
			//playerObject.transform.localRotation = Quaternion.Euler(0, 0, 90);
			
		}
		
		if (angleNum <= 17 && zAxisDistanceCount < 11.032 /*9.57*//*q_1*/) {
			
			subAngle = (angleNum/18.0) * (-1) * (90.0 * Mathf.Deg2Rad);
			//pivotPosZ += 0.403;
			//cameraInitialPosZ += 0.403;
			
			/*pivotPosZ += 0.5316;
			cameraInitialPosZ += 0.5316;
			
			pivotPosZ += 0.0812;
			cameraInitialPosZ += 0.0812;*/
			
			pivotPosZ += 0.6128;
			cameraInitialPosZ += 0.6128;
			
			//pivotPosX += 0.1287;
			//cameraInitialPosX += 0.1287;
			
			pivotPosX += 0.5;
			cameraInitialPosX += 0.5;

			print("cameraInitialPosX - pivotPosX = " + (cameraInitialPosX - pivotPosX));
			print("cameraInitialPosZ - pivotPosZ = " + (cameraInitialPosZ - pivotPosZ));

			var z_i = pivotPosZ + (cameraInitialPosZ - pivotPosZ) * Mathf.Cos(subAngle) + (pivotPosX - cameraInitialPosX) * Mathf.Sin(subAngle);
			var x_i = pivotPosX + (cameraInitialPosX - pivotPosX) * Mathf.Cos(subAngle) + (cameraInitialPosZ - pivotPosZ) * Mathf.Sin(subAngle);
			//mainCamera.transform.localPosition.z = z_i;
			//mainCamera.transform.localPosition.x = x_i;
			
			mainCamera.transform.position.z = z_i;
			mainCamera.transform.position.x = x_i;
			
			//zAxisDistanceCount += 0.403;
			zAxisDistanceCount += 0.5316;
			zAxisDistanceCount -= 0.0812;
			angleNum++;
		}
		
		else {
			cameraPivotComplete = true;
			zAxisMovementComplete = true;
			
		}
		
		if (cameraRotationCount <= 18) {//Nineteen times
		
			mainCamera.transform.Rotate(0, -5.0, 0);
			cameraRotationCount++;
			
			
		}
		
		else {
			cameraRotationComplete = true;
			mainCamera.transform.localRotation = Quaternion.Euler(0, 270.0, 0);
		}
		
		yield WaitForSeconds(0.0001);
		//print("z: " + mainCamera.transform.position.z + ", x: " + mainCamera.transform.position.x);
	
	}
	
	cameraScript.SetStopFollow(false, 0);
	jackEventScript.EnterRestaurant(transform.position.x);
}