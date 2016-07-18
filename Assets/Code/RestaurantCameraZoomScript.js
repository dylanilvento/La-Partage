#pragma strict

var mainCamera: GameObject;
var collidedWith: GameObject;

var cameraScript: CameraScript;

function Start () {

}

function Update () {

}

function OnTriggerEnter (other: Collider) {
	collidedWith = other.gameObject;
	
	//TestPosition();

}

function OnTriggerExit (other : Collider) {
	//collidedWith = other.gameObject;
	
	TestPosition();
	
}

function TestPosition () {

	if (collidedWith.tag == "Player") {
		mainCamera = GameObject.FindWithTag("MainCamera");
		cameraScript = mainCamera.GetComponent(CameraScript);
		
		if (collidedWith.transform.position.z > transform.position.z) {
			CameraZoomIn();
		}
		
		else if (collidedWith.transform.position.z < transform.position.z) {
			CameraZoomOut();
		}
	
	}

}

function CameraZoomIn() {
	
	cameraScript.SetStopFollowX(true);

	while (mainCamera.transform.position.x > transform.position.x + 8.0) {
		mainCamera.transform.position.x -= 0.1;
		yield WaitForSeconds (0.01);
		//print("Test");
	}
	
	cameraScript.SetStopFollow(false, 0);

}

function CameraZoomOut() {

	cameraScript.SetStopFollowX(true);
	
	while (mainCamera.transform.position.x < transform.position.x + 13.0) {
		mainCamera.transform.position.x += 0.1;
		yield WaitForSeconds (0.01);
	}
	
	cameraScript.SetStopFollow(false, 0);

}