using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class JackScript : MonoBehaviour
{
    int moveSpeed = 3;

    float textureFlip;

    public Material[] jackMaterials;

    int mipMapNum;


    int uvAnimationTileX = 4;
 
                            
    int uvAnimationTileY = 2;
  
    float framesPerSecond = 5.0f;                            
   
    public Texture dialogueBoxTexture;
 
    bool xPos = false;
    bool xNeg = false;
    bool zPos = false;
    bool zNeg = false;

    bool stopLeftMov = false;
    bool stopRightMov = false;

    Rigidbody rb;
	MeshRenderer meshRend;

    void Start()
    {
        textureFlip = transform.localScale.x;
        
        xPos = true;
        rb = GetComponent<Rigidbody>();
		meshRend = GetComponent<MeshRenderer>();
		SetMat(0);
	}

    // Update is called once per frame
    void Update()
    {
        SetMat(0);
        if (Input.GetKey("left") && !(stopLeftMov)) {
            SetMat(1);
            WalkAnimation ();
			MoveLeft();

		}
        
        else if (Input.GetKey("right") && !(stopRightMov)){
            SetMat(1);
            WalkAnimation ();
			MoveRight();

		}

        if (xPos || xNeg)
        {

            //rb.constraints |= RigidbodyConstraints.FreezePositionX | RigidbodyConstraints.FreezePositionZ;

            //rigidbody.constraints &= RigidbodyConstraints.FreezePositionX & RigidbodyConstraints.FreezePositionZ;
            //rb.constraints &= ~RigidbodyConstraints.FreezePositionX;
            //rb.constraints &= ~RigidbodyConstraints.FreezePositionY;

        }

        if (zPos || zNeg)
        {

            rb.constraints |= RigidbodyConstraints.FreezePositionX | RigidbodyConstraints.FreezePositionZ;

            //rigidbody.constraints &= RigidbodyConstraints.FreezePositionX & RigidbodyConstraints.FreezePositionZ;
            rb.constraints &= ~RigidbodyConstraints.FreezePositionZ;
            rb.constraints &= ~RigidbodyConstraints.FreezePositionY;
        }

        else if (!xPos && !xNeg && !zPos && !zNeg)
        {

            rb.constraints &= ~RigidbodyConstraints.FreezePositionZ;
            rb.constraints &= ~RigidbodyConstraints.FreezePositionX;

        }
    }

	void SwitchWalkingAxis(string newDirection)
	{
		SwitchWalkingAxis(newDirection, true);

	}

	void SwitchWalkingAxis(string newDirection, bool val)
	{
		xPos = false;
		xNeg = false;
		zPos = false;
		zNeg = false;

		if (newDirection == "xPos")
		{
			xPos = val;
		}

		else if (newDirection == "xNeg")
		{
			xNeg = val;
		}

		else if (newDirection == "zPos")
		{
			zPos = val;
		}

		else if (newDirection == "zNeg")
		{
			zNeg = val;
		}

	}

	void WalkAnimation()
	{
		// Calculate index
		int index = (int) (Time.time * framesPerSecond);
		// repeat when exhausting all frames
		index = index % (uvAnimationTileX * uvAnimationTileY);

		// Size of every tile
		Vector2 size = new Vector2(1.0f / uvAnimationTileX, 1.0f / uvAnimationTileY);

		// split into horizontal and vertical index
		int uIndex = index % uvAnimationTileX;
		int vIndex = index / uvAnimationTileX;

		// build offset
		// v coordinate is the bottom of the image in opengl so we need to invert.
		Vector2 offset = new Vector2(uIndex * size.x, 1.0f - size.y - vIndex * size.y);

		meshRend.material.SetTextureOffset("_MainTex", offset);
		meshRend.material.SetTextureScale("_MainTex", size);
	}

	void MoveLeft()
	{
		if (xPos)
		{
			//transform.localPosition.x -= moveSpeed * Time.deltaTime;
			//transform.localScale.x = -textureFlip;

			transform.position = new Vector3(transform.position.x - (moveSpeed * Time.deltaTime), transform.position.y, transform.position.z) ;
			transform.localScale = new Vector3(-textureFlip, transform.localScale.y, transform.localScale.z);
		}

		else if (xNeg)
		{
			//transform.localPosition.x += moveSpeed * Time.deltaTime;
			//transform.localScale.x = textureFlip;

			transform.position = new Vector3(transform.position.x + (moveSpeed * Time.deltaTime), transform.position.y, transform.position.z);
			transform.localScale = new Vector3(textureFlip, transform.localScale.y, transform.localScale.z);
		}

		else if (zPos)
		{
			//transform.localPosition.z -= moveSpeed * Time.deltaTime;
			//transform.localScale.x = -textureFlip;

			transform.position = new Vector3(transform.position.x, transform.position.y, transform.position.z - (moveSpeed * Time.deltaTime));
			transform.localScale = new Vector3(-textureFlip, transform.localScale.y, transform.localScale.z);
		}

		else if (zNeg)
		{
			//transform.localPosition.z += moveSpeed * Time.deltaTime;
			//transform.localScale.x = -textureFlip;

			transform.position = new Vector3(transform.position.x, transform.position.y, transform.position.z + (moveSpeed * Time.deltaTime));
			transform.localScale = new Vector3(-textureFlip, transform.localScale.y, transform.localScale.z);
		}
	}

	void MoveRight()
	{
		if (xPos)
		{
			//transform.localPosition.x += moveSpeed * Time.deltaTime;
			//transform.localScale.x = textureFlip;

			transform.position = new Vector3(transform.position.x + (moveSpeed * Time.deltaTime), transform.position.y, transform.position.z);
			transform.localScale = new Vector3(textureFlip, transform.localScale.y, transform.localScale.z);
		}

		else if (xNeg)
		{
			//transform.localPosition.x -= moveSpeed * Time.deltaTime;
			//transform.localScale.x = -textureFlip;

			transform.position = new Vector3(transform.position.x - (moveSpeed * Time.deltaTime), transform.position.y, transform.position.z);
			transform.localScale = new Vector3(-textureFlip, transform.localScale.y, transform.localScale.z);

		}

		else if (zPos)
		{
			//transform.localPosition.z += moveSpeed * Time.deltaTime;
			//transform.localScale.x = textureFlip;

			transform.position = new Vector3(transform.position.x, transform.position.y, transform.position.z + (moveSpeed * Time.deltaTime));
			transform.localScale = new Vector3(textureFlip, transform.localScale.y, transform.localScale.z);

		}

		else if (zNeg)
		{
			//transform.localPosition.z -= moveSpeed * Time.deltaTime;
			//transform.localScale.x = textureFlip;

			transform.position = new Vector3(transform.position.x, transform.position.y, transform.position.z - (moveSpeed * Time.deltaTime));
			transform.localScale = new Vector3(textureFlip, transform.localScale.y, transform.localScale.z);

		}

	}


	void SetMat(int index)
	{
		meshRend.material = jackMaterials[index];
	}

	void SetStopLeftMov(bool val)
	{

		stopLeftMov = val;
	}

	void SetStopRightMov(bool val)
	{

		stopRightMov = val;

	}
}
