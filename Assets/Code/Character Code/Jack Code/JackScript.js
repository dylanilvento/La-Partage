#pragma strict

var moveSpeed: int = 3;
var textureFlip: double;
var jackMaterials = new Material[2];

var mipMapNum: int;

var uvAnimationTileX = 4; //Here you can place the number of columns of your sheet. 
                          
var uvAnimationTileY = 2; //Here you can place the number of rows of your sheet. 
                          
var framesPerSecond = 5.0;

var dialogueBoxTexture: Texture;

var xPos: boolean = false;
var xNeg: boolean = false;
var zPos: boolean = false;
var zNeg: boolean = false;

var stopLeftMov: boolean = false;
var stopRightMov: boolean = false;

function Start () {
	textureFlip = transform.localScale.x;
	SetMat(0);
	xPos = true;
}

function Update () {
	
	SetMat(0);
	if (Input.GetKey("left") && !(stopLeftMov)) {
		SetMat(1);
		WalkAnimation ();
		MoveLeft ();
	
	}
	
	/*else if ((Input.GetAxis("Horizontal") < 0 )) {
		SetMat(1);
		WalkAnimation ();
		MoveLeft ();
	
	}*/
	
	if (Input.GetKey("right") && !(stopRightMov)){
		SetMat(1);
		WalkAnimation ();
		MoveRight ();

	}
	
	/*else if ((Input.GetAxis("Horizontal") > 0 )){
		SetMat(1);
		WalkAnimation ();
		MoveRight ();

	}*/
	
	/*rigidbody.constraints &= RigidbodyConstraints.FreezePositionY;
	rigidbody.constraints &= RigidbodyConstraints.FreezeRotationX;
	rigidbody.constraints &= RigidbodyConstraints.FreezeRotationY;
	rigidbody.constraints &= RigidbodyConstraints.FreezeRotationZ;*/
	
	if (xPos || xNeg) {
	
		rigidbody.constraints |= RigidbodyConstraints.FreezePositionX | RigidbodyConstraints.FreezePositionZ;
		
		//rigidbody.constraints &= RigidbodyConstraints.FreezePositionX & RigidbodyConstraints.FreezePositionZ;
		rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionX;
		rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionY;
		
	}
	
	if (zPos || zNeg) {
	
		rigidbody.constraints |= RigidbodyConstraints.FreezePositionX | RigidbodyConstraints.FreezePositionZ;
		
		//rigidbody.constraints &= RigidbodyConstraints.FreezePositionX & RigidbodyConstraints.FreezePositionZ;
		rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionZ;
		rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionY;
	}
	
	else if (!xPos && !xNeg && !zPos && !zNeg) {
		
		rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionZ;
		rigidbody.constraints &= ~RigidbodyConstraints.FreezePositionX;
	
	}
}

function SwitchWalkingAxis (newDirection: String) {
	SwitchWalkingAxis(newDirection, true);

}

function SwitchWalkingAxis (newDirection: String, val: boolean) {
	xPos = false;
	xNeg = false;
	zPos = false;
	zNeg = false;

	if (newDirection == "xPos") {
		xPos = val;
	}
	
	else if (newDirection == "xNeg") {
		xNeg = val;
	}
	
	else if (newDirection == "zPos") {
		zPos = val;
	}
	
	else if (newDirection == "zNeg") {
		zNeg = val;
	}

}

function WalkAnimation () {
	// Calculate index
	var index : int = Time.time * framesPerSecond;
	// repeat when exhausting all frames
	index = index % (uvAnimationTileX * uvAnimationTileY);
 
	// Size of every tile
	var size = Vector2 (1.0 / uvAnimationTileX, 1.0 / uvAnimationTileY);
 
	// split into horizontal and vertical index
	var uIndex = index % uvAnimationTileX;
	var vIndex = index / uvAnimationTileX;
 
	// build offset
	// v coordinate is the bottom of the image in opengl so we need to invert.
	var offset = Vector2 (uIndex * size.x, 1.0 - size.y - vIndex * size.y);
 
	renderer.material.SetTextureOffset ("_MainTex", offset);
	renderer.material.SetTextureScale ("_MainTex", size);
}

function MoveLeft () {
	if (xPos) {
			transform.localPosition.x -= moveSpeed * Time.deltaTime;
			transform.localScale.x = -textureFlip;
		}
		
	else if (xNeg) {
			transform.localPosition.x += moveSpeed * Time.deltaTime;
			transform.localScale.x = textureFlip;
		}
		
	else if (zPos) {
			transform.localPosition.z -= moveSpeed * Time.deltaTime;
			transform.localScale.x = -textureFlip;
		}
		
	else if (zNeg) {
			transform.localPosition.z += moveSpeed * Time.deltaTime;
			transform.localScale.x = -textureFlip;
		}
}

function MoveRight () {
		if (xPos) {
			transform.localPosition.x += moveSpeed * Time.deltaTime;
			transform.localScale.x = textureFlip;
		}
		
		else if (xNeg) {
			transform.localPosition.x -= moveSpeed * Time.deltaTime;
			transform.localScale.x = -textureFlip;
			
		}
		
		else if (zPos) {
			transform.localPosition.z += moveSpeed * Time.deltaTime;
			transform.localScale.x = textureFlip;
			
		}
		
		else if (zNeg) {
			transform.localPosition.z -= moveSpeed * Time.deltaTime;
			transform.localScale.x = textureFlip;
			
		}

}


function SetMat(index: int) {
    renderer.material = jackMaterials[index];
}

function SetStopLeftMov (val: boolean) {

	stopLeftMov = val;
}

function SetStopRightMov (val: boolean) {
	
	stopRightMov = val;

}