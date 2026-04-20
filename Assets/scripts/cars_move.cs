using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class Cars_mov : MonoBehaviour
{
    [Header("UI")]
    public Text score;
    public Text gear;
    public Text health;
    public Text timert;
    public Text gameOver;
    public Text RR;
    public Text intro;
    public Text cntdwn;
    public Text finish;

    [Header("State")]
    public bool gameover = false;
    public int start = 0;
    public int min = 5;
    public float sec = 60;
    public float milisec = 60;
    public int hit = 0;

    [Header("Movement")]
    public float maxSpeed = 320f;
    public float maxReverseSpeed = -10f;
    public float maxStopSpeed = 0f;
    float currentSpeed = 0f;
    int hlt = 100;

    [Header("Audio")]
    public AudioClip raceEngine;
    public AudioClip ignition;
    private AudioSource audioRace;
    private AudioSource audioIgni;

    enum ShipModes { Idle, Moving, Reverse, Stopin }
    ShipModes currentMode = ShipModes.Idle;

    AudioSource AddAudio(AudioClip clip, bool loop, bool playAwake, float vol)
    {
        var newAudio = gameObject.AddComponent<AudioSource>();
        newAudio.clip = clip;
        newAudio.loop = loop;
        newAudio.playOnAwake = playAwake;
        newAudio.volume = vol;
        return newAudio;
    }

    void Awake()
    {
        AudioListener.volume = 0.5f; // was 50, but volume is 0.0-1.0 in Unity
        audioRace = AddAudio(raceEngine, true, false, 0.2f);
        audioIgni = AddAudio(ignition, true, true, 0.4f);
    }

    void OnCollisionEnter(Collision col)
    {
        string name = col.gameObject.name;
        ContactPoint contact = col.contacts[0];

        if (name == "mid pillar" || name == "Building")
        {
            transform.Rotate(0, 10, 0);
            Debug.Log(contact.point);
            hlt -= 1;
        }
        if (name == "concrete barrier")
        {
            transform.Rotate(0, 90, 0);
            hlt -= 10;
            hit = 1;
        }
        if (name == "car" || name == "Terrain 36")
        {
            transform.Rotate(0, 10, 0);
            hlt -= 5;
        }
        if (name == "CrashBarrierBrokenL" || name == "woodRailingL")
        {
            transform.Rotate(0, 10, 0);
            hlt -= 5;
        }
        if (name == "CrashBarrierBrokenR" || name == "woodRailingR")
        {
            transform.Rotate(0, -10, 0);
            hlt -= 5;
        }
        if (name == "Rampstart")
        {
            finish.text = "You Won.!!";
            Destroy(gameObject);
        }
    }

    IEnumerator Start()
    {
        finish.text = "";
        intro.text = "";
        gameOver.text = "";
        cntdwn.text = "";
        gameover = false;
        RR.text = "Rival Racing";

        yield return new WaitForSeconds(5);
        RR.text = "";
        intro.text = "W for acceleration \nS for Reverse or brake";

        yield return new WaitForSeconds(5);
        intro.text = "Don't take turns at maximum speed";

        yield return new WaitForSeconds(5);
        intro.text = "";
        cntdwn.text = "3";

        yield return new WaitForSeconds(0.5f);
        cntdwn.text = "2";

        yield return new WaitForSeconds(0.5f);
        cntdwn.text = "1";

        yield return new WaitForSeconds(0.5f);
        cntdwn.text = "GO.!";
        start = 1;

        yield return new WaitForSeconds(0.5f);
        cntdwn.text = "";
    }

    void Update()
    {
        if (start != 1) return;

        UpdateTimer();
        UpdateGameOver();
        if (gameover) return;
        UpdateModeInput();
        UpdateMovement();
        UpdateHUD();
    }

    void UpdateTimer()
    {
        milisec -= Time.deltaTime * 10;
        if (milisec <= 0)
        {
            sec--;
            milisec = 60;
            if (sec <= 0)
            {
                min--;
                sec = 60;
            }
        }
        timert.text = "Time " + min + ":" + (int)sec + ":" + (int)milisec;
    }

    void UpdateGameOver()
    {
        if (hlt <= 0 || min <= 0)
        {
            gameOver.text = "Game Over";
            gameover = true;
        }
        if (gameover)
            Destroy(gameObject);
    }

    void UpdateModeInput()
    {
        switch (currentMode)
        {
            case ShipModes.Idle:
                if (Input.GetKeyDown(KeyCode.W))
                {
                    currentMode = ShipModes.Moving;
                    audioRace.Play();
                    audioIgni.Stop();
                }
                else
                {
                    audioIgni.Play();
                    audioRace.Stop();
                }
                break;

            case ShipModes.Moving:
                if (Input.GetKeyDown(KeyCode.S))
                {
                    currentMode = ShipModes.Reverse;
                    AudioListener.volume = 0.5f;
                }
                else if (Input.GetKeyDown(KeyCode.W))
                {
                    audioRace.Play();
                    audioIgni.Stop();
                }
                else if (!Input.GetKey(KeyCode.W))
                {
                    currentMode = ShipModes.Stopin;
                }
                break;

            case ShipModes.Reverse:
                if (Input.GetKey(KeyCode.W))
                {
                    currentMode = ShipModes.Moving;
                    AudioListener.volume = 0.5f;
                    audioRace.Play();
                    audioIgni.Stop();
                }
                else if (!Input.GetKey(KeyCode.S))
                {
                    currentMode = ShipModes.Stopin;
                    AudioListener.volume = 0.5f;
                }
                break;

            case ShipModes.Stopin:
                if (Input.GetKey(KeyCode.W))
                {
                    currentMode = ShipModes.Moving;
                    audioRace.Play();
                    audioIgni.Stop();
                }
                else if (Input.GetKeyDown(KeyCode.S))
                {
                    currentMode = ShipModes.Reverse;
                    AudioListener.volume = 0.5f;
                }
                break;
        }
    }

    void UpdateMovement()
    {
        switch (currentMode)
        {
            case ShipModes.Idle:
                currentSpeed = Mathf.Lerp(currentSpeed, 0, Time.deltaTime);
                break;

            case ShipModes.Moving:
                currentSpeed = Mathf.Lerp(currentSpeed, maxSpeed, Time.deltaTime);
                transform.position += transform.forward * currentSpeed * (Time.deltaTime / 3);
                if (Input.GetKey(KeyCode.RightArrow)) transform.Rotate(0, 1, 0);
                if (Input.GetKey(KeyCode.LeftArrow))  transform.Rotate(0, -1, 0);
                break;

            case ShipModes.Reverse:
                currentSpeed = Mathf.Lerp(currentSpeed, maxReverseSpeed, Time.deltaTime);
                transform.position += transform.forward * currentSpeed * Time.deltaTime;
                if (Input.GetKey(KeyCode.RightArrow)) transform.Rotate(0, -5, 0);
                if (Input.GetKey(KeyCode.LeftArrow))  transform.Rotate(0, 5, 0);
                break;

            case ShipModes.Stopin:
                currentSpeed = Mathf.Lerp(currentSpeed, maxStopSpeed, Time.deltaTime);
                transform.position += transform.forward * currentSpeed * (Time.deltaTime / 3);
                if (Input.GetKey(KeyCode.RightArrow)) transform.Rotate(0, 3, 0);
                if (Input.GetKey(KeyCode.LeftArrow))  transform.Rotate(0, -3, 0);
                break;
        }
    }

    void UpdateHUD()
    {
        score.text = "SPEED " + Mathf.Abs(currentSpeed).ToString("F0");

        // Gear calculation
        int[] gearSpeeds = new int[5];
        int sp = 0;
        for (int j = 0; j < gearSpeeds.Length; j++)
        {
            gearSpeeds[j] = sp;
            sp += 64;
        }
        int currentGear = 1;
        for (int i = 0; i < gearSpeeds.Length; i++) // ⚠️ bug fix: was missing .Length
        {
            if (currentSpeed > gearSpeeds[i]) currentGear++;
            else break;
        }

        gear.text = "GEAR " + currentGear;
        health.text = "HEALTH " + hlt;
    }
}