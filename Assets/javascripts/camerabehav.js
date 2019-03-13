#pragma strict

import UnityEngine.UI;
public var score : Text;
public var gear : Text;
public var health:Text;
public var timert:Text;
enum Modes { Idle, Moving, Reverse, Stopin };
    var currentMode = Modes.Idle;
    var currentSpeed = 0.0;
    var maxSpeed = 20.0;
    var maxReverseSpeed = -5;
    var maxStopSpeed=0.0;
    var hlt=100;

var maxVolume:int=50;

function start()
{
}

function update()
{
	if(Input.GetKeyDown("right")) {
                       transform.Rotate(0, 1, 0);
                    }
         if(Input.GetKeyDown("left")) {
                       transform.Rotate(0, -1, 0);
                    }
         /*if(currentSpeed<=20)
            	currentSpeed-=0.25*Time.deltaTime;*/
		 switch(currentMode) {
                 case Modes.Idle:
                    if(Input.GetKeyDown(KeyCode.W)) { 
                       currentMode = Modes.Moving;
                      	
                    }
                   if(!Input.GetKeyDown(KeyCode.W)) { 
                       currentMode = Modes.Idle;
                      	//audio.Play();
                    }
                    break;
                    
                 	case Modes.Moving:
                    if(Input.GetKeyDown(KeyCode.S)) {
                       currentMode = Modes.Reverse;
                      
                    }
                    if(Input.GetKeyDown(KeyCode.W)) { 
                       currentMode = Modes.Moving;
                      	
                    }
                    if(!Input.GetKey(KeyCode.W))
                    {
                    	currentMode = Modes.Stopin;
                    	
                    }
                    break;
                    
                  	case Modes.Reverse:
                     if(Input.GetKey(KeyCode.W)) {
                        currentMode = Modes.Moving;
                     }
                     if(!Input.GetKey(KeyCode.S))
                    {
                    	currentMode = Modes.Stopin;
                    	
                    }
                     break;
                     
                    case Modes.Stopin:
                    if(Input.GetKey(KeyCode.W))
                    {
                    	currentMode = Modes.Moving;
                    	
                    }
                    if(Input.GetKeyDown(KeyCode.S)) {
                       currentMode = Modes.Reverse;
                       
                    }
                    break;
           }
           //Movement phase 
           switch(currentMode) {
                 case Modes.Idle:
                     currentSpeed = Mathf.Lerp(currentSpeed, 0, Time.deltaTime);
                     break;
                 case Modes.Moving:
                     currentSpeed = Mathf.Lerp(currentSpeed, maxSpeed, Time.deltaTime); //Or MoveTowards
                     transform.position += transform.forward * currentSpeed * Time.deltaTime; 
                     break;
                 case Modes.Reverse:
                     currentSpeed = Mathf.Lerp(currentSpeed, maxReverseSpeed, Time.deltaTime); //Or MoveTowards
                     transform.position += transform.forward * currentSpeed * Time.deltaTime;
                     break;
                 case Modes.Stopin:
                 	currentSpeed = Mathf.Lerp(currentSpeed, maxStopSpeed, Time.deltaTime);
                 	 transform.position += transform.forward * currentSpeed * Time.deltaTime;
                 	 break;
           }
            score.text="SPEED "+Mathf.Abs(currentSpeed*10).ToString("F0");//displaying speed
            var gr=0;
            var sp=currentSpeed;
      
            	
            	if(currentSpeed==sp)
            	{
            		gear.text="GEAR "+gr;//displaying gear
            	}
            	sp=sp+5;
            	gr=gr+1;
                health.text="HEALTH "+hlt;
                var timer = 120.0;
 				timer = Mathf.Max (0, timer-Time.deltaTime);
    			var timeSpan = System.TimeSpan.FromSeconds(timer);
    				timert.text = timeSpan.Hours.ToString("00") + ":" +
                    timeSpan.Minutes.ToString("00") + ":" +
                    timeSpan.Seconds.ToString("00");
            
}