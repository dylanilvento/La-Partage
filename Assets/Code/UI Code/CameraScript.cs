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
    public void  CenterCamera(float position, string axis)
    {

        stopFollow = true;

        if (axis == "x" && target.GetComponent<JackScript>().xPos)
        {
            while (transform.position.x > position)
            {
                transform.position.x -= 0.1;
                yield WaitForSeconds(0.01);
            }
        }
        else if (axis == "x" && target.GetComponent<JackScript>().xNeg)
        {
            while (transform.position.x < position)
            {
                transform.position.x += 0.1;
                yield WaitForSeconds(0.01);
            }
        }
        else if (axis == "z" && target.GetComponent(JackScript).zPos)
        {
            while (transform.position.z > position)
            {
                transform.position.z -= 0.1;
                yield WaitForSeconds(0.01);
            }
        }
        else if (axis == "z" && target.GetComponent(JackScript).zNeg)
        {
            while (transform.position.z < position)
            {
                transform.position.z += 0.1;
                yield WaitForSeconds(0.01);
            }
        }

    }
}
