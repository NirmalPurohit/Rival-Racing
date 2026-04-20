using System.Security.Cryptography;
using UnityEngine;

public class turn_wheel : MonoBehaviour
{
    public float turnSpeed = 50f;

    void Start()
    {
    }

    void Update()
    {
        /*
         * Turn the wheels on a key press
         * along with the car movement
         */
        if (Input.GetKey(KeyCode.RightArrow))
            transform.Rotate(Vector3.up, turnSpeed * Time.deltaTime);
        if (Input.GetKey(KeyCode.LeftArrow))
            transform.Rotate(Vector3.up, -turnSpeed * Time.deltaTime);
    }
}