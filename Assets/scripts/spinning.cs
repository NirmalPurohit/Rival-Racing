using UnityEngine;

public class Spinning : MonoBehaviour
{
    public float maxSpeed = 2000f;
    

    void Update()
    {
        if (Input.GetKey(KeyCode.W))
        {
            transform.Rotate(Vector3.right, speed * Time.deltaTime * 100);
            speed = Mathf.Min(speed + Time.deltaTime, maxSpeed);
        }
        if (Input.GetKey(KeyCode.S))
        {
            transform.Rotate(Vector3.left, speed * Time.deltaTime * 100);
            speed = Mathf.Min(speed + Time.deltaTime, maxSpeed);
        }
    }
}