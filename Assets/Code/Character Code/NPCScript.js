#pragma strict
import System.IO;
import System.Collections.Generic;

var collidedWith: GameObject;

var textureFlip: double;

var interactionBox: GameObject;		//Variables for storing the prefabs
var dialogueScrollbar: GameObject;

var interactionClone: GameObject;  //Variables that create copies of the prefabs on screen
var dialogueScrollbarClone: GameObject;

var mainCamera: Camera;

var dialogueText: String;

var dialogueChoice1: String = "";
var dialogueChoice2: String = "";
var dialogueChoice3: String = "";
var dialogueChoice4: String = "";

var dialogueBoxTexture: Texture;
var dialogueArrowTexture: Texture;
var dialogueSquareTexture: Texture;
var dialogueBoxTailTexture: Texture;

var dialogueStyle = new GUIStyle ();
var dialogueFont: Font;

var dialogueArrowCount: float = 0.0;


//Semaphores
var endOfDialogue: boolean = false;
var dialogueIsFinished: boolean = false;
var afterChoice: boolean = false;

var noScore: boolean = false;

var switchNext: boolean = false;  //Flag for when to change speakers
var switchSpeaker: boolean = false; //false = NPC speaks, true = Jack speaks

var dialogueActive: boolean = false;
var dialogueMenuActive: boolean = false;
var originalChoicesActive: boolean = true;
var countChoices: boolean = true;

var dialogueMenuNext: boolean = false;
var dialogueMenuNow: boolean = false;

var textFile: String;
var dialogueAsset = new TextAsset[70];
var dialogueAssetLines: String[]; //new Array();
var dialogueAssetIndex: int = 0;

var line1: String;
var line2: String;
var line3: String;
var line4: String;
var line5: String;
var line6: String;
var pageCount: int = 0;

//var pageDisplay: int = 0;

//var dialogueChoice = new String[20];
//var dialogueChoice = new Array();  //Array class does not show up in inspector
var dialogueChoice = new List.<String>();
var dialogueVarReq = new List.<String>();
var dialogueScoreMinReq = new List.<int>();
var dialogueScoreMaxReq = new List.<int>();
var dialogueLink = new List.<int>(); //= new Array();

//var linesToSkip: int = 0;
var dialogueAssetLink: int = 0;
var numOptions: int;
var hiddenChoicesTotal: int = 0;

var dialogueChoiceCount: int = 0;
var lastDialogueChoiceNum: int = 3;

var jackScript: JackScript;
var jackInteractionScript: JackInteractionScript;
var drugScript: DrugScript;
var menuScript: MenuScript;
var cameraScript: CameraScript;

//var otherNPCScriptFlag: String;

var animationNum: String;
var endAnimationExists: boolean = false;

//*****************************************************************************
//FOR MULTIPLE CHARACTERS
//*****************************************************************************

var characterSpeakers = new List.<String>();
var multipleCharacters: boolean = false;
var currentSpeaker: String;
var nextSpeaker: String;

//*****************************************************************************
//ANIMATION SCRIPTS
//*****************************************************************************

var cookAnimationScript: CookAnimationScript;
var hostessAnimationScript: HostessAnimationScript;
var treyAnimationScript: TreyAnimationScript;
var cooperAnimationScript: CooperAnimationScript;
var reginaAnimationScript: ReginaAnimationScript;
var aggieAnimationScript: AggieAnimationScript;

//*****************************************************************************
//DIALOGUE SCRIPTS
//*****************************************************************************
//var hasMultipleDialogueArrays: boolean = false;

//var reginaDialogueScript: ReginaDialogueScript;



var scrollbarScript: ScrollbarScript;

var scrollbarObject: GameObject;

function Awake () {
	cookAnimationScript = GetComponent(CookAnimationScript);
	hostessAnimationScript = GetComponent(HostessAnimationScript);
	//reginaDialogueScript = GetComponent(ReginaDialogueScript);
	treyAnimationScript = GetComponent(TreyAnimationScript);
	cooperAnimationScript =  GetComponent(CooperAnimationScript);
	reginaAnimationScript = GetComponent(ReginaAnimationScript);
	aggieAnimationScript = GetComponent(AggieAnimationScript);
	
	//otherNPCScriptFlag = gameObject.name;
}


function Start () {
	textureFlip = transform.localScale.x;  //Determines the initial facing side of the NPC
	

}

function Update () {

	if ((line5 == "[Choice]" || line1 == "[Choice]" || line5 == "[Info]" || line1 == "[Info]") && jackInteractionScript.enabled == false) {

		if (Input.GetKeyDown("up")) {
			if (dialogueChoiceCount > lastDialogueChoiceNum - 3){
				dialogueChoiceCount--;
				dialogueArrowCount -= (Screen.height / 18.0);
			}
			else if (dialogueChoiceCount <= lastDialogueChoiceNum - 3 && dialogueChoiceCount != 0) {
				originalChoicesActive = false;
				PrevDialogueChoice (dialogueChoiceCount);
				dialogueChoiceCount--;
				lastDialogueChoiceNum--;
				//dialogueArrowCount -= (Screen.height / 15.0);
				//scrollbarScript.ScrollbarUp();
			}
		}
		
		if (Input.GetKeyDown("down")){
			if ((dialogueChoiceCount < lastDialogueChoiceNum) && (dialogueChoiceCount < numOptions - 1)) {
				if (dialogueChoiceCount < (numOptions - hiddenChoicesTotal - 1)) {	//test		
					dialogueChoiceCount++;
					dialogueArrowCount += (Screen.height / 18.0);
				}
			}
			//else if (dialogueChoiceCount + 1 < dialogueChoice.length - hiddenChoicesTotal) { //Array version
			else if (dialogueChoiceCount + 1 < dialogueChoice.Count - hiddenChoicesTotal) { //Generic list version
				originalChoicesActive = false;
				NextDialogueChoice (dialogueChoiceCount);
				dialogueChoiceCount++;
				lastDialogueChoiceNum = dialogueChoiceCount;
				//dialogueArrowCount += (Screen.height / 15.0);
				//scrollbarScript.ScrollbarDown();
			}
			
		}
		if (Input.GetKeyDown("space")) {
			jackInteractionScript.enabled = true;
			switchSpeaker = true;
			
			if (multipleCharacters) {
				currentSpeaker = "[Jack]";
			}
			
			dialogueAssetLines = dialogueAsset[dialogueLink[dialogueChoiceCount] - 1].text.Split("\n"[0]);
			dialogueAssetIndex = 0;
			
			dialogueChoiceCount = 0;
			afterChoice = true;
			
			dialogueActive = true;
			dialogueMenuActive = false;
			dialogueMenuNow = false;
			
			originalChoicesActive = true;
			countChoices = true;
			
			hiddenChoicesTotal = 0;
			
			if (line5 == "[Choice]" || line1 == "[Choice]") {
				drugScript.DecrementScore();
			}
			
			line1 = "";
			line5 = "";
			
			dialogueChoice1 = "";
			dialogueChoice2 = "";
			dialogueChoice3 = "";
			dialogueChoice4 = "";
			
			dialogueArrowCount = 0;
			
			/*if (dialogueIsFinished) {
				dialogueActive = false;
			}*/
			
			ReadDialogue(pageCount);
			//DestroyDialogue();
			//DialogueBox();
			
		}
	}

}

/*
*  Reads the next available dialogue from the text file
*  @param page The current page of dialogue, starts at 0
*/

function ReadDialogue (page : int) {
		
	dialogueText = "";  							//Assigns blank text to dialogueText variable, 
													//must exist in order for dialogueText to work
	if (!dialogueIsFinished) {	
		if (jackScript.xPos || jackScript.xNeg) {
			
			if (jackScript.xPos) {
				
				FlipNPC("xPos");
			
			}
			
			else {
				
				FlipNPC("xNeg");
			
			}
			
			cameraScript.CenterCamera(transform.position.x, "x");
		}
		
		else if (jackScript.zPos || jackScript.zNeg) {
		
			if (jackScript.zPos) {
				
				FlipNPC("zPos");
			
			}
			
			else {
				
				FlipNPC("zNeg");
			
			}
			
			cameraScript.CenterCamera(transform.position.z, "z");
		}
	}
	
	else {
		cameraScript.SetStopFollow(false);
	}
	
	if (!dialogueIsFinished && !dialogueMenuNow) {  //If the dialogue has not finished and a dialogue menu is not present

		if (page == 0) {  							//If this is the first page,
		
			/*if (hasMultipleDialogueArrays) {
				 LoadDialogue();
			
			}*/
			
			try {         							//then assign this text file to the textSource variable
				//textSource = new StreamReader(textFile);
				//dialogueAsset = /*(TextAsset)*/ Resources.Load(textFile, typeof(TextAsset));
				dialogueAssetLines = dialogueAsset[0].text.Split("\n"[0]);
				dialogueAssetIndex = 0;
				
			}
		
			catch (error) {  						//If the file does not exist, print this message to the console
				print(error.Message);
			}
		}
		
		
		//******************************************************************************//
		// CHECKS FOR CONTINUING DIALOGUE BEFORE PARSING NEW DIALOGUE
		//******************************************************************************//
		
		//THIS NEEDS TO COME BEFORE THE CHECK FOR THE SWITCH (line5 == "[Switch]")
		if (switchNext) {																//Flag is set to change speakers														
			if (!multipleCharacters) {
				switchSpeaker = !switchSpeaker;												//NPC speaks (switchSpeaker == false)
																						//Jack speaks (switchSpeaker == true)
			}
			else {
				currentSpeaker = nextSpeaker;
			}
																							
			switchNext = false;
		}
		
		if (line5 == "[Switch]" || line5 == "[Add Var]") {  				//If line5 equals [Switch], then assign the next line of text to line1 (done when next page of dialogue is read?)
			
			line1 = dialogueAssetLines[dialogueAssetIndex];
			dialogueAssetIndex++;
		}
	
		else if (afterChoice) {		//This is for after dialogue options
	
			line1 = dialogueAssetLines[dialogueAssetIndex];
			dialogueAssetIndex++;
			
			afterChoice = false;
		
		}
		
		else if (line5 == "[Link]") {
		
			line1 = dialogueAssetLines[dialogueAssetIndex];
			dialogueAssetIndex++;
		
		}
		
		else if (line1 == "[Switch]") {
		
			line1 = dialogueAssetLines[dialogueAssetIndex];
			dialogueAssetIndex++;
		}
		
		else if (CheckSpeaker(line1)) {
			
			currentSpeaker = line1;  //may break
			
			line1 = dialogueAssetLines[dialogueAssetIndex];
			
			dialogueAssetIndex++;
		} 
		
		else if (line1 == "[Multiple Characters]") {
			line1 = dialogueAssetLines[dialogueAssetIndex];
			dialogueAssetIndex++;
		
		}
		
		else if (pageCount > 0 && endOfDialogue == false) {  //If it is not the first page and not the endOfDialogue,
			line1 = line5;									 //then assign line5 to line1
			
		}
		
		//******************************************************************************//
		// CHECKS FOR NEW AND CONTINUING DIALOGUE
		//******************************************************************************//
		
		else {												//Otherwise, assign the next line to line1
		
			line1 = dialogueAssetLines[dialogueAssetIndex];
			dialogueAssetIndex++;
		}
		
		//Assign the next four lines to line2, line3, line4, line5
		line2 = dialogueAssetLines[dialogueAssetIndex];
		dialogueAssetIndex++;
		
		line3 = dialogueAssetLines[dialogueAssetIndex];
		dialogueAssetIndex++;
		
		line4 = dialogueAssetLines[dialogueAssetIndex];
		dialogueAssetIndex++;
		
		line5 = dialogueAssetLines[dialogueAssetIndex];
		dialogueAssetIndex++;

		//Needs to come before other checks so that they'll see new line5
		if (line5 == "[Add Var]") {
			//dialogueText = line1 + "\n" + line2 + "\n" + line3 + "\n" + line4;
			var npcVar = dialogueAssetLines[dialogueAssetIndex];
			jackInteractionScript.AddVar(npcVar);
			dialogueAssetIndex++;
			line5 = dialogueAssetLines[dialogueAssetIndex];
			dialogueAssetIndex++;
			//print(line5);
			
		}
		
		
		if (line5 != "[End]") {
			//Currently only being used for dialogue that starts with NPC talking and immediately switches to Jack talking
			line6 = dialogueAssetLines[dialogueAssetIndex];
		}
		
		
		
		if (line5 == "[End]") {													//If the [End] flag is read as the fifth line
			dialogueText = line1 + "\n" + line2 + "\n" + line3 + "\n" + line4;  //Combine the previous four lines into the new dialogue
			endOfDialogue = true;												//Flag for the end of dialogue
			
			if ((dialogueAssetIndex - 1) < (dialogueAssetLines.length - 1)) {
				if (dialogueAssetLines[dialogueAssetIndex] == "[Animation]") {
					
					endAnimationExists = true;
					
					animationNum = dialogueAssetLines[dialogueAssetIndex + 1];
					
				}
			
			}
			
		}
		
		else if (line1 == "[Multiple Characters]") {
			AddCharacterSpeakers(line2);
			multipleCharacters = true;
			currentSpeaker = line3;
			dialogueAssetIndex++;
			
			dialogueText = line4 + "\n" + line5 + "\n" + line6 + "\n" + dialogueAssetLines[dialogueAssetIndex];
			
			dialogueAssetIndex++;
		}
		
		else if (line1 == "[Switch]") { //For the beginning of dialogue when NPC speaks first
			dialogueText = line2 + "\n" + line3 + "\n" + line4 + "\n" + line5;
			switchSpeaker = false;
			
			if (line6 == "[Switch]") {
				switchNext = true;
				dialogueAssetIndex++;
			}
		}
		
		else if (CheckSpeaker(line1)) {
			dialogueText = line2 + "\n" + line3 + "\n" + line4 + "\n" + line5;
			currentSpeaker = line1;
			//switchNext = true;
		}
		
		else if (CheckSpeaker(line5)) {
			dialogueText = line1 + "\n" + line2 + "\n" + line3 + "\n" + line4;
			nextSpeaker = line5;
			switchNext = true;
		}
		
		else if (line5 == "[Switch]") {											//If the switch flag is read as the fifth line
			
			dialogueText = line1 + "\n" + line2 + "\n" + line3 + "\n" + line4;  //Combine the previous four lines into the new dialogue
			
			switchNext = true;
		}
		
		else if (line5 == "[Choice]" || line5 == "[Info]") {											//If the [Choice] flag is read on the fifth line
			dialogueText = line1 + "\n" + line2 + "\n" + line3 + "\n" + line4;	//Combine the previous four lines into the new dialogue
			
			dialogueMenuNext = true;											//Flag that dialogue choice is coming up
			
			ReadChoices();
			
		}
		
		else if (line5 == "[Link]") {
			dialogueText = line1 + "\n" + line2 + "\n" + line3 + "\n" + line4;
			
			//CHECK TO SEE IF THIS BREAKS
			if (dialogueAssetLines[dialogueAssetIndex] == "[Switch]") {
				switchNext = true;
				dialogueAssetIndex++;
			}
			
			if (multipleCharacters && CheckSpeaker(dialogueAssetLines[dialogueAssetIndex])) {
				switchNext = true;
				nextSpeaker = dialogueAssetLines[dialogueAssetIndex];
				dialogueAssetIndex++;
			}
			
			
			dialogueAssetLink = parseInt(dialogueAssetLines[dialogueAssetIndex]);
			dialogueAssetIndex = 0;
			
			try {         							//Assign this text file to the textSource variable

				dialogueAssetLines = dialogueAsset[dialogueAssetLink - 1].text.Split("\n"[0]);
			}
		
			catch (error) {  						//If the file does not exist, print this message to the console
				print(error.Message);
			}

		}
		
		else if (line5 == "[Animation]") {
			animationNum = dialogueAssetLines[dialogueAssetIndex];
			dialogueAssetIndex++;
			
			RunAnimation(animationNum);
		
		}
		
		
		else {																	//If no flag is found on the fifth line,
			dialogueText = line1 + "\n" + line2 + "\n" + line3 + "\n" + line4;	//then assign the first four lines to the dialogue text
		}
		
		
		//So it doesn't skip because it already hit some other statement
		if (line6 == "[Animation]") {
			dialogueAssetIndex++;
			animationNum = dialogueAssetLines[dialogueAssetIndex];
			dialogueAssetIndex++;
			
			RunAnimation(animationNum);
		
		}
		
		else if (line6 == "[Choice]" || line6 == "[Info]") {											//If the [Choice] flag is read on the fifth line
			//dialogueText = line1 + "\n" + line2 + "\n" + line3 + "\n" + line4;	//Combine the previous four lines into the new dialogue
			dialogueAssetIndex++;
			dialogueMenuNext = true;											//Flag that dialogue choice is coming up
			
			ReadChoices();
			
		}
		
		pageCount++;															//Increment page count
	
		dialogueActive = true;
		
	}
	
	else if (dialogueMenuNow) {
		dialogueMenuActive = true;
	
	}
	
}

/*
*	Destroys all objects assocaited with dialogue
*/

function DestroyDialogue () {

	if (dialogueIsFinished) {													//If dialogue is finished, then allow player to move again
		jackScript.enabled = true;
		menuScript.enabled = true;
		
		if (!(jackInteractionScript.hideInteractionObject)) {
			InstantiateInteraction ();
		}
		
		endOfDialogue = false;
		switchNext = false;
		switchSpeaker = false;
		pageCount = 0;
		jackInteractionScript.SetDialogueCount(-1); //Important
	}
	
	//transform.localScale.x = textureFlip;
}

function RunAnimation (num : String) {

	switch (gameObject.name) {
		case "Cook": cookAnimationScript.RunAnimation(num);
					 break;
		
		case "Hostess": hostessAnimationScript.RunAnimation(num);
						break;
						
		case "Trey": treyAnimationScript.RunAnimation(num);
						break;
						
		case "Regina": reginaAnimationScript.RunAnimation(num);
						break;
		
		case "Cooper": cooperAnimationScript.RunAnimation(num);
						break;
		
		case "Aggie": aggieAnimationScript.RunAnimation(num);
						break;
		default: print ("No script available.");
	}

}

function LoadDialogue (newDialogue : TextAsset[]) {

	/*switch (otherNPCScriptFlag) {
		case "Regina": dialogueAsset = reginaDialogueScript.LoadDialogue();
					 break;

		default: print ("No script available.");
	}*/
	
	dialogueAsset = newDialogue;

}

function AddCharacterSpeakers (speakers : String) {
	var startCharIndex = 0;
	for (var i = 0; i < speakers.length; i++) {
		
		print(speakers.Substring(i, 1));
		
		if (i == speakers.length - 1 && speakers.Substring(i, 1) == "]") {
			print(speakers.Substring(startCharIndex));
			characterSpeakers.Add(speakers.Substring(startCharIndex));
		}
		
		else if (speakers.Substring(i, 1) == ",") {
			print(speakers.Substring(startCharIndex, i - startCharIndex));
			characterSpeakers.Add(speakers.Substring(startCharIndex, i - startCharIndex));
			startCharIndex = i + 2;
		}
	}
}

function CheckSpeaker (line : String) {
	for (var i = 0; i < characterSpeakers.Count; i++) {
		if (line == characterSpeakers[i]) {
			return true;
		}
	}
	return false;
}

function ParseNameFromBrackets (name : String) {
	for (var i = 0; i < name.length; i++) {
		if (name.Substring(i, 1) == "]") {
			return name.Substring(1, i - 1);
		}
	}

}

function ReadChoices () {
	//dialogueChoice = new Array(); //Array version
	dialogueChoice = new List.<String>();
	dialogueVarReq = new List.<String>();
	dialogueScoreMinReq = new List.<int>();
	dialogueScoreMaxReq = new List.<int>();
	dialogueLink = new List.<int>();

	
	//numOptions = parseInt(textSource.ReadLine());						//Read the next line, which is the number of dialogue options
	numOptions = parseInt(dialogueAssetLines[dialogueAssetIndex]);
	dialogueAssetIndex++;
	
	for(var i = 0; i < numOptions; i++) {								//Run this loop for the amount of dialogue options that exist
		
		//This array holds the dialogue options text
		//dialogueChoice.push(dialogueAssetLines[dialogueAssetIndex]);  //Array version -- doesn't work for inspector/GUI
		dialogueChoice.Add(dialogueAssetLines[dialogueAssetIndex]);
		
		print(dialogueAssetLines[dialogueAssetIndex]);
		dialogueAssetIndex++;
		
		dialogueVarReq.Add(dialogueAssetLines[dialogueAssetIndex]);
		dialogueAssetIndex++;
		
		if (!noScore) {
			//dialogueScoreReq.Add(parseInt(textSource.ReadLine())); 			//This list holds the score requirement for the dialogue option
			dialogueScoreMinReq.Add(parseInt(dialogueAssetLines[dialogueAssetIndex].Substring(0, 2))); //Must go one after last char for substring
			dialogueScoreMaxReq.Add(parseInt(dialogueAssetLines[dialogueAssetIndex].Substring(4)));
			
			dialogueAssetIndex++;
		}
		
		else {
			dialogueScoreMinReq.Add(0);
			dialogueScoreMaxReq.Add(100);
			
			dialogueAssetIndex++;
		}
		
								//This array holds the links for each dialogue option's text file
		dialogueLink.Add(parseInt(dialogueAssetLines[dialogueAssetIndex]));
		dialogueAssetIndex++;
		
	}
	
	for (var k = 0; k < dialogueChoice.Count; k++) {
	
		if (drugScript.score < dialogueScoreMinReq[k] || drugScript.score > dialogueScoreMaxReq[k] || !(jackInteractionScript.VarExists(dialogueVarReq[k]))) {
			dialogueChoice.RemoveAt(k);
			dialogueVarReq.RemoveAt(k);
			dialogueScoreMinReq.RemoveAt(k);
			dialogueScoreMaxReq.RemoveAt(k);
			dialogueLink.RemoveAt(k);
			k--;
		}
	
	}
	
	if (line5 == "[Choice]" || line1 == "[Choice]") {
		line5 = "[Choice]";
	}
	
	else {
		line5 = "[Info]";
	}

}

function RandomizeChoices () {
	var choicesMoved = 0;
	
	//var choicesMovedIndex = Mathf.Round(Random.Range(0.0, dialogueChoice.length - 1 - choicesMoved)); //Array version of dialogueChoice
	var choicesMovedIndex = Mathf.Round(Random.Range(0.0, dialogueChoice.Count - 1 - choicesMoved)); //Generic List version
	
}

function NextDialogueChoice (currentChoice : int) {
	var hiddenChoicesCount: int = 0;									//Create a variable to count the number of dialogue choices hidden from the player
	var textPosition: int = 0;
	var firstDialogueOption: int = currentChoice - 2;
	var dialogueChoiceNum: int = 1;

	for (var i = currentChoice - 2; i < firstDialogueOption + 4 + hiddenChoicesCount; i++) {		//This loop instantiates four dialogue options on the screen
		
		//if (i < dialogueChoice.length) {								//Array version of dialogueChoice
		if (i < dialogueChoice.Count) {								//Generic list version of dialougeChoice
																	//If the index is less than the length of the array
		
			
			//if (drugScript.score >= dialogueScoreMinReq[i] && drugScript.score <= dialogueScoreMaxReq[i] && jackInteractionScript.VarExists(dialogueVarReq[i])) {				//If the player's score is greater than or equal to the current dialogue score requirement
						//dialogueChoiceClone = Instantiate(dialogueObject, Vector3(transform.position.x - 4.5, transform.position.y + 5.5 - ((i - hiddenChoicesCount)/1.5), transform.position.z - 0.01), Quaternion.identity);
						if (dialogueChoiceNum == 1) {
							dialogueChoice1 = dialogueChoice[i];
						
						}
						
						else if (dialogueChoiceNum == 2) {
							dialogueChoice2 = dialogueChoice[i];
						
						}
						
						else if (dialogueChoiceNum == 3) {
							dialogueChoice3 = dialogueChoice[i];
						
						}
						
						else if (dialogueChoiceNum == 4) {
							dialogueChoice4 = dialogueChoice[i];
						
						}
						
						dialogueChoiceNum++;	
			//}
			
			
			/*else {														//If the player's score is not greater than or equal to the current dialouge score reqiurement
			
				hiddenChoicesCount++;									//then increment the hiddenChoicesCount by 1
			}*/
		}
		
	}

}


function PrevDialogueChoice (currentChoice : int) {
	var hiddenChoicesCount: int = 0;									//Create a variable to count the number of dialogue choices hidden from the player
	var textPosition: int = 0;
	var firstDialogueOption: int = currentChoice - 1;
	var dialogueChoiceNum: int = 1;
		
	for (var i = currentChoice - 1; i < firstDialogueOption + 4 + hiddenChoicesCount; i++) {		//This loop instantiates four dialogue options on the screen
		
		//if (i < dialogueChoice.length) {	//Array version of dialogueChoice							
		if (i < dialogueChoice.Count) {	//Generic list version of dialogueChoice
		//If the index is less than the length of the array
			
			if (drugScript.score >= dialogueScoreMinReq[i] && drugScript.score <= dialogueScoreMaxReq[i] && jackInteractionScript.VarExists(dialogueVarReq[i])) {				//If the player's score is greater than or equal to the current dialogue score requirement
						if (dialogueChoiceNum == 1) {
							dialogueChoice1 = dialogueChoice[i];
						
						}
						
						else if (dialogueChoiceNum == 2) {
							dialogueChoice2 = dialogueChoice[i];
						
						}
						
						else if (dialogueChoiceNum == 3) {
							dialogueChoice3 = dialogueChoice[i];
						
						}
						
						else if (dialogueChoiceNum == 4) {
							dialogueChoice4 = dialogueChoice[i];
						
						}
						
						dialogueChoiceNum++;	
			}
			
			
			
			/*else {														//If the player's score is not greater than or equal to the current dialouge score reqiurement
			
				hiddenChoicesCount++;									//then increment the hiddenChoicesCount by 1
			}*/
		}
		
	}
	
	//dialogueChoiceNum = 1;

}

function InstantiateInteraction () {
	if (jackScript.xPos) {
		interactionClone = Instantiate(interactionBox, Vector3(transform.position.x - 0.25,transform.position.y + 2.25, transform.position.z), Quaternion.Euler(180, transform.localRotation.y, transform.rotation.z));
	}
	
	else if (jackScript.xNeg) {
		interactionClone = Instantiate(interactionBox, Vector3(transform.position.x - 0.25,transform.position.y + 2.25, transform.position.z), Quaternion.Euler(180, transform.localRotation.y - 180, transform.rotation.z));
	}
	
	else if (jackScript.zPos) {
		interactionClone = Instantiate(interactionBox, Vector3(transform.position.x - 0.25,transform.position.y + 2.25, transform.position.z), Quaternion.Euler(180, transform.localRotation.y - 90, transform.rotation.z));
	}
	
	else if (jackScript.zNeg) {
		interactionClone = Instantiate(interactionBox, Vector3(transform.position.x - 0.25,transform.position.y + 2.25, transform.position.z), Quaternion.Euler(180, transform.localRotation.y - 270, transform.rotation.z));
	}
}

function FlipNPC (pos : String) {
//DEFAULT ALL CHARACTERS TO FACE RIGHT
	if (pos == "xPos") {
		if (((transform.position.x > jackScript.transform.position.x) && (transform.localScale.x > 0)) || (transform.position.x < jackScript.transform.position.x) && (transform.localScale.x < 0)) {
			transform.localScale.x = -textureFlip;
		}
	}
		
	if (pos == "xNeg") {
		if (((transform.position.x < jackScript.transform.position.x) && (transform.localScale.x > 0)) || (transform.position.x > jackScript.transform.position.x) && (transform.localScale.x < 0)) {
			transform.localScale.x = -textureFlip;
		}
	
	}
	
	if (pos == "zPos") {
		if (((transform.position.z < jackScript.transform.position.z) && (transform.localScale.x < 0)) || (transform.position.z > jackScript.transform.position.z) && (transform.localScale.x > 0)) {
			transform.localScale.x = -textureFlip;
		}
	}
		
	if (pos == "zNeg") {
		if (((transform.position.z > jackScript.transform.position.z) && (transform.localScale.x > 0)) || (transform.position.z < jackScript.transform.position.z) && (transform.localScale.x < 0)) {
			transform.localScale.x = -textureFlip;
		}
	
	}
}

function OnTriggerEnter (other : Collider) {
	collidedWith = other.gameObject;
	//textFile = "Assets/Resources/TestText";  //For now
	switchSpeaker = false; //bugged
	
	if (collidedWith.tag == "Player") {
		//interactionClone = Instantiate(interactionBox, Vector3(transform.position.x - 0.25,transform.position.y + 2.25, transform.position.z), Quaternion.Euler(180, transform.localRotation.y, transform.rotation.z));
		
		jackScript = other.gameObject.GetComponent(JackScript);
		jackInteractionScript = other.gameObject.GetComponent(JackInteractionScript);
		noScore = jackInteractionScript.noScore;
		
		drugScript = other.gameObject.GetComponent(DrugScript);
		menuScript = other.gameObject.GetComponent(MenuScript);
		cameraScript = GameObject.FindWithTag("MainCamera").GetComponent(CameraScript);
		
		if (!(jackInteractionScript.hideInteractionObject)) {
			InstantiateInteraction ();
		}
	//Quaternion.Euler(z, y, x);
	}
	
}

function OnTriggerExit (other : Collider) {
	collidedWith = null;
	Destroy (interactionClone);
	DestroyDialogue ();
	endOfDialogue = false;
	dialogueIsFinished = false;
	switchNext = false;
	switchSpeaker = false;
	
	pageCount = 0;
}

function OnGUI () {
	//GUI.DrawTexture(Rect(Screen.width / 4.50, Screen.height / 9.0, Screen.width / 1.75 , Screen.height / 2.25), dialogueBoxTexture, ScaleMode.StretchToFill, true, 0);
	//Rect(x, y, width, height);
	
	dialogueStyle.font = dialogueFont;
	dialogueStyle.fontSize = Screen.width / 75.0;
	dialogueStyle.normal.textColor = Color.white;
	
	if (dialogueActive) {
		Destroy (interactionClone);
		
		//Textbox
		GUI.DrawTexture(Rect(Screen.width / 3.5, Screen.height / 11.0, Screen.width / 2.5 , Screen.height / 3.0), dialogueBoxTexture, ScaleMode.StretchToFill, true, 0);
		
		if (endOfDialogue) {
			//Dialogue Text													//If this is the last line of dialogue
			GUI.Label (Rect (Screen.width / 3.2, Screen.height / 7.5, 100, 50), "" + dialogueText, dialogueStyle);
			
			//Dialogue Stop Square
			GUI.DrawTexture(Rect(Screen.width / 1.6, Screen.height / 3.0, Screen.width / 25.0 , Screen.height / 15.0), dialogueSquareTexture, ScaleMode.StretchToFill, true, 0);
																																			
			//dialogueIsFinished = true;											
			
			if (!multipleCharacters) {
				if (switchSpeaker) {		//Jack speaks										
					//jackInteractionScript.SetTextboxTail(true);
					GUI.DrawTexture(Rect(mainCamera.WorldToScreenPoint(collidedWith.transform.position).x - Screen.width / 14.0, Screen.height / 2.48, Screen.width / 14.0 , Screen.height / 16.01), dialogueBoxTailTexture, ScaleMode.StretchToFill, true, 0);
				}
				else {				
					//Textbox Tail												
					//jackInteractionScript.SetTextboxTail(false);
					GUI.DrawTexture(Rect(mainCamera.WorldToScreenPoint(transform.position).x - Screen.width / 18.0, Screen.height / 2.48, Screen.width / 14.0 , Screen.height / 16.01), dialogueBoxTailTexture, ScaleMode.StretchToFill, true, 0);
				}																//then instantiate a textbox tail relative to the NPC's position
			}
			
			else {
				GUI.DrawTexture(Rect(mainCamera.WorldToScreenPoint((GameObject.Find(ParseNameFromBrackets(currentSpeaker))).transform.position).x - Screen.width / 14.0, Screen.height / 2.48, Screen.width / 14.0 , Screen.height / 16.01), dialogueBoxTailTexture, ScaleMode.StretchToFill, true, 0);
			}
		}
		
		
		//CHOICES
		
		else if (dialogueMenuActive) {											//If it is now time for a dialogue menu
			var hiddenChoicesCount: int = 0;									//Create a variable to count the number of dialogue choices hidden from the player
			var dialogueChoiceNum: int = 1;
			
			jackInteractionScript.enabled = false;

			if (numOptions > 4) {
				//Scrollbar
			}
			
			if (countChoices) {
				//for (var k = 0; k < dialogueChoice; k++) { //Array version
				for (var k = 0; k < dialogueChoice.Count; k++) { //Generic list version
					if (drugScript.score < dialogueScoreMinReq[k] && jackInteractionScript.VarExists(dialogueVarReq[k])) { //THIS MAY BREAK
						
						hiddenChoicesTotal++;
					
					}
				}
				countChoices = false;
			}
			
			for (var i = 0; i < 4 + hiddenChoicesCount; i++) {					//This loop instantiates four dialogue options on the screen
				if (originalChoicesActive) {
					//if (i < dialogueChoice.length) {		//Array version						
					if (i < dialogueChoice.Count) {	//Generic list version
					//If the index is less than the length of the array
					
						//if (drugScript.score >= dialogueScoreMinReq[i] && drugScript.score <= dialogueScoreMaxReq[i] && jackInteractionScript.VarExists(dialogueVarReq[i])) {				//If the player's score is greater than or equal to the current dialogue score requirement
							//dialogueChoiceClone = Instantiate(dialogueObject, Vector3(transform.position.x - 4.5, transform.position.y + 5.5 - ((i - hiddenChoicesCount)/1.5), transform.position.z - 0.01), Quaternion.identity);
							if (dialogueChoiceNum == 1) {
								dialogueChoice1 = dialogueChoice[i];
							
							}
							
							else if (dialogueChoiceNum == 2) {
								dialogueChoice2 = dialogueChoice[i];
							
							}
							
							else if (dialogueChoiceNum == 3) {
								dialogueChoice3 = dialogueChoice[i];
							
							}
							
							else if (dialogueChoiceNum == 4) {
								dialogueChoice4 = dialogueChoice[i];
							
							}
								
							dialogueChoiceNum++;
						//}
						/*else {										
	
							hiddenChoicesCount++;									
						}*/
					}
				}
			}
			
			//Screen.width / 3.2, Screen.height / 7.5, 100, 50
			GUI.Label (Rect (Screen.width / 3.2, Screen.height / 7.5, 100, 50), "" + dialogueChoice1, dialogueStyle);
			GUI.Label (Rect (Screen.width / 3.2, (Screen.height / 7.5) + Screen.height * (1.0/18.0), 100, 50), "" + dialogueChoice2, dialogueStyle);
			GUI.Label (Rect (Screen.width / 3.2, (Screen.height / 7.5) + Screen.height * (2.0/18.0), 100, 50), "" + dialogueChoice3, dialogueStyle);
			GUI.Label (Rect (Screen.width / 3.2, (Screen.height / 7.5) + Screen.height * (3.0/18.0), 100, 50), "" + dialogueChoice4, dialogueStyle);
			
			dialogueChoiceNum = 1;
			
			
			//Set the dialogueMenuNow boolean to false
														
			//Dialogue Arrow
			GUI.DrawTexture(Rect(Screen.width / 3.8, Screen.height / 8.5 + (dialogueArrowCount /* (2.0/3.0)*/), Screen.width / 25.0 , Screen.height / 15.0), dialogueArrowTexture, ScaleMode.StretchToFill, true, 0);
																				//Instantiate the dialoge menu arrow
		}
		
		
		
		else {																	//If it is not the end of the dialogue nor a dialogue choice, then run this branch
			
			//CreateDialogue ();
			
			//Dialogue													
			GUI.Label (Rect (Screen.width / 3.2, Screen.height / 7.5, 100, 50), "" + dialogueText, dialogueStyle);
			
			//Dialogue Arrow
			GUI.DrawTexture(Rect(Screen.width / 1.6, Screen.height / 2.7, Screen.width / 25.0 , Screen.height / 15.0), dialogueArrowTexture, ScaleMode.StretchToFill, true, 0);
			
			if (!multipleCharacters) {
			
				if (switchSpeaker) {												//If Jack is speaking
					//jackInteractionScript.SetTextboxTail(true);						//Then call the MakeTextboxTail function from Jack's script
					GUI.DrawTexture(Rect(mainCamera.WorldToScreenPoint(collidedWith.transform.position).x - Screen.width / 14.0, Screen.height / 2.48, Screen.width / 14.0 , Screen.height / 16.01), dialogueBoxTailTexture, ScaleMode.StretchToFill, true, 0);																
				}
				
				else {	
					//Textbox Tail													//If the NPC is speaking, then instantiate the textbox tail
					//jackInteractionScript.SetTextboxTail(false);	//Don't use this cause have to close it separately
					GUI.DrawTexture(Rect(mainCamera.WorldToScreenPoint(transform.position).x - Screen.width / 18.0, Screen.height / 2.48, Screen.width / 14.0 , Screen.height / 16.01), dialogueBoxTailTexture, ScaleMode.StretchToFill, true, 0);																
				}
			
			}
			
			else {
				GUI.DrawTexture(Rect(mainCamera.WorldToScreenPoint((GameObject.Find(ParseNameFromBrackets(currentSpeaker))).transform.position).x - Screen.width / 14.0, Screen.height / 2.48, Screen.width / 14.0 , Screen.height / 16.01), dialogueBoxTailTexture, ScaleMode.StretchToFill, true, 0);																
			}
			
			if (dialogueMenuNext) {												//If dialogue menu is coming in the next window,
				dialogueMenuNow = true;											//then set the dialogueMenuNow to true, so that the menu is created the next time the player hits space
				dialogueMenuNext = false;										//Set dialogueMenuNext to false
				
			}
			
		}
		
		/*if (dialogueIsFinished) {
			dialogueActive = false;
		}*/
		
		if (endOfDialogue) {
			dialogueIsFinished = true;
		}

	}
	
	else {
		multipleCharacters = false;
		endOfDialogue = false;
		dialogueIsFinished = false;
		switchNext = false;
		switchSpeaker = false;
		//jackInteractionScript.enabled = false;
		if (collidedWith == null) {
			//do nothing
		}
		
		else if (collidedWith == "Jack") {
			jackScript.enabled = true;
			menuScript.enabled = true;
			//cameraScript.SetStopFollow(false);
		}
	}

	
	/*if (switchNext) {																//Flag is set to change speakers														
		switchSpeaker = !switchSpeaker;												//NPC speaks (switchSpeaker == false)
																					//Jack speaks (switchSpeaker == true)												
		switchNext = false;
	}*/
	
}