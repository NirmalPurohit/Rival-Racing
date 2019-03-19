#pragma strict

function Start () {
}

function Update () {
     /*
      * Car movement with the key press
     */

     if(Input.GetKey("w")){
          transform.Translate(Vector3.forward*10);
     }
     if(Input.GetKey("s")){
          transform.Translate(Vector3.back*10);
     }
     if(Input.GetKey("right")){
          transform.Rotate(0, 1, 0);
     }
     if(Input.GetKey("left")){
          transform.Rotate(0,-1, 0);
     }
}