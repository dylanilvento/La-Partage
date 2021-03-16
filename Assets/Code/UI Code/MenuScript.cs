using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MenuScript : MonoBehaviour
{

    //var phoneTexture: Texture;
    //var walletTexture: Texture;
    //var watchTexture: Texture;
    //var handTexture: Texture;
    //var pillBottleTexture: Texture;
    //var blackBGTexture: Texture;
    //var logoBGTexture: Texture;
    //var warningSign: Texture;
    //var logo: Texture;

    public Texture  phoneTexture,
                    walletTexture,
					watchTexture,
                    handTexture,
                    pillBottleTexture,
                    blackBGTexture,
                    logoBGTexture,
                    warningSign,
                    logo;
  
    //var textFont: Font;
    public Font textFont;

    //var phoneOptionTextures = new Texture[10];
    public Texture[] phoneOptionTextures = new Texture[10];

    //var debugMenuTextures = new Texture[10];
    public Texture[] debugMenuTextures = new Texture[10];

    //var debugOptionSwitches = new boolean[5];
    bool[] debugOptionSwitches = new bool[5];

    //var optionCount: int = 0;
    int optionCount = 0;

    //var menuCount: int = 0;
    int menuCount = 0;

    //var pillDrawn: boolean = false;
    bool pillDrawn = false;
    //var showDebugMenu: boolean = false;
    bool showDebugMenu = false;

    //var gameOverScreen: boolean = false;
    bool gameOverScreen = false;

    //var showStartScreen1: boolean = false;
    bool showStartScreen1 = false;

    //var showStartScreen2: boolean = false;
    bool showStartScreen2 = false;

    //var blackOutScreen: boolean = false;
    bool blackOutScreen = false;

    //var gameOverNext: boolean = false;
    bool gameOverNext = false;

    //var jackScript: JackScript;
    JackScript jackScript;
    //var jackInteractionScript: JackInteractionScript;
    JackInteractionScript jackInterScript;
    //var drugScript: DrugScript;
    DrugScript drugScript;



    // Start is called before the first frame update
    void Start()
    {
        //jackScript = GetComponent(JackScript);
        jackScript = GetComponent<JackScript>();

        //jackInteractionScript = GetComponent(JackInteractionScript);
        jackInterScript = GetComponent<JackInteractionScript>();

        //drugScript = GetComponent(DrugScript);
        drugScript = GetComponent<DrugScript>();

        jackScript.enabled = false;
        jackInterScript.enabled = false;

        showStartScreen1 = true;
    }

    // Update is called once per frame
    void Update()
    {
		if (Input.GetKeyDown("space") && gameOverScreen)
		{
			Application.LoadLevel(Application.loadedLevel);

		}

		if (Input.GetKeyDown("space") && blackOutScreen)
		{
			if (gameOverNext)
			{
				blackOutScreen = false;
				gameOverNext = false;
				gameOverScreen = true;
			}

			else
			{
				blackOutScreen = false;
				jackScript.enabled = true;
				jackInterScript.enabled = true;
			}

		}

		if (Input.GetKeyDown("space") && showStartScreen2)
		{
			showStartScreen2 = false;
			jackScript.enabled = true;
			jackInterScript.enabled = true;

		}

		if (Input.GetKeyDown("space") && showStartScreen1)
		{
			showStartScreen1 = false;
			showStartScreen2 = true;
			//gameOverScreen = true;
		}

		if (Input.GetKeyDown("tab") && pillDrawn == false)
		{
			//menuCount++; //For actual game

			//if (jackInteractionScript.VarExists("<Jack passes out at date>")) {  //For demo
			menuCount++;

			if (menuCount > 0 && menuCount <= 4)
			{

				menuCount = 4;
				jackScript.enabled = false;
				jackInterScript.enabled = false;
			}

			else
			{
				jackScript.enabled = true;
				jackInterScript.enabled = true;
				//Destroy (handClone);
				menuCount = 0;
			}

			if (menuCount == 1)
			{
				showDebugMenu = false;
			}
			//}
		}

		if (menuCount == 1)
		{
			if (Input.GetKeyDown("up") && optionCount > 0)
			{
				optionCount--;
				PhoneCursorUp();
			}

			if (Input.GetKeyDown("down") && optionCount < 4)
			{
				optionCount++;
				PhoneCursorDown();
			}
		}

		if (Input.GetKeyDown("escape"))
		{
			menuCount = 0;
			//GetComponent(JackScript).enabled = true;
			jackScript.enabled = true;
			showDebugMenu = false;
		}

		if (Input.GetKeyDown("space") && menuCount == 1)
		{
			if (!showDebugMenu)
			{
				showDebugMenu = true;
			}

			else if (showDebugMenu)
			{

			}
		}


		if (Input.GetKeyDown("space") && menuCount == 4 && !pillDrawn)
		{
			drugScript.Draw();

		}

		if (Input.GetKeyUp("space") && menuCount == 4)
		{
			pillDrawn = true;
			//menuCount = 0;
		}

		if (Input.GetKeyDown("space") && pillDrawn)
		{
			//Destroy(handClone);
			drugScript.DestroyPill();
			pillDrawn = false;
			//GetComponent(JackScript).enabled = true;
			jackScript.enabled = true;
			//GetComponent(JackInteractionScript).enabled = true;
			jackInterScript.enabled = true;
			menuCount = 0;
		}
	}

	void PhoneCursorUp()
	{

	}

	void PhoneCursorDown()
	{

	}

	void SetGameOverScreen(bool val)
	{

		gameOverScreen = val;

	}

	void SetBlackOutScreen(bool blackOutVal, bool gameOverVal)
	{

		blackOutScreen = blackOutVal;
		gameOverNext = gameOverVal;

	}

	void OnGUI()
	{

		var textStyle = new GUIStyle();

		textStyle.font = textFont;
		textStyle.fontSize = Screen.width / 40;
		textStyle.normal.textColor = Color.white;

		if (menuCount == 1)
		{
			//phone
			GUI.DrawTexture(new Rect(Screen.width / 2.6f, Screen.height / 5.0f, Screen.width / 4.25f, Screen.height / 1.25f), phoneTexture, ScaleMode.StretchToFill, true, 0);

			if (!showDebugMenu)
			{
				GUI.DrawTexture(new Rect(Screen.width / 2.309f, Screen.height / 1.7f, Screen.width / 7.0f, Screen.height / 20.0f), phoneOptionTextures[0], ScaleMode.StretchToFill, true, 0);
			}
			else if (showDebugMenu)
			{
				GUI.DrawTexture(new Rect(Screen.width / 2.309f, Screen.height / 1.7f, Screen.width / 7.0f, Screen.height / 20.0f), debugMenuTextures[0], ScaleMode.StretchToFill, true, 0);
			}
		}

		else if (menuCount == 2)
		{
			//watch
			GUI.DrawTexture(new Rect(/*Screen.width / 2.6*/0, Screen.height / 5.0f, Screen.width / 1.5f, Screen.height / 1.25f), watchTexture, ScaleMode.StretchToFill, true, 0);

		}

		else if (menuCount == 3)
		{
			//wallet
			GUI.DrawTexture(new Rect(Screen.width / 3.9f, Screen.height / 5.0f, Screen.width / 2.0f, Screen.height / 1.25f), walletTexture, ScaleMode.StretchToFill, true, 0);

		}

		else if (menuCount == 4)
		{
			//hand
			GUI.DrawTexture(new Rect(Screen.width / 3.0f, Screen.height / 5.0f, Screen.width / 1.5f, Screen.height / 1.25f), handTexture, ScaleMode.StretchToFill, true, 0);
			GUI.depth = 2;

			if (!pillDrawn)
			{
				GUI.DrawTexture(new Rect(Screen.width / 1.75f, Screen.height / 4.0f, Screen.width / 5.5f, Screen.height / 2.25f), pillBottleTexture, ScaleMode.StretchToFill, true, 0);

			}

		}

		if (showStartScreen1)
		{
			//var startScreen1Style = GUIStyle;
			//startScreen1Style.color = Color.black;

			string warningText = "Warning!";
			string disclaimer = "This demo represents a very early build of\nthe beginning of this game.\n\nWe thank you for taking your time to\ntry it out, and we look forward to any feedback\nyou can provide!\n\n(Press Space to Continue)\n";

			GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), blackBGTexture, ScaleMode.StretchToFill, true, 0);
			GUI.DrawTexture(new Rect(Screen.width / 2.2f, Screen.height / 7.5f, Screen.width / 12.0f, Screen.height / 6.0f), warningSign, ScaleMode.StretchToFill, true, 0);

			GUI.Label(new Rect(Screen.width / 2.29f, Screen.height / 3.5f, 100, 50), warningText, textStyle);
			GUI.Label(new Rect(Screen.width / 6.0f, Screen.height / 2.8f, 100, 50), disclaimer, textStyle);

		}

		if (showStartScreen2)
		{

			GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), logoBGTexture, ScaleMode.StretchToFill, true, 0);
			GUI.DrawTexture(new Rect(Screen.width / 8.5f, Screen.height / 3.0f, Screen.width / 1.30f, Screen.height / 4.50f), logo, ScaleMode.StretchToFill, true, 0);

		}

		if (gameOverScreen)
		{

			string gameOver = "Game Over.\n\nPress Space to Restart\n\nOr give us feedback in the survey below!";

			GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), blackBGTexture, ScaleMode.StretchToFill, true, 0);
			GUI.Label(new Rect(Screen.width / 6.0f, Screen.height / 2.8f, 100, 50), gameOver, textStyle);

			jackScript.enabled = false;
			jackInterScript.enabled = false;

		}


		if (blackOutScreen)
		{

			string blackOut = "Jack\nblacked\nout.";

			GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), blackBGTexture, ScaleMode.StretchToFill, true, 0);
			GUI.Label(new Rect(Screen.width / 6.0f, Screen.height / 2.8f, 100, 50), blackOut, textStyle);

			jackScript.enabled = false;
			jackInterScript.enabled = false;

		}



	}


}
