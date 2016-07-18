#pragma strict

var clubsSuit = new Array();  //Need to declare the arrays this way in order for RemoveAt function to work properly
var spadesSuit = new Array();
var heartsSuit = new Array();
var diamondsSuit = new Array();

clubsSuit = ["Two of Clubs", "Three of Clubs", "Four of Clubs", "Five of Clubs", "Six of Clubs", "Seven of Clubs", "Eight of Clubs", "Nine of Clubs", "Ten of Clubs", "Jack of Clubs", "Queen of Clubs", "King of Clubs", "Ace of Clubs"];
spadesSuit = ["Two of Spades", "Three of Spades", "Four of Spades", "Five of Spades", "Six of Spades", "Seven of Spades", "Eight of Spades", "Nine of Spades", "Ten of Spades", "Jack of Spades", "Queen of Spades", "King of Spades", "Ace of Spades"];
heartsSuit = ["Two of Hearts", "Three of Hearts", "Four of Hearts", "Five of Hearts", "Six of Hearts", "Seven of Hearts", "Eight of Hearts", "Nine of Hearts", "Ten of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts", "Ace of Hearts"];
diamondsSuit = ["Two of Diamonds", "Three of Diamonds", "Four of Diamonds", "Five of Diamonds", "Six of Diamonds", "Seven of Diamonds", "Eight of Diamonds", "Nine of Diamonds", "Ten of Diamonds", "Jack of Diamonds", "Queen of Diamonds", "King of Diamonds", "Ace of Diamonds"];

var deck = new Array();
var score: int = 0;

var drugLightColor: Color;

var pillSpriteIndex: int;

var pills = new GameObject[52];
var pillTexture = new Texture[52];

var pillObject: GameObject;

var scoreFont: Font;
var scoreColor: Color;

var showPill: boolean = false;
var calledGameOverScreen: boolean = false;

function Start () {
	var clubsCardsTaken: double = 0.0;
	var spadesCardsTaken: double = 0.0;
	var heartsCardsTaken: double = 0.0;
	var diamondsCardsTaken: double = 0.0;
	
	var cardShuffle;
	var deckCount: int = 0;
	
	while (deckCount < 52) {
	
		var shuffleSuit = Mathf.Round(Random.Range(1.0, 4.0));
		var cardDrawn: boolean = false;
		
		//CLUBS
		
		if (shuffleSuit == 1 && clubsCardsTaken < 13.0) {
			if (clubsSuit.length > 1) {
				cardShuffle = Mathf.Round(Random.Range(0.0, (12.0 - clubsCardsTaken)));
				deck.push(clubsSuit[cardShuffle]);
				clubsSuit.RemoveAt(cardShuffle);
				cardDrawn = true;
			}
			else {
				deck.push(clubsSuit[0]);
				clubsSuit.RemoveAt(0);
				cardDrawn = true;
			}
			clubsCardsTaken += 1.0;
		}
		
		//SPADES
		
		else if (shuffleSuit == 2 && spadesCardsTaken < 13.0) {
			if (spadesSuit.length > 1) {
				cardShuffle = Mathf.Round(Random.Range(0.0, (12.0 - spadesCardsTaken)));
				deck.push(spadesSuit[cardShuffle]);
				spadesSuit.RemoveAt(cardShuffle);
				cardDrawn = true;
			}
			else {
				deck.push(spadesSuit[0]);
				spadesSuit.RemoveAt(0);
				cardDrawn = true;
			}
			spadesCardsTaken += 1.0;
		}
		
		//HEARTS
		
		else if (shuffleSuit == 3 && heartsCardsTaken < 13.0) {
			if (heartsSuit.length > 1) {
				cardShuffle = Mathf.Round(Random.Range(0.0, (12.0 - heartsCardsTaken)));
				deck.push(heartsSuit[cardShuffle]);
				heartsSuit.RemoveAt(cardShuffle);
				cardDrawn = true;
				
			}
			else {
				deck.push(heartsSuit[0]);
				heartsSuit.RemoveAt(0);
				cardDrawn = true;
			}
			heartsCardsTaken += 1.0;
		}
		
		//DIAMONDS
		
		else if (shuffleSuit == 4 && diamondsCardsTaken < 13.0) {
			if (diamondsSuit.length > 1) {
				cardShuffle = Mathf.Round(Random.Range(0.0, (12.0 - diamondsCardsTaken)));
				deck.push(diamondsSuit[cardShuffle]);
				diamondsSuit.RemoveAt(cardShuffle);
				cardDrawn = true;
				
			}
			else {
				deck.push(diamondsSuit[0]);
				diamondsSuit.RemoveAt(0);
				cardDrawn = true;
			}
			diamondsCardsTaken += 1.0;
		}
		if (cardDrawn) {
			deckCount++;
		}
		//print(shuffleSuit);
	}
	//print(deckCount);
	
	
	print(deck);
	
}

function Update () {

	if (score <= 7) {
		drugLightColor.r = 153.0 / 255.0;
		drugLightColor.g = 153 / 255.0;
		drugLightColor.b = 158 / 255.0;
		
	}
	
	else if (score >= 8 && score <= 20) {
		drugLightColor.r = 255 / 255.0;
		drugLightColor.g = 185 / 255.0;
		drugLightColor.b = 158 / 255.0;
	}
	
	else if (score == 21) {
		drugLightColor.r = 238 / 255.0;
		drugLightColor.g = 221 / 255.0;
		drugLightColor.b = 86 / 255.0;
	}
	
	else if (score >= 22) {
		drugLightColor.r = 95 / 255.0;
		drugLightColor.g = 167 / 255.0;
		drugLightColor.b = 54 / 255.0;
	}
	
	//drugLightColor.a = 0;
	RenderSettings.ambientLight = drugLightColor;
	
	if (score > 26) {
	
		if (!calledGameOverScreen) {
		
			GetComponent(JackScript).enabled = false;
			GetComponent(JackInteractionScript).enabled = false;
			calledGameOverScreen = true;
			GetComponent(MenuScript).SetBlackOutScreen(true, true);
			
		}
		
	}
	
}

function Draw () {
	var currentCard: String;
	currentCard = deck.Shift();
	var cardValue;
	var cardSuit;
	
	var whitespaceCount: int = 0;
	
	for (var i = 0; i < currentCard.length; i++) {
		//print(i);
		//print(currentCard);
		var compareChar;
		
		compareChar = currentCard.Substring(i, 1); //Second number is the number of chars in the substring
		
		if (compareChar == " ") {
		
			if (whitespaceCount == 0) {
				cardValue = currentCard.Substring(0, i);
				whitespaceCount++;
			}
			else {
				cardSuit = currentCard.Substring(i + 1);
			}
		}
	}
	
	/*print(deck);
	print(currentCard);
	print(cardValue);
	print(cardSuit);*/
	
	if (cardValue == "Two") {
		score += 2;
		pillSpriteIndex = 0;
	}
	else if (cardValue == "Three") {
		score += 3;
		pillSpriteIndex = 4;
	}
	else if (cardValue == "Four") {
		score += 4;
		pillSpriteIndex = 8;
	}
	else if (cardValue == "Five") {
		score += 5;
		pillSpriteIndex = 12;
	}
	else if (cardValue == "Six") {
		score += 6;
		pillSpriteIndex = 16;
	}
	else if (cardValue == "Seven") {
		score += 7;
		pillSpriteIndex = 20;
	}
	else if (cardValue == "Eight") {
		score += 8;
		pillSpriteIndex = 24;
	}
	else if (cardValue == "Nine") {
		score += 9;
		pillSpriteIndex = 28;
	}
	else if (cardValue == "Ten") {
		score += 10;
		pillSpriteIndex = 32;
	}
	else if (cardValue == "Jack") {
		score += 10;
		pillSpriteIndex = 36;
	}
	else if (cardValue == "Queen") {
		score += 10;
		pillSpriteIndex = 40;
	}
	else if (cardValue == "King") {
		score += 10;
		pillSpriteIndex = 44;
	}
	else if (cardValue == "Ace") {
		if (score <= 10) {
			score += 11;
		}
		else {
			score += 1;
		}
		pillSpriteIndex = 48;
	}
	
	
	if (cardSuit == "Spades") { //Don't need an if statement for Clubs suit since it uses the inital index
		pillSpriteIndex += 1;
	}
	else if (cardSuit == "Hearts") {
		pillSpriteIndex += 2;
	}
	else if (cardSuit == "Diamonds") {
		pillSpriteIndex += 3;
	}
	
	
	//pillObject = Instantiate(pills[pillSpriteIndex], Vector3(transform.position.x + 3, transform.position.y + 2.5, transform.position.z - 0.01), Quaternion.identity);
	showPill = true;
}

function DestroyPill () {
	showPill = false;
}

function DecrementScore () {
	if (score >= 1 && score <= 7) {
		score--;
	}
	
	else if (score >= 8 && score <= 20) {
		score -= 4;
	}
	
	else if (score == 21) {
		score = 7;
	}
	
	else if (score >= 22 && score <= 26) {
		if (score == 22) {
			score = 7;
		}
		else {
			score--;
		}
	}
}

function OnGUI () {

	var scoreStyle = new GUIStyle ();
	scoreStyle.font = scoreFont;
	scoreStyle.fontSize = Screen.width / 40;
	scoreStyle.normal.textColor = Color.white;
	
	var scoreStyleBG = new GUIStyle ();
	scoreStyleBG.font = scoreFont;
	scoreStyleBG.fontSize = Screen.width / 40;
	scoreStyleBG.normal.textColor = Color.black;
	
	//Score
	//GUI.Label (Rect (8,0.5,100,50), "" + score, scoreStyleBG);
	//GUI.Label (Rect (10,0,100,50), "" + score, scoreStyle);
	
	//Framerate
	//GUI.Label (Rect (8,Screen.height / 1.08,100,50), "FPS: " + Mathf.Round(1.0f / Time.smoothDeltaTime), scoreStyleBG);
	//GUI.Label (Rect (10,Screen.height /1.08 - 0.5,100,50), "FPS: " + Mathf.Round(1.0f / Time.smoothDeltaTime), scoreStyle);
	
	//Version number
	//GUI.Label (Rect (8,Screen.height / 1.08,100,50), "v0.1", scoreStyleBG);
	//GUI.Label (Rect (10,Screen.height /1.08 - 0.5,100,50), "v0.1", scoreStyle);
	
	//Pill texture	
	if (showPill) {
		GUI.DrawTexture(Rect(Screen.width / 1.45, Screen.height / 2.5, Screen.width / 18.0 , Screen.height / 5.0), pillTexture[pillSpriteIndex], ScaleMode.StretchToFill, true, 0);
		GUI.depth = 1;
	}
	
}