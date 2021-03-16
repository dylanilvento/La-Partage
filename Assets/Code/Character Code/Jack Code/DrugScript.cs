using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DrugScript : MonoBehaviour
{
    //these should probably be enums
    //var clubsSuit = new Array();  //Need to declare the arrays this way in order for RemoveAt function to work properly
    List<string> clubsSuit = new List<string>()
                         {  "Two of Clubs",
                            "Three of Clubs",
                            "Four of Clubs",
                            "Five of Clubs",
                            "Six of Clubs",
                            "Seven of Clubs",
                            "Eight of Clubs",
                            "Nine of Clubs",
                            "Ten of Clubs",
                            "Jack of Clubs",
                            "Queen of Clubs",
                            "King of Clubs",
                            "Ace of Clubs" };
    //var spadesSuit = new Array();
    List<string> spadesSuit = new List<string>()
                          { "Two of Spades",
                            "Three of Spades",
                            "Four of Spades",
                            "Five of Spades",
                            "Six of Spades",
                            "Seven of Spades",
                            "Eight of Spades",
                            "Nine of Spades",
                            "Ten of Spades",
                            "Jack of Spades",
                            "Queen of Spades",
                            "King of Spades",
                            "Ace of Spades" };
    //var heartsSuit = new Array();
    List<string> heartsSuit = new List<string>()
                          { "Two of Hearts",
                            "Three of Hearts",
                            "Four of Hearts",
                            "Five of Hearts",
                            "Six of Hearts",
                            "Seven of Hearts",
                            "Eight of Hearts",
                            "Nine of Hearts",
                            "Ten of Hearts",
                            "Jack of Hearts",
                            "Queen of Hearts",
                            "King of Hearts",
                            "Ace of Hearts" };
    //var diamondsSuit = new Array();
    List<string> diamondsSuit = new List<string>()
                            {   "Two of Diamonds",
                                "Three of Diamonds",
                                "Four of Diamonds",
                                "Five of Diamonds",
                                "Six of Diamonds",
                                "Seven of Diamonds",
                                "Eight of Diamonds",
                                "Nine of Diamonds",
                                "Ten of Diamonds",
                                "Jack of Diamonds",
                                "Queen of Diamonds",
                                "King of Diamonds",
                                "Ace of Diamonds" };

    //clubsSuit = ["Two of Clubs", "Three of Clubs", "Four of Clubs", "Five of Clubs", "Six of Clubs", "Seven of Clubs", "Eight of Clubs", "Nine of Clubs", "Ten of Clubs", "Jack of Clubs", "Queen of Clubs", "King of Clubs", "Ace of Clubs"];
    //spadesSuit = ["Two of Spades", "Three of Spades", "Four of Spades", "Five of Spades", "Six of Spades", "Seven of Spades", "Eight of Spades", "Nine of Spades", "Ten of Spades", "Jack of Spades", "Queen of Spades", "King of Spades", "Ace of Spades"];
    //heartsSuit = ["Two of Hearts", "Three of Hearts", "Four of Hearts", "Five of Hearts", "Six of Hearts", "Seven of Hearts", "Eight of Hearts", "Nine of Hearts", "Ten of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts", "Ace of Hearts"];
    //diamondsSuit = ["Two of Diamonds", "Three of Diamonds", "Four of Diamonds", "Five of Diamonds", "Six of Diamonds", "Seven of Diamonds", "Eight of Diamonds", "Nine of Diamonds", "Ten of Diamonds", "Jack of Diamonds", "Queen of Diamonds", "King of Diamonds", "Ace of Diamonds"];

    //var deck = new Array();
    List<string> deck;
    //var score: int = 0;
    int score = 0;

    //var drugLightColor: Color;
    Color drugLightColor;

    //var pillSpriteIndex: int;
    int pillSpriteIndex;

    //I think the index of these have to match the suit organization?
    //var pills = new GameObject[52];
    public GameObject[] pills = new GameObject[52];

    //var pillTexture = new Texture[52];
    public Texture[] pillTexture = new Texture[52];

    //var pillObject: GameObject;
    //public?
    GameObject pillObject;

    //var scoreFont: Font;
    public Font scoreFont;
    //var scoreColor: Color;
    public Color scoreColor;

    //var showPill: boolean = false;
    public bool showPill = false;
    //var calledGameOverScreen: boolean = false;
    public bool calledGameOverScreen = false;


    //these are all attached to jack
    JackScript jackScript;
    JackInteractionScript jackInterScript;
    MenuScript menuScript;
    


    // Start is called before the first frame update
    void Start()
    {

        jackScript = GetComponent<JackScript>();
        jackInterScript = GetComponent<JackInteractionScript>();
        menuScript = GetComponent<MenuScript>();

        ShuffleDeck();
        
    }

    // Update is called once per frame
    void Update()
    {
        if (score <= 7)
        {
            drugLightColor.r = 153.0f / 255.0f;
            drugLightColor.g = 153f / 255.0f;
            drugLightColor.b = 158f / 255.0f;

        }

        else if (score >= 8 && score <= 20)
        {
            drugLightColor.r = 255f / 255.0f;
            drugLightColor.g = 185f / 255.0f;
            drugLightColor.b = 158f / 255.0f;
        }

        else if (score == 21)
        {
            drugLightColor.r = 238f / 255.0f;
            drugLightColor.g = 221f / 255.0f;
            drugLightColor.b = 86f / 255.0f;
        }

        else if (score >= 22)
        {
            drugLightColor.r = 95f / 255.0f;
            drugLightColor.g = 167f / 255.0f;
            drugLightColor.b = 54f / 255.0f;
        }

        //drugLightColor.a = 0;
        RenderSettings.ambientLight = drugLightColor;

        if (score > 26)
        {

            if (!calledGameOverScreen)
            {
                //this script gets attached to jack then
                jackScript.enabled = false;
                jackInterScript.enabled = false;
                calledGameOverScreen = true;
                menuScript.SetBlackOutScreen(true, true);

            }

        }
    }

    void ShuffleDeck ()
    {
        //var clubsCardsTaken: double = 0.0;
        int clubsCardsTaken = 0;
        //var spadesCardsTaken: double = 0.0;
        int spadesCardsTaken = 0;
        //var heartsCardsTaken: double = 0.0;
        int heartsCardsTaken = 0;
        //var diamondsCardsTaken: double = 0.0;
        int diamondsCardsTaken = 0;

        //var cardShuffle;
        int cardShuffle;
        //var deckCount: int = 0;
        int deckCount = 0;

        while (deckCount < 52)
        {

            //var shuffleSuit = Mathf.Round(Random.Range(1.0, 4.0));
            float shuffleSuit = Mathf.Round(Random.Range(1.0f, 4.0f));
            //var cardDrawn: boolean = false;
            bool cardDrawn = false;

            //CLUBS

            if (shuffleSuit == 1 && clubsCardsTaken < 13)
            {
                if (clubsSuit.Count > 1)
                {
                    //cardShuffle = Mathf.Round(Random.Range(0.0, (12.0 - clubsCardsTaken)));
                    cardShuffle = (int)Mathf.Round(Random.Range(0.0f, (12.0f - clubsCardsTaken)));
                    deck.Add(clubsSuit[cardShuffle]);
                    clubsSuit.RemoveAt(cardShuffle);
                    cardDrawn = true;
                }
                else
                {
                    deck.Add(clubsSuit[0]);
                    clubsSuit.RemoveAt(0);
                    cardDrawn = true;
                }
                clubsCardsTaken += 1;
            }

            //SPADES

            else if (shuffleSuit == 2 && spadesCardsTaken < 13)
            {
                if (spadesSuit.Count > 1)
                {
                    cardShuffle = (int)Mathf.Round(Random.Range(0f, (12f - spadesCardsTaken)));
                    deck.Add(spadesSuit[cardShuffle]);
                    spadesSuit.RemoveAt(cardShuffle);
                    cardDrawn = true;
                }
                else
                {
                    deck.Add(spadesSuit[0]);
                    spadesSuit.RemoveAt(0);
                    cardDrawn = true;
                }

                spadesCardsTaken += 1;
            }

            //HEARTS

            else if (shuffleSuit == 3 && heartsCardsTaken < 13)
            {
                if (heartsSuit.Count > 1)
                {
                    cardShuffle = (int)Mathf.Round(Random.Range(0f, (12f - heartsCardsTaken)));
                    deck.Add(heartsSuit[cardShuffle]);
                    heartsSuit.RemoveAt(cardShuffle);
                    cardDrawn = true;

                }
                else
                {
                    deck.Add(heartsSuit[0]);
                    heartsSuit.RemoveAt(0);
                    cardDrawn = true;
                }

                heartsCardsTaken += 1;
            }

            //DIAMONDS

            else if (shuffleSuit == 4 && diamondsCardsTaken < 13.0)
            {
                if (diamondsSuit.Count > 1)
                {
                    cardShuffle = (int)Mathf.Round(Random.Range(0f, (12f - diamondsCardsTaken)));
                    deck.Add(diamondsSuit[cardShuffle]);
                    diamondsSuit.RemoveAt(cardShuffle);
                    cardDrawn = true;

                }
                else
                {
                    deck.Add(diamondsSuit[0]);
                    diamondsSuit.RemoveAt(0);
                    cardDrawn = true;
                }

                diamondsCardsTaken += 1;
            }

            if (cardDrawn)
            {
                deckCount++;
            }
            //print(shuffleSuit);
        }
        //print(deckCount);


        print(deck);

    }

    public void Draw()
    {
        //var currentCard: String;
        //currentCard = deck.Shift();
        string currentCard = deck[0];
        deck.RemoveAt(0);
        
        string cardValue = "";
        string cardSuit = "";

        //var whitespaceCount: int = 0;
        int whitespaceCount = 0;

        for (var i = 0; i < currentCard.Length; i++)
        {
            //print(i);
            //print(currentCard);
            //var compareChar;

            string compareChar = currentCard.Substring(i, 1); //Second number is the number of chars in the substring

            if (compareChar == " ")
            {

                if (whitespaceCount == 0)
                {
                    cardValue = currentCard.Substring(0, i);
                    whitespaceCount++;
                }
                else
                {
                    cardSuit = currentCard.Substring(i + 1);
                }
            }
        }

        /*print(deck);
        print(currentCard);
        print(cardValue);
        print(cardSuit);*/

        if (cardValue.Equals("Two"))
        {
            score += 2;
            pillSpriteIndex = 0;
        }
        else if (cardValue.Equals("Three"))
        {
            score += 3;
            pillSpriteIndex = 4;
        }
        else if (cardValue.Equals("Four"))
        {
            score += 4;
            pillSpriteIndex = 8;
        }
        else if (cardValue.Equals("Five"))
        {
            score += 5;
            pillSpriteIndex = 12;
        }
        else if (cardValue.Equals("Six"))
        {
            score += 6;
            pillSpriteIndex = 16;
        }
        else if (cardValue.Equals("Seven"))
        {
            score += 7;
            pillSpriteIndex = 20;
        }
        else if (cardValue.Equals("Eight"))
        {
            score += 8;
            pillSpriteIndex = 24;
        }
        else if (cardValue.Equals("Nine"))
        {
            score += 9;
            pillSpriteIndex = 28;
        }
        else if (cardValue.Equals("Ten"))
        {
            score += 10;
            pillSpriteIndex = 32;
        }
        else if (cardValue.Equals("Jack"))
        {
            score += 10;
            pillSpriteIndex = 36;
        }
        else if (cardValue.Equals("Queen"))
        {
            score += 10;
            pillSpriteIndex = 40;
        }
        else if (cardValue.Equals("King"))
        {
            score += 10;
            pillSpriteIndex = 44;
        }
        else if (cardValue.Equals("Ace"))
        {
            if (score <= 10)
            {
                score += 11;
            }
            else
            {
                score += 1;
            }
            pillSpriteIndex = 48;
        }


        if (cardSuit.Equals("Spades"))
        { //Don't need an if statement for Clubs suit since it uses the inital index
            pillSpriteIndex += 1;
        }
        else if (cardSuit.Equals("Hearts"))
        {
            pillSpriteIndex += 2;
        }
        else if (cardSuit.Equals("Diamonds"))
        {
            pillSpriteIndex += 3;
        }


        //pillObject = Instantiate(pills[pillSpriteIndex], Vector3(transform.position.x + 3, transform.position.y + 2.5, transform.position.z - 0.01), Quaternion.identity);
        showPill = true;
    }

    public void DestroyPill()
    {
        showPill = false;
    }

    void DecrementScore()
    {
        if (score >= 1 && score <= 7)
        {
            score--;
        }

        else if (score >= 8 && score <= 20)
        {
            score -= 4;
        }

        else if (score == 21)
        {
            score = 7;
        }

        else if (score >= 22 && score <= 26)
        {
            if (score == 22)
            {
                score = 7;
            }
            else
            {
                score--;
            }
        }
    }

    void OnGUI()
    {

        var scoreStyle = new GUIStyle();
        scoreStyle.font = scoreFont;
        scoreStyle.fontSize = Screen.width / 40;
        scoreStyle.normal.textColor = Color.white;

        var scoreStyleBG = new GUIStyle();
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
        if (showPill)
        {
            GUI.DrawTexture(new Rect(Screen.width / 1.45f, Screen.height / 2.5f, Screen.width / 18.0f, Screen.height / 5.0f), pillTexture[pillSpriteIndex], ScaleMode.StretchToFill, true, 0);
            GUI.depth = 1;
        }

    }
}
