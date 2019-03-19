#pragma strict

public var speed:float=1000;

function Start(){
}

function Update()
{
	if(Input.GetKey("w")){
		transform.Rotate(Vector3.right, speed * Time.deltaTime*100);
		speed+=Time.deltaTime;
	}
	if(Input.GetKey("s")){
		transform.Rotate(Vector3.left, speed * Time.deltaTime*100);
		speed+=Time.deltaTime;
	}
}
