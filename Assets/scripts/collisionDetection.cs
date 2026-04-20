using UnityEngine;

public class collisiondetect : MonoBehaviour
{
    void OnCollisionEnter(Collision col)
    {
        if (col.gameObject.name == "Car High")
        {
            Destroy(col.gameObject);
        }
    }
}