#pragma strict

var sizeDenom: int = 1;

function Start () {

}

function Update () {

}

function SizeScrollbar (numOptions : int) {
	sizeDenom = numOptions;
	var scrollbarSize = 2.8 * (4.0 / numOptions);
	transform.localScale.y = scrollbarSize;
}

function ScrollbarUp () {
	transform.position.y +=  2.8 * (1.0 / sizeDenom);


}

function ScrollbarDown () {
	transform.position.y -= 2.8 * (1.0 / sizeDenom);


}