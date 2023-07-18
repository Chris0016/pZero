---
sidebar_position: 5
---
# Communication with Computer

The next step is to send signals to the arduino through an external device like a laptop to tell it what the next target_pwm should be. We are sending two comma separated values to our arduino and the arduino is replying back to confirm.

***Arduino Code v1***

```
const int MAGNET_1 = 9;

unsigned long ts = millis();


void setup() {
  pinMode(MAGNET_1, OUTPUT);
  Serial.begin(9600);
 
}

void loop(){

	while (!Serial.available()) {
  
	}

	// Signal that it can send the next values
        Serial.println("Ready");

	// Read the data 
        String values = Serial.readStringUntil('\n');
        values.trim();


        // Extract the two values
        int commaIndex = values.indexOf(',');
        String value1Str = values.substring(0, commaIndex);
        String value2Str = values.substring(commaIndex + 1);

	//Confirmation
	Serial.out("value 1: " + value1Str );
	Serial.out("value 2: " + value2Str );

}

```

***Python Code(Stays the same throughout this tutorial)***

To run the program in linux

```
sudo python3 myOpenBCICode.py
```

BEWARE: Python Serial communication requires sudo user permissions to run. **If you install any other libraries through pip for this project make sure to install them as sudo**.

This is because libraries installed as default user are installed in a seperate folder from those installed as sudo. So when running as sudo, python will look in the sudo dir for libraries and not the regular user.

```
import serial
import time


# Handshake signal from Arduino
def arduino_ready():
    while True:
        #print("waiting")
        if ser.in_waiting:
            response = ser.readline().decode('utf-8').rstrip()
            if response == "Ready":
                return True
            else:
                print("\n Recived->>", response)


PWM_LOWER_LIMIT = 50
PWM_UPPER_LIMIT = 255
PWM_STEP = 5

def send_data():
   
    ## TESTING - Send a random number to the arduino
    delay = 0
    pwmTarget = randomMultiple(PWM_LOWER_LIMIT, PWM_UPPER_LIMIT, PWM_STEP)
		#send values between PWM_LOWER_LIMIT (50) and PWM_UPPER_LIMIT (255) 
		#that are multiples of PWM_STEP (5)
		#ex: 55, 100, 75, 250, 160, ... 
  

    ##TESTING - Alternate between to numbers 

    # low = 15
    # high = 50

    # if(isAtHigh):
    #     pwmTarget = low
    # else:
    #     pwmTarget = high
  
    ##TESTING - Send fixed values to the arduino

    #delay = 150
    #pwm_max = 255

   print("Sent ->", delay, " ", pwmTarget)


    # Send the values to Arduino
    ser.write(str(delay).encode('utf-8'))
    ser.write(b',')
    ser.write(str(pwmTarget).encode('utf-8'))
    ser.write(b'\n')

  

def randomMultiple(minimum, maximum, step):
    return random.randint(math.ceil(minimum / step ), math.floor(maximum / step)) * step

# Set up the serial connection
ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)  # Change '/dev/ttyACM0' to the correct port for your Arduino
ser.reset_input_buffer()
ser.close()
ser.open()
time.sleep(5)

def main():
  while True:
        try:
            # Wait for Arduino confirmation
            if arduino_ready():
                print("Arduino Ready")
                send_data()
            else:
                print("Waiting")

        except KeyboardInterrupt:
            break

    #Close the serial connection
    ser.close()

main()
```

## Reading and Controlling Motor

***Arduino Code v2***

We are now going to improve on our previous arduino code by using the input sent from our laptop or computer and using it to control the motor. To inplement this we'll be using a technique called finitie state machine.

We are receiving information information from the computer but also would like to control the motor at the same time. How can we achieve this? The solution is simple alternate between reading and controlling the motor very rapidly; so rapidly that it looks like its doing both at the same time to a human.

```
const int MAGNET_1 = 9;


//states
typedef enum state_t {
  S_READ,          // 0
  S_RUNNING,       // 1
  S_HOLD_MAX_PWM,  // 2
  S_PAUSE	   // 3
};

static state_t state = S_READ;
static int current_pwm = 0;
//Having a delay as curr_pwm changes towards  target_pwm makes the transition between values smoother and more visible to the user(TO BE TESTED)
static int delay_value = 100;

unsigned long ts = millis();

static int PAUSE_DURATON = 2000; 
static int TARGET_PWM_HOLD_DURATION = 3000;  

void setup() {
  pinMode(MAGNET_1, OUTPUT);
  Serial.begin(9600);
 
}

void loop() {

  Serial.println("state " + String(state));


  switch (state) {
    case S_READ:
      {
	curr_pwm = 0; //reset current pwm

        // Signal Computer that it can send the next values
        Serial.println("Ready");

   
          while (!Serial.available()) {
          }
  

        // Read the data 
        String values = Serial.readStringUntil('\n');
        values.trim();


        // Extract the two values
        int commaIndex = values.indexOf(',');
        String value1Str = values.substring(0, commaIndex);
        String value2Str = values.substring(commaIndex + 1);


  
        delay_value = value1Str.toInt();  
        curr_pwm_target = value2Str.toInt();

        state = S_RUNNING;
   
        //Cannot set first timer for delay within the S_RUNNING case
        ts = millis();
      }
      break;

    case S_RUNNING:
      {

        analogWrite(MAGNET_1, curr_pwm);
        while ( (unsigned long)(millis() - ts) < delay_value) {
        }

        curr_pwm += 1;

        if ((curr_pwm_target == curr_pwm) {
          state = S_HOLD_MAX_PWM;
        }

        ts = millis();
      }
      break;

    case S_HOLD_MAX_PWM:
      {
  
        analogWrite(MAGNET_1, curr_pwm);
        if ( (unsigned long)(millis() - ts) > TARGET_PWM_HOLD_DURATION) {
          state = S_READ; 
  
          ts = millis(); 
        }
        break;
      }
    case S_PAUSE:
	{
		analowWrite(MAGNET_1, 0);
 		if ( (unsigned long)(millis() - ts) > PAUSE_DURATION) {
          		state = S_READ; 
  
         	 ts = millis(); 
       		 }
        	break;
	}
  
    default:
      {
        state = S_RUNNING;
  
      }
      break;
  }

  Serial.print(delay_value);
  Serial.print(",");
  Serial.print(curr_pwm_target);
  Serial.print(",");
  Serial.print(curr_pwm);
  
}


```

## Transitioning Between PWM values

If you notice the code above goes from 0 to a random pwm and then back down zero and to the new target pwm. In our scenarion we don't want to start again from zero instead there should be a smooth transition between the current target pwm value and the next target pwm.

***Arduino Code v3***

```


```

## FAQ

Motor doesnt start on the first pwm value?
-> Given pwm value is to small to power on motor. Start motor warm.

    /*
        Implementing sophisticated logic to switch becomes to eleborate

    Because you can have consecutive values less than then don't switch flag if it's -1 already.
        Same goes for consecutive values that are greater than the previous.

    if (curr_pwm_target < prev_pwm_target && flag == 1 )
          flag = -1
        else if (curr_pwm_target > prev_pwm_target && flag == -1 )
          flag = 1

    Below is a rudamentary but faster solution
      */

    /*
        Implementing sophisticated logic to switch becomes to eleborate

    Because you can have consecutive values less than then don't switch flag if it's -1 already.
        Same goes for consecutive values that are greater than the previous.

    if (curr_pwm_target < prev_pwm_target && flag == 1 )
          flag = -1
        else if (curr_pwm_target > prev_pwm_target && flag == -1 )
          flag = 1

    Below is a rudamentary but faster solution*//*

    Implementing sophisticated logic to switch becomes to eleborate

    Because you can have consecutive values less than then don't switch flag if it's -1 already.

    Same goes for consecutive values that are greater than the previous.

    if (curr_pwm_target < prev_pwm_target && flag == 1 )

    flag = -1

    else if (curr_pwm_target > prev_pwm_target && flag == -1 )

    flag = 1

    Below is a rudamentary but faster solution

    */
