using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class JackInteractionScript : MonoBehaviour
{

    //var npcScript: NPCScript;
    NPCScript npcScript;
    //var collidedWith: GameObject = null;
    GameObject collidedWith = null;

    //var dialogueCount: int = 0;
    int dialogueCount = 0;

    //var mainCamera: Camera;
    Camera mainCamera;

    //var dialogueBoxTailTexture: Texture;
    Texture dialogueBoxTailTexture;

    //var tempReset: boolean = false;
    bool tempReset = false;
    //var noScore: boolean = false;
    bool noScore = false;
    //var hideInteractionObject: boolean = false;
    bool hideInteractionObject = false;

    //var showTextboxTail: boolean = false;
    bool showTextboxTail = false;

    //var textureFlip: double;
    float textureFlip;

    //var jackVars = new List.< String > ();
    List<string> jackVars;

    // Start is called before the first frame update
    void Start()
    {
        jackVars = new List<string>();
        textureFlip = transform.localScale.x;
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown("space") && collidedWith.tag == "NPC")
        {
            //if (collidedWith.tag == "NPC") {

            //these will also be attached to Jack
            GetComponent<JackScript>().enabled = false;
            GetComponent<MenuScript>().enabled = false;

            FlipCharacter();
            NPCDialogue();

            //}
        }
    }

    void FlipCharacter()
    {
        if (GetComponent<JackScript>().xPos)
        {
            if (collidedWith.transform.position.x < transform.position.x)
            {
                //transform.localScale.x = textureFlip;
                transform.localScale = new Vector3(textureFlip, transform.localScale.y, transform.localScale.z);
                //transform.localScale.x = textureFlip;

            }

            else
            {
                //transform.localScale.x = -textureFlip;
                transform.localScale = new Vector3(-textureFlip, transform.localScale.y, transform.localScale.z);
            }
        }

        if (GetComponent<JackScript>().zPos)
        {
            if (collidedWith.transform.position.z < transform.position.z)
            {
                //transform.localScale.x = -textureFlip;
                transform.localScale = new Vector3(-textureFlip, transform.localScale.y, transform.localScale.z);

            }

            else
            {
                //transform.localScale.x = textureFlip;
                transform.localScale = new Vector3(textureFlip, transform.localScale.y, transform.localScale.z);
            }
        }

    }

    void NPCDialogue()
    {

        if (dialogueCount == 0)
        {
            npcScript.ReadDialogue(dialogueCount);

            //npcScript.DialogueBox(); //this is going away
            dialogueCount++;
        }
        else
        {
            npcScript.DestroyDialogue(); //this is going away
            npcScript.ReadDialogue(dialogueCount);
            //npcScript.DialogueBox(); //this is going away
            dialogueCount++;
        }

        if (/*GetComponent(JackScript) &&*/ npcScript.dialogueIsFinished)
        {
            npcScript.dialogueActive = false;
            if (npcScript.endAnimationExists)
            {

                npcScript.RunAnimation(npcScript.animationNum);

            }
        }
    }

    void SetTextboxTail(bool val)
    {
        showTextboxTail = val;
    }

    void SetHideInteractionObject(bool val)
    {
        hideInteractionObject = val;
    }

    void SetDialogueCount(int d)
    {
        dialogueCount = d;

    }

    void AddVar(string newVar)
    {
        for (var i = 0; i < jackVars.Count; i++)
        {
            if (newVar == jackVars[i])
            {
                return;
            }
        }
        print(newVar);
        jackVars.Add(newVar);
    }

    bool VarExists(string compareVar)
    {
        if (compareVar == "<None>")
        {
            return true;
        }

        for (var i = 0; i < jackVars.Count; i++)
        {
            if (compareVar == jackVars[i])
            {
                return true;
            }
        }

        return false;
    }

    private void OnTriggerEnter(Collider other)
    {
        collidedWith = other.gameObject;

        if (collidedWith.tag == "NPC")
        {
            npcScript = other.gameObject.GetComponent<NPCScript>();
        }
    }

    private void OnTriggerExit(Collider other)
    {
        collidedWith = null;
        dialogueCount = 0;
    }

}
