#pragma strict

var moveSpeed: int = 3;
var textureFlip: double;
var jackMaterials = new Material[2];
var jackSprites = new Sprite[9];
var jackWalkSpriteIndex: int = 1;


var mipMapNum: int;

var uvAnimationTileX = 4; //Here you can place the number of columns of your sheet. 
                          
 
var uvAnimationTileY = 2; //Here you can place the number of rows of your sheet. 
                          
var framesPerSecond = 5.0;

var dialogueBoxTexture: Texture;

function Start () {
	textureFlip = transform.localScale.x;
	GetComponent(SpriteRenderer).sprite = jackSprites[0];
	renderer.material = jackMaterials[0];
	
}

function Update () {
	
	GetComponent(SpriteRenderer).sprite = jackSprites[0];
	renderer.material = jackMaterials[0];
	
	if (Input.GetKey("left")) {
		renderer.material = jackMaterials[1];
		transform.position.x -= moveSpeed * Time.deltaTime;
		transform.localScale.x = -textureFlip;
		
		WaitForSeconds(5);
		WalkAnimation (jackWalkSpriteIndex);
		
		if (jackWalkSpriteIndex == jackSprites.length - 1) {
			jackWalkSpriteIndex = 1;
		}
		else {
			jackWalkSpriteIndex++;
		}
	}
	
	if (Input.GetKey("right")){
		renderer.material = jackMaterials[1];
		transform.position.x += moveSpeed * Time.deltaTime;
		transform.localScale.x = textureFlip;
		
		WaitForSeconds(5);
		WalkAnimation (jackWalkSpriteIndex);
		
		if (jackWalkSpriteIndex == jackSprites.length - 1) {
			jackWalkSpriteIndex = 1;
		}
		else {
			jackWalkSpriteIndex++;
		}
		
	}
	
}

function WalkAnimation (index) {
	/*// Calculate index
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
	renderer.material.SetTextureScale ("_MainTex", size);*/
	
	GetComponent(SpriteRenderer).sprite = jackSprites[index];
	

}

function SetMat(index)
{
    renderer.material = jackMaterials[index];
}

/*
function OnGUI () {
	GUI.DrawTexture(Rect(Screen.width / 4.0, Screen.height / 4.0, Screen.width / 2.0 , Screen.height / 4.0), dialogueBoxTexture, ScaleMode.ScaleToFit, true, 0);
	//Rect(x, y, width, height);
}*/