using UnityEngine;

public class Spinning : MonoBehaviour
{
    public float speed = 1000f;
    public float maxSpeed = 2000f;  // 👈 add this field

    void Update()
    {
        if (Input.GetKey(KeyCode.W))
        {
            transform.Rotate(Vector3.right, speed * Time.deltaTime * 100);
            speed = Mathf.Min(speed + Time.deltaTime, maxSpeed);  // 👈 replace speed += Time.deltaTime
        }
        if (Input.GetKey(KeyCode.S))
        {
            transform.Rotate(Vector3.left, speed * Time.deltaTime * 100);
            speed = Mathf.Min(speed + Time.deltaTime, maxSpeed);  // 👈 replace speed += Time.deltaTime
        }
    }
}