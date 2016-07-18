#pragma strict



function Start () {
	
}

function Update () {
	
	//print(startPosition);
	Bounce ();
	//BounceDown ();
	//WaitForSeconds(5);
	//BounceDown ();
}

function Bounce () {
	var startPosition = transform.position.x;
	
	transform.position = Vector3(transform.position.x + 0.005, transform.position.y, transform.position.z);
	
	yield WaitForSeconds (1.0);
	//print ("test");
	transform.position = Vector3(startPosition, transform.position.y, transform.position.z);
}

//function BounceDown () {
//	transform.position = Vector3(transform.position.x, transform.position.y - 0.0025, transform.position.z);
//}