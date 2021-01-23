using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class JackScript : MonoBehaviour
{
    int moveSpeed = 3;
    // var moveSpeed: int = 3;
    float textureFlip;
    // var textureFlip: double;
    public Material[] jackMaterials;
    // var jackMaterials = new Material[2];

    int mipMapNum;
    // var mipMapNum: int;

    int uvAnimationTileX = 4;
    // var uvAnimationTileX = 4; //Here you can place the number of columns of your sheet. 
                            
    int uvAnimationTileY = 2;
    // var uvAnimationTileY = 2; //Here you can place the number of rows of your sheet. 

    float framesPerSecond = 5.0f;                            
    // var framesPerSecond = 5.0;

    public Texture dialogueBoxTexture;
    // var dialogueBoxTexture: Texture;

    bool xPos = false;
    bool xNeg = false;
    bool zPos = false;
    bool zNeg = false;
    // var xPos: boolean = false;
    // var xNeg: boolean = false;
    // var zPos: boolean = false;
    // var zNeg: boolean = false;

    bool stopLeftMov = false;
    bool stopRightMov = false;
    // var stopLeftMov: boolean = false;
    // var stopRightMov: boolean = false;
    // Start is called before the first frame update
    void Start()
    {
        textureFlip = transform.localScale.x;
        SetMat(0);
        xPos = true;
    }

    // Update is called once per frame
    void Update()
    {
        SetMat(0);
        if (Input.GetKey("left") && !(stopLeftMov)) {
            SetMat(1);
            WalkAnimation ();
            MoveLeft ();
        
        }
        
        else if (Input.GetKey("right") && !(stopRightMov)){
            SetMat(1);
            WalkAnimation ();
            MoveRight ();

        }
    }
}
