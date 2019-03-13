#pragma strict

/*var nextUsage;
var Tdelay = 0.5;*/
function Start () {
	//nextUsage=Time.time + Tdelay;
	
}

function Update () {
	// Move the object forward along its z axis 1 unit/second.
     //transform.Translate(Vector3.forward * 0.5);
    // yield WaitForSeconds(1);
    if(Input.GetKey("w"))
	{
     transform.Translate(Vector3.forward*10);
    }
     if(Input.GetKey("s"))
	{
     transform.Translate(Vector3.back*10);
    }
    if(Input.GetKey("right"))
    {
     transform.Rotate(0, 1, 0);
     }
     if(Input.GetKey("left"))
    {
    	//transform.Translate(Vector3.forward * 0.5);
     	transform.Rotate(0,-1, 0);
    }
 	 
     /* Move the object upward in world space 1 unit/second.
     transform.Translate(Vector3.up * Time.deltaTime, Space.World);*/
     //transform.Translate(Vector3.right * Time.deltaTime, Camera.main.transform);
}