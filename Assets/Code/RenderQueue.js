#pragma strict

var renderQueueIndex: int;

function Start () {
	gameObject.renderer.material.renderQueue = renderQueueIndex;
}

function Update () {

}