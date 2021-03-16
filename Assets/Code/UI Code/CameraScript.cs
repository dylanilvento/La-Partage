using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraScript : MonoBehaviour
{
    //var target: GameObject;
    public GameObject target;

    //var relativePosition: Vector3;
    Vector3 relativePos;

    //var stopFollow: boolean = false;
    bool stopFollow = false;
    //var stopFollowX: boolean = false;
    bool stopFollowX = false;

    //var prevPos: Vector3;
    Vector3 prevPos;

    // Start is called before the first frame update
    void Start()
    {
        relativePos = target.transform.position - transform.position;
        prevPos = transform.position;
    }

    // Update is called once per frame
    void Update()
    {
        if (!stopFollow)
        {
            transform.position = target.transform.position - relativePos;
        }

        else if (stopFollowX)
        {
            //transform.position.y = target.transform.position.y - relativePosition.y;
            //transform.position.z = target.transform.position.z - relativePosition.z;
            transform.position = new Vector3(transform.position.x, target.transform.position.y - relativePos.y, target.transform.position.z - relativePos.z);
            
        }
    }

    //change axis string to enum
    public IEnumerator CenterCamera(float position, string axis)
    {

        stopFollow = true;

        if (axis == "x" && target.GetComponent<JackScript>().xPos)
        {
            while (transform.position.x > position)
            {
                transform.position = new Vector3 (transform.position.x - 0.1f, transform.position.y, transform.position.z);
                yield return new WaitForSeconds(0.01f);
            }
        }
        else if (axis == "x" && target.GetComponent<JackScript>().xNeg)
        {
            while (transform.position.x < position)
            {
                transform.position = new Vector3(transform.position.x + 0.1f, transform.position.y, transform.position.z);
                yield return new WaitForSeconds(0.01f);
            }
        }
        else if (axis == "z" && target.GetComponent<JackScript>().zPos)
        {
            while (transform.position.z > position)
            {
                transform.position = new Vector3(transform.position.x, transform.position.y, transform.position.z - 0.1f);
                yield return new WaitForSeconds(0.01f);
            }
        }
        else if (axis == "z" && target.GetComponent<JackScript>().zNeg)
        {
            while (transform.position.z < position)
            {
                transform.position = new Vector3(transform.position.x, transform.position.y, transform.position.z + 0.1f);
                yield return new WaitForSeconds(0.01f);
            }
        }

    }

    public void SetStopFollow(bool val)
    {
        stopFollow = val;
    }

    public void SetStopFollow(bool val, int flag)
    {
        relativePos = target.transform.position - transform.position;
        stopFollow = val;
        stopFollowX = val;
    }

    public void SetStopFollowX(bool val)
    {
        stopFollow = val;  //Makes it so camera doesn't follow any axis
        stopFollowX = val;  //Then switches it so camera continues to follow y and z
    }

}
