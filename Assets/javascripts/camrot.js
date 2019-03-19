#pragma strict

import UnityEngine.UI;
public var score : Text;
public var gear : Text;
public var health:Text;
public var timert:Text;
public var gameOver:Text;
public var RR:Text;
public var intro:Text;
public var cntdwn:Text;
public var finish:Text;
public var gameover:boolean;
public  var start:int=0;
public var min:int=5;
public var sec:int=60;
public var milisec:int=60;
public var hit:int=0;

enum ShipModes { Idle, Moving, Reverse, Stopin };
var currentMode = ShipModes.Idle;
var currentSpeed = 0.0;
var maxSpeed = 320.0;
var maxReverseSpeed = -10;
var maxStopSpeed=0.0;
var hlt=100;
AudioListener.volume=50;


// define the audio clips------------------------------------------------------------------------------------------
var raceEngine: AudioClip;
var ignition: AudioClip;
private var audioRace: AudioSource;
private var audioIgni: AudioSource;
 
 function AddAudio(clip:AudioClip, loop: boolean, playAwake: boolean, vol: float): AudioSource{ 
   var newAudio = gameObject.AddComponent(AudioSource);
   newAudio.clip = clip; 
   newAudio.loop = loop;
   newAudio.playOnAwake = playAwake;
   newAudio.volume = vol; 
   return newAudio; 
}
 
function Awake(){
   audioRace = AddAudio(raceEngine, true, false, 0.2);
   audioIgni = AddAudio(ignition, true, true, 0.4);   
} 
	
//detecing collision------------------------------------------------------------------------------------------------------
function OnCollisionEnter(col : Collision)
{
	if(col.gameObject.name=="mid pillar" || col.gameObject.name=="Building")
	{
		var contact : ContactPoint = col.contacts[0];
		transform.Rotate(0, 10, 0);
        Debug.Log(contact.point); 
        hlt-=1;
	}
	
	if(col.gameObject.name=="concrete barrier")
	{
		transform.Rotate(0, 90, 0);	
        hlt-=10;
        hit=1;	
	}
	
	if(col.gameObject.name=="car" || col.gameObject.name=="Terrain 36")
	{
		transform.Rotate(0, 10, 0);	
        hlt-=5;
	}
	
	if(col.gameObject.name=="CrashBarrierBrokenL" || col.gameObject.name=="woodRailingL")
	{
		transform.Rotate(0, 10, 0);	
        hlt-=5;
	}
	
	if(col.gameObject.name=="CrashBarrierBrokenR" || col.gameObject.name=="woodRailingR")
	{
		transform.Rotate(0, -10, 0);	
        hlt-=5;
	}
	
	if(col.gameObject.name=="Rampstart")
	{
		finish.text="You Won.!!";
		Destroy(gameObject);
		Destroy(this);
	}
}

//At beginning----------------------------------------------------------------------------------------------------------
function Start () {
     	
     	finish.text="";
     	intro.text="";
     	gameOver.text="";
     	cntdwn.text="";
     	gameover=false;
     	RR.text="Rival Racing";
     	yield new WaitForSeconds(5);
     	RR.text="";
	    intro.text="W for accelaration \nS for Reverse or brake";
	    yield new WaitForSeconds(5);
	    intro.text="Don't take turns at maximum speed";
	    yield new WaitForSeconds(5);
	    intro.text="";
	    cntdwn.text="3";
	    yield new WaitForSeconds(0.5);
	    cntdwn.text="2";
	    yield new WaitForSeconds(0.5);
	    cntdwn.text="1";
	    yield new WaitForSeconds(0.5);
	    cntdwn.text="GO.!";
	    start=1;
	    yield new WaitForSeconds(0.5);
	    cntdwn.text="";	    
}

//Actual game-----------------------------------------------------------------------------------------------------------
function Update () {
   //----------------------------------Timer dsiplay---------------------------------------------------
	if(start==1){
      milisec=milisec-(Time.deltaTime*10);
      if(milisec==0){
         sec--;
         milisec=60;
         if(sec==0){
            min--;
            sec=60;
         }
      }
      //-----------------------------Game over--------------------------------------------------------------------------------
      if(hlt<=0 || min==0){
         gameOver.text="Game Over";
         gameover=true;
      }
      if(gameover){
         Destroy(gameObject);
         Destroy(this);
      }
      timert.text="Time "+min+":"+sec+":"+milisec; // Time display
            
   //--------------------------------------------Car movements-----------------------------------------------------
      switch(currentMode) {
               case ShipModes.Idle:
                  if(Input.GetKeyDown(KeyCode.W)) { 
                     currentMode = ShipModes.Moving;
                     audioRace.Play();
                     audioIgni.Stop();
                  }
                  if(!Input.GetKeyDown(KeyCode.W)) { 
                     currentMode = ShipModes.Idle;
                     audioIgni.Play();
                     audioRace.Stop();
                  }
               break;
                  
               case ShipModes.Moving:
                  if(Input.GetKeyDown(KeyCode.S)) {
                     currentMode = ShipModes.Reverse;
                     AudioListener.volume = 0.5;
                  }
                  if(Input.GetKeyDown(KeyCode.W)) { 
                     currentMode = ShipModes.Moving;
                     audioRace.Play();
                     audioIgni.Stop();
                  }
                  if(!Input.GetKey(KeyCode.W))
                  {
                  currentMode = ShipModes.Stopin;
                  }
               break;
                  
            case ShipModes.Reverse:
                  if(Input.GetKey(KeyCode.W)) {
                     currentMode = ShipModes.Moving;
                     AudioListener.volume = 50;
                     audioRace.Play();
                     audioIgni.Stop();
                  }
                  if(!Input.GetKey(KeyCode.S))
                  {
                  currentMode = ShipModes.Stopin;
                  AudioListener.volume = 0.5;
                  }
               break;
                  
               case ShipModes.Stopin:
                  if(Input.GetKey(KeyCode.W))
                  {
                  currentMode = ShipModes.Moving;
                  audioRace.Play();
                  audioIgni.Stop();
                  }
                  if(Input.GetKeyDown(KeyCode.S)) {
                     currentMode = ShipModes.Reverse;
                     AudioListener.volume = 0.5;
                  }
               break;
         }
   //-------------------------------------Movement phase-------------------------------------------------
            switch(currentMode) {
                  case ShipModes.Idle:
                        currentSpeed = Mathf.Lerp(currentSpeed, 0, Time.deltaTime);
                        break;
                        
                  case ShipModes.Moving:
                        currentSpeed = Mathf.Lerp(currentSpeed, maxSpeed, Time.deltaTime); //Or MoveTowards
                        transform.position += transform.forward * currentSpeed * (Time.deltaTime/3); 
                        if(Input.GetKey("right")) {
                        transform.Rotate(0, 1, 0);
                        
                     }
                     if(Input.GetKey("left")) {
                        transform.Rotate(0, -1, 0);
                     }
                        break;
                        
                  case ShipModes.Reverse:
                        currentSpeed = Mathf.Lerp(currentSpeed, maxReverseSpeed, Time.deltaTime); //Or MoveTowards
                        transform.position += transform.forward * currentSpeed * Time.deltaTime;
                        if(Input.GetKey("right")) {
                        transform.Rotate(0, -5, 0);
                     }
                  if(Input.GetKey("left")) {
                        transform.Rotate(0, 5, 0);
                     }
                     
                        break;
                  case ShipModes.Stopin:
                     currentSpeed = Mathf.Lerp(currentSpeed, maxStopSpeed, Time.deltaTime);
                     transform.position += transform.forward * currentSpeed * (Time.deltaTime/3);
                        if(Input.GetKey("right")) {
                        transform.Rotate(0, 3, 0);
                     }
                     if(Input.GetKey("left")) {
                        transform.Rotate(0, -3, 0);
                     }
                     break;
            }           
   
   //-------------------Display speed------------------------------------------------------------------          
      score.text="SPEED "+Mathf.Abs(currentSpeed*1).ToString("F0");
               
   //-------------------------------Gear change display---------------------------------------------------
      var sp=0;
      var gearSpeeds:int[];
         gearSpeeds=new int[5];
      for(var j:int=0;j<gearSpeeds.length;j++)
      {
         gearSpeeds[j]=sp;
         sp+=64;
      }

      var currentGear:int = 1; 

      for(var i:int=0;gearSpeeds.length;i++)
      { 
         if(currentSpeed > gearSpeeds[i]) currentGear++; 
         else break;
         }	
         gear.text="GEAR "+currentGear;
         health.text="HEALTH "+hlt;
         
      }
   }
}