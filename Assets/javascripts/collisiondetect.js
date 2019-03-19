#pragma strict

function OnCollisionEnter(col : Collision)
{
	if(col.gameObject.name=="Car High"){
		Destroy(col.gameObject);
	}
}