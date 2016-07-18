#pragma strict



function Start () {
	
}

function Update () {
	
	BounceUp ();
}

function BounceUp () {
	var startPosition = transform.position.y;
	
	transform.position.y += 0.0025;
	
	yield WaitForSeconds (1.0);
	//print ("test");
	transform.position.y = startPosition;
}

//function BounceDown () {
//	transform.position = Vector3(transform.position.x, transform.position.y - 0.0025, transform.position.z);
//}