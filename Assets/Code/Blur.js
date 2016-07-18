#pragma strict

function Start () {

}

function Update () {
	gameObject.renderer.material.mainTexture.mipMapBias = 10;
}