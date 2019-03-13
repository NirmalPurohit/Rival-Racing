#pragma strict
//static var int:destro=0;
function OnCollisionEnter(col : Collision)
{
	if(col.gameObject.name=="Car High")
	{
		//transform.Translate(Vector3.back*10);
		Destroy(col.gameObject);
		//Debug.Log("collision");
		//destro++;*/
		
			//Debug.Log("collision occur");
	}
}