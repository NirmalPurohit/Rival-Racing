using UnityEngine;

public class camfollow : MonoBehaviour
{
    public Transform target;

    void Update()
    {
        transform.LookAt(target);
    }
}