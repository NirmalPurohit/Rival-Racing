#pragma strict
public var turnSpeed : float = 50f;

function Start () {

}

function Update () {

	if(Input.GetKey("right"))
		transform.Rotate(Vector3.up, turnSpeed * Time.deltaTime);
		 
	if(Input.GetKey("left"))
		transform.Rotate(Vector3.up, -turnSpeed * Time.deltaTime);
}