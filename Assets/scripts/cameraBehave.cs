using UnityEngine;
using UnityEngine.UI;

public class camerabehav : MonoBehaviour
{
    public Text score;
    public Text gear;
    public Text health;
    public Text timert;

    enum Modes { Idle, Moving, Reverse, Stopin }
    Modes currentMode = Modes.Idle;

    float currentSpeed = 0f;
    float maxSpeed = 20f;
    float maxReverseSpeed = -5f;
    float maxStopSpeed = 0f;
    int hlt = 100;

    // NOTE: timer is reset every frame in original — see observation below
    float timer = 120f;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.RightArrow)) transform.Rotate(0, 1, 0);
        if (Input.GetKeyDown(KeyCode.LeftArrow))  transform.Rotate(0, -1, 0);

        switch (currentMode)
        {
            case Modes.Idle:
                if (Input.GetKeyDown(KeyCode.W)) currentMode = Modes.Moving;
                else currentMode = Modes.Idle;
                break;

            case Modes.Moving:
                if (Input.GetKeyDown(KeyCode.S)) currentMode = Modes.Reverse;
                else if (Input.GetKeyDown(KeyCode.W)) currentMode = Modes.Moving;
                else if (!Input.GetKey(KeyCode.W)) currentMode = Modes.Stopin;
                break;

            case Modes.Reverse:
                if (Input.GetKey(KeyCode.W)) currentMode = Modes.Moving;
                else if (!Input.GetKey(KeyCode.S)) currentMode = Modes.Stopin;
                break;

            case Modes.Stopin:
                if (Input.GetKey(KeyCode.W)) currentMode = Modes.Moving;
                else if (Input.GetKeyDown(KeyCode.S)) currentMode = Modes.Reverse;
                break;
        }

        switch (currentMode)
        {
            case Modes.Idle:
                currentSpeed = Mathf.Lerp(currentSpeed, 0, Time.deltaTime);
                break;
            case Modes.Moving:
                currentSpeed = Mathf.Lerp(currentSpeed, maxSpeed, Time.deltaTime);
                transform.position += transform.forward * currentSpeed * Time.deltaTime;
                break;
            case Modes.Reverse:
                currentSpeed = Mathf.Lerp(currentSpeed, maxReverseSpeed, Time.deltaTime);
                transform.position += transform.forward * currentSpeed * Time.deltaTime;
                break;
            case Modes.Stopin:
                currentSpeed = Mathf.Lerp(currentSpeed, maxStopSpeed, Time.deltaTime);
                transform.position += transform.forward * currentSpeed * Time.deltaTime;
                break;
        }

        score.text = "SPEED " + Mathf.Abs(currentSpeed * 10).ToString("F0");
        health.text = "HEALTH " + hlt;

        timer = Mathf.Max(0, timer - Time.deltaTime);
        var timeSpan = System.TimeSpan.FromSeconds(timer);
        timert.text = timeSpan.Hours.ToString("00") + ":" +
                      timeSpan.Minutes.ToString("00") + ":" +
                      timeSpan.Seconds.ToString("00");
    }
}