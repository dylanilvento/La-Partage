using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RestaurantEntranceScript : MonoBehaviour
{

	GameObject collidedWith;
	GameObject playerObject; //Need this to reference player once they leave the collision box

	JackScript jackScript;
	JackInteractionScript jackInteractionScript;
	DrugScript drugScript;
	MenuScript menuScript;
	CameraScript cameraScript;
	JackEventScript jackEventScript;

	GameObject interactionBox;

	GameObject interactionClone;

	GameObject mainCamera;

	// Start is called before the first frame update
	void Start()
	{

	}

	// Update is called once per frame
	void Update()
	{
		if (collidedWith != null)
		{
			if ((Input.GetKeyDown("space") || Input.GetButtonDown("Fire1")) && collidedWith.tag == "Player")
			{

				RotatePlayer();
				//jackEventScript.EnterRestaurant();
			}
		}

	}

	private void OnTriggerEnter(Collider other)
	{
		collidedWith = other.gameObject;
		playerObject = other.gameObject;

		if (collidedWith.tag == "Player")
		{

			interactionClone = Instantiate(interactionBox, new Vector3(transform.position.x, 4.02f, 0), Quaternion.Euler(180f, 0, 0));

			GameObject.Find("Talk Text").GetComponent<TextMesh>().text = "Enter";

			jackScript = other.gameObject.GetComponent<JackScript>();
			jackInteractionScript = other.gameObject.GetComponent<JackInteractionScript>();
			jackEventScript = other.gameObject.GetComponent<JackEventScript>();
			drugScript = other.gameObject.GetComponent<DrugScript>();
			menuScript = other.gameObject.GetComponent<MenuScript>();
			mainCamera = GameObject.FindWithTag("MainCamera");
			cameraScript = mainCamera.GetComponent<CameraScript>();

		}
	}

	private void OnTriggerExit(Collider other)
	{
		collidedWith = null;
		Destroy(interactionClone);
	}

	IEnumerator RotatePlayer()
	{
		//collidedWith.transform.Rotate (0, 0, 90.0);

		//var cameraCurrentZ: float = mainCamera.transform.localPosition.z;
		//var cameraCurrentX: float = mainCamera.transform.localPosition.x;

		//var cameraCurrentZ: float = mainCamera.transform.position.z;
		float cameraCurrentZ = mainCamera.transform.position.z;

		//var cameraCurrentX: float = mainCamera.transform.position.x;
		float cameraCurrentX = mainCamera.transform.position.x;

		//var zAxisRotationComplete: boolean = false;
		//var zAxisMovementComplete: boolean = false;
		bool zAxisMovementComplete = false;

		//var xAxisRotationComplete: boolean = false;
		//var cameraRotationComplete: boolean = false;
		bool cameraRotationComplete = false;

		//var playerRotationComplete: boolean = false;
		bool playerRotationComplete = false;
		//var cameraPivotComplete: boolean = false;
		bool cameraPivotComplete = false;

		//var cameraRotationCount: int = 0;
		int cameraRotationCount = 0;
		//var playerRotationCount: float = 1.0;
		float playerRotationCount = 1.0f;
		//var zAxisDistanceCount: float = 0.0;
		float zAxisDistanceCount = 0;

		//var angleNum: int = 1;
		int angleNum = 1;
		//var subAngle: float = 0.0;
		float subAngle = 0;

		cameraScript.SetStopFollow(true);

		/*var cameraInitialPosX = mainCamera.transform.localosition.x;
		var cameraInitialPosZ = mainCamera.transform.localPosition.z;*/

		var cameraInitialPosX = mainCamera.transform.position.x;
		var cameraInitialPosZ = mainCamera.transform.position.z;

		/*var screenCenterInitialPosX = mainCamera.transform.localPosition.x;
		var screenCenterInitialPosZ = playerObject.transform.localPosition.z;*/

		var screenCenterInitialPosX = mainCamera.transform.position.x;
		var screenCenterInitialPosZ = playerObject.transform.position.z;

		/*var pivotPosX = screenCenterInitialPosX;
		var pivotPosZ = mainCamera.transform.localPosition.z - (playerObject.transform.localPosition.x - screenCenterInitialPosX);*/

		var pivotPosX = screenCenterInitialPosX;
		var pivotPosZ = mainCamera.transform.position.z - (playerObject.transform.position.x - screenCenterInitialPosX);

		print("z: " + pivotPosZ + ", x: " + pivotPosX);

		while (zAxisMovementComplete == false || cameraRotationComplete == false || cameraPivotComplete == false || playerRotationComplete == false)
		{

			if (playerRotationCount <= 18.0)
			{
				playerObject.transform.Rotate(0, 0, 5.0f);
				playerRotationCount += 1.0f;
			}

			else
			{
				playerRotationComplete = true;
				//playerObject.transform.localRotation = Quaternion.Euler(0, 0, 90);

			}

			if (angleNum <= 17 && zAxisDistanceCount < 11.032 /*9.57*//*q_1*/)
			{

				subAngle = (angleNum / 18.0f) * (-1) * (90.0f * Mathf.Deg2Rad);

				pivotPosZ += 0.6128f;
				cameraInitialPosZ += 0.6128f;

				//pivotPosX += 0.1287;
				//cameraInitialPosX += 0.1287;

				pivotPosX += 0.5f;
				cameraInitialPosX += 0.5f;

				print("cameraInitialPosX - pivotPosX = " + (cameraInitialPosX - pivotPosX));
				print("cameraInitialPosZ - pivotPosZ = " + (cameraInitialPosZ - pivotPosZ));

				var z_i = pivotPosZ + (cameraInitialPosZ - pivotPosZ) * Mathf.Cos(subAngle) + (pivotPosX - cameraInitialPosX) * Mathf.Sin(subAngle);
				var x_i = pivotPosX + (cameraInitialPosX - pivotPosX) * Mathf.Cos(subAngle) + (cameraInitialPosZ - pivotPosZ) * Mathf.Sin(subAngle);
				//mainCamera.transform.localPosition.z = z_i;
				//mainCamera.transform.localPosition.x = x_i;

				//mainCamera.transform.position.z = z_i;
				mainCamera.transform.position = new Vector3(mainCamera.transform.position.x, mainCamera.transform.position.y, z_i);
				//mainCamera.transform.position.x = x_i;
				mainCamera.transform.position = new Vector3(x_i, mainCamera.transform.position.y, mainCamera.transform.position.z);

				//zAxisDistanceCount += 0.403;
				zAxisDistanceCount += 0.5316f;
				zAxisDistanceCount -= 0.0812f;
				angleNum++;
			}

			else
			{
				cameraPivotComplete = true;
				zAxisMovementComplete = true;

			}

			if (cameraRotationCount <= 18)
			{//Nineteen times

				mainCamera.transform.Rotate(0, -5.0f, 0);
				cameraRotationCount++;


			}

			else
			{
				cameraRotationComplete = true;
				mainCamera.transform.localRotation = Quaternion.Euler(0, 270.0f, 0);
			}

			yield return new WaitForSeconds(0.0001f);
			//print("z: " + mainCamera.transform.position.z + ", x: " + mainCamera.transform.position.x);
		}

		cameraScript.SetStopFollow(false, 0);
		jackEventScript.EnterRestaurant(transform.position.x);

	}

}