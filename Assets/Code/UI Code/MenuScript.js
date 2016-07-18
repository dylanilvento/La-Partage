#pragma strict

var phoneTexture: Texture;
var walletTexture: Texture;
var watchTexture: Texture;
var handTexture: Texture;
var pillBottleTexture: Texture;

var blackBGTexture: Texture;
var logoBGTexture: Texture;

var warningSign: Texture;
var logo: Texture;

var textFont: Font;

var phoneOptionTextures = new Texture[10];

var debugMenuTextures = new Texture[10];
var debugOptionSwitches = new boolean[5];
var optionCount: int = 0;

var menuCount: int = 0;

var pillDrawn: boolean = false;
var showDebugMenu: boolean = false;

var gameOverScreen: boolean = false;
var showStartScreen1: boolean = false;
var showStartScreen2: boolean = false;
var blackOutScreen: boolean = false;

var gameOverNext: boolean = false;

var jackScript: JackScript;
var jackInteractionScript: JackInteractionScript;
var drugScript: DrugScript;

function Start () {

	jackScript = GetComponent(JackScript);
	jackInteractionScript = GetComponent(JackInteractionScript);
	drugScript = GetComponent(DrugScript);
	
	jackScript.enabled = false;
	jackInteractionScript.enabled = false;
	
	showStartScreen1 = true;
	
}

function Update () {
	
	if (Input.GetKeyDown("space") && gameOverScreen){
		Application.LoadLevel(Application.loadedLevel);
	
	}
	
	if (Input.GetKeyDown("space") && blackOutScreen){
		if (gameOverNext) {
			blackOutScreen = false;
			gameOverNext = false;
			gameOverScreen = true;
		}
		
		else {
			blackOutScreen = false;
			jackScript.enabled = true;
			jackInteractionScript.enabled = true;
		}
	
	}
	
	if (Input.GetKeyDown("space") && showStartScreen2){
		showStartScreen2 = false;
		jackScript.enabled = true;
		jackInteractionScript.enabled = true;
	
	}
	
	if (Input.GetKeyDown("space") && showStartScreen1) {
		showStartScreen1 = false;
		showStartScreen2 = true;
		//gameOverScreen = true;
	}

	if (Input.GetKeyDown("tab") && pillDrawn == false) {
		//menuCount++; //For actual game
		
		//if (jackInteractionScript.VarExists("<Jack passes out at date>")) {  //For demo
			menuCount++;
			
			if (menuCount > 0 && menuCount <= 4) {
				
				menuCount = 4;
				jackScript.enabled = false;
				jackInteractionScript.enabled = false;
			}
			
			else {
				jackScript.enabled = true;
				jackInteractionScript.enabled = true;
				//Destroy (handClone);
				menuCount = 0;
			}
			
			if (menuCount == 1) {
				showDebugMenu = false;
			}
		//}
	}
	
	if (menuCount == 1) {
		if (Input.GetKeyDown("up") && optionCount > 0) {
			optionCount--;
			PhoneCursorUp();
		}
		
		if (Input.GetKeyDown("down") && optionCount < 4) {
			optionCount++;
			PhoneCursorDown();
		}
	}
	
	if (Input.GetKeyDown("escape")) {
		menuCount = 0;
		GetComponent(JackScript).enabled = true;
		showDebugMenu = false;
	}
	
	if (Input.GetKeyDown("space") && menuCount == 1) {
		if (!showDebugMenu) {
			showDebugMenu = true;
		}
		
		else if (showDebugMenu) {
			
		}
	}
	
	
	if (Input.GetKeyDown("space") && menuCount == 4 && !pillDrawn) {
		drugScript.Draw();
		
	}
	
	if (Input.GetKeyUp("space") && menuCount == 4) {
		pillDrawn = true;
		//menuCount = 0;
	}
	
	if (Input.GetKeyDown("space") && pillDrawn) {
		//Destroy(handClone);
		drugScript.DestroyPill ();
		pillDrawn = false;
		GetComponent(JackScript).enabled = true;
		GetComponent(JackInteractionScript).enabled = true;
		menuCount = 0;
	}
}

function PhoneCursorUp () {
	
}

function PhoneCursorDown () {

}

function SetGameOverScreen (val : boolean) {
	
	gameOverScreen = val;
	
}

function SetBlackOutScreen (blackOutVal : boolean, gameOverVal : boolean) {
	
	blackOutScreen = blackOutVal;
	gameOverNext = gameOverVal;
	
}

function OnGUI () {

	var textStyle = new GUIStyle();
	
	textStyle.font = textFont;
	textStyle.fontSize = Screen.width / 40.0;
	textStyle.normal.textColor = Color.white;
	
	if (menuCount == 1) {
		//phone
		GUI.DrawTexture(Rect(Screen.width / 2.6, Screen.height / 5.0, Screen.width / 4.25 , Screen.height / 1.25), phoneTexture, ScaleMode.StretchToFill, true, 0);
		
		if (!showDebugMenu) {
			GUI.DrawTexture(Rect(Screen.width / 2.309, Screen.height / 1.7, Screen.width / 7.0 , Screen.height / 20.0), phoneOptionTextures[0], ScaleMode.StretchToFill, true, 0);
		}
		else if (showDebugMenu) {
			GUI.DrawTexture(Rect(Screen.width / 2.309, Screen.height / 1.7, Screen.width / 7.0 , Screen.height / 20.0), debugMenuTextures[0], ScaleMode.StretchToFill, true, 0);
		}
	}
	
	else if (menuCount == 2) {
		//watch
		GUI.DrawTexture(Rect(/*Screen.width / 2.6*/0, Screen.height / 5.0, Screen.width / 1.5 , Screen.height / 1.25), watchTexture, ScaleMode.StretchToFill, true, 0);
	
	}
	
	else if (menuCount == 3) {
		//wallet
		GUI.DrawTexture(Rect(Screen.width / 3.9, Screen.height / 5.0, Screen.width / 2.0 , Screen.height / 1.25), walletTexture, ScaleMode.StretchToFill, true, 0);
	
	}
	
	else if (menuCount == 4) {
		//hand
		GUI.DrawTexture(Rect(Screen.width / 3.0, Screen.height / 5.0, Screen.width / 1.5 , Screen.height / 1.25), handTexture, ScaleMode.StretchToFill, true, 0);
		GUI.depth = 2;
		
		if (!pillDrawn) {
			GUI.DrawTexture(Rect(Screen.width / 1.75, Screen.height / 4.0, Screen.width / 5.5 , Screen.height / 2.25), pillBottleTexture, ScaleMode.StretchToFill, true, 0);
		
		}
		
	}

	if (showStartScreen1) {
		//var startScreen1Style = GUIStyle;
		//startScreen1Style.color = Color.black;
		
		var warningText: String = "Warning!";
		var disclaimer: String = "This demo represents a very early build of\nthe beginning of this game.\n\nWe thank you for taking your time to\ntry it out, and we look forward to any feedback\nyou can provide!\n\n(Press Space to Continue)\n";
		
		GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), blackBGTexture, ScaleMode.StretchToFill, true, 0);
		GUI.DrawTexture(Rect(Screen.width / 2.2, Screen.height / 7.5, Screen.width / 12.0, Screen.height / 6.0), warningSign, ScaleMode.StretchToFill, true, 0);
		
		GUI.Label (Rect(Screen.width / 2.29, Screen.height / 3.5, 100, 50), warningText, textStyle);
		GUI.Label (Rect(Screen.width / 6.0, Screen.height / 2.8, 100, 50), disclaimer, textStyle);
		
	}
	
	if (showStartScreen2) {
	
		GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), logoBGTexture, ScaleMode.StretchToFill, true, 0);
		GUI.DrawTexture(Rect(Screen.width / 8.5, Screen.height / 3.0, Screen.width / 1.30, Screen.height / 4.50), logo, ScaleMode.StretchToFill, true, 0);
	
	}
	
	if (gameOverScreen) {
	
		var gameOver: String = "Game Over.\n\nPress Space to Restart\n\nOr give us feedback in the survey below!";
	
		GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), blackBGTexture, ScaleMode.StretchToFill, true, 0);
		GUI.Label (Rect(Screen.width / 6.0, Screen.height / 2.8, 100, 50), gameOver, textStyle);
		
		jackScript.enabled = false;
		jackInteractionScript.enabled = false;
	
	}
	
	
	if (blackOutScreen) {
	
		var blackOut: String = "Jack\nblacked\nout.";
	
		GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), blackBGTexture, ScaleMode.StretchToFill, true, 0);
		GUI.Label (Rect(Screen.width / 6.0, Screen.height / 2.8, 100, 50), blackOut, textStyle);
		
		jackScript.enabled = false;
		jackInteractionScript.enabled = false;
	
	}
	
	
	
}