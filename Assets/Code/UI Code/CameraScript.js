#pragma strict

var target: GameObject; 

var relativePosition: Vector3;

var stopFollow: boolean = false;
var stopFollowX: boolean = false;

var prevPos: Vector3;
 

function Start() {

    relativePosition = target.transform.position - transform.position;
    prevPos = transform.position;

}

function Update () {

	if (!stopFollow) {
    	transform.position = target.transform.position - relativePosition;
    }
    
    else if (stopFollowX) {
    	transform.position.y = target.transform.position.y - relativePosition.y;
    	transform.position.z = target.transform.position.z - relativePosition.z;
    }

}

function CenterCamera (position: double, axis: String) {

	stopFollow = true;
	
	if (axis == "x" && target.GetComponent(JackScript).xPos) {
		while (transform.position.x > position) {
			transform.position.x -= 0.1;
			yield WaitForSeconds (0.01);
		}
	}
	else if (axis == "x" && target.GetComponent(JackScript).xNeg) {
		while (transform.position.x < position) {
			transform.position.x += 0.1;
			yield WaitForSeconds (0.01);
		}
	}
	else if (axis == "z" && target.GetComponent(JackScript).zPos) {
		while (transform.position.z > position) {
			transform.position.z -= 0.1;
			yield WaitForSeconds (0.01);
		}
	}
	else if (axis == "z" && target.GetComponent(JackScript).zNeg) {
		while (transform.position.z < position) {
			transform.position.z += 0.1;
			yield WaitForSeconds (0.01);
		}
	}

}

function SetStopFollow (val: boolean) {
	stopFollow = val;

}

function SetStopFollow (val: boolean, flag: int) {
	relativePosition = target.transform.position - transform.position;
	stopFollow = val;
	stopFollowX = val;

}

function SetStopFollowX (val: boolean) {
	stopFollow = val;  //Makes it so camera doesn't follow any axis
	stopFollowX = val;  //Then switches it so camera continues to follow y and z
}

/*function OnDrawGizmos () {

	Gizmos.color = Color.red;
	Gizmos.DrawLine (Vector3(0,0,0), transform.position);
    
    prevPos = transform.position;
}*/