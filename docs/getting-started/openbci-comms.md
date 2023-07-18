---
sidebar_position: 6
---
# OpenBCI Comms

At this stage we are ready to receive data from our OpenBCI headset. We can simulate our OpenBCI without actually having one ready yet by creating auto-generated data. This will give us the chance to develop and test out algorithms without actually having to setup the actual headset.

In the next tutorial we'll go over how to setup the Mark IV OpenBCI headset.

***Arduino Code***

Our Arduino stays the same from the previous article(link me).

```
const int MAGNET_1 = 9;


//states
typedef enum state_t {
  S_READ,          // 0
  S_RUNNING,       // 1
  S_HOLD_MAX_PWM,  // 2
  S_PAUSE          //3 not used but optional for testing purposes

};

static state_t state = S_READ;

//Having a delay as curr_pwm changes towards  target_pwm makes the transition between values smoother and more visible to the user(TO BE TESTED)
static int delay_value = 100;

static int prev_pwm_target = 0;
static int curr_pwm_target = 0;
static int curr_pwm = 0;

static int flag = 1;  //Used for either moving up or down in pwm

static int TARGET_PWM_HOLD_DURATION = 3000;  //Milliseconds, subject to change TODO tunning
static int PAUSE_DURATION = 3000; //FOR TESTING

unsigned long ts = millis();



void setup() {
  pinMode(MAGNET_1, OUTPUT);
  analogWrite(MAGNET_1, 100); //Startup motor, for small first pwm values motor might look like it's not running. 
  Serial.begin(9600);
 
}

void loop() {

  Serial.println("state " + String(state));


  switch (state) {
    case S_READ:
      {
        // Signal Raspberry Pi that it can send the next values
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


        //using only curr_pwm & target_pwm is not explicit when comparing them for switching flag
        // if only using curr_pwm & target_pwm then:
        //    on flag switch target_pwm means the "current value"(vs the "previous"(curr_pwm) )
        //    target_pwm also means what curr_pwm is trying to reach in the other cases

        prev_pwm_target = curr_pwm_target;

        delay_value = value1Str.toInt();
        curr_pwm_target = value2Str.toInt();

        state = S_RUNNING;
        int diff = curr_pwm_target - prev_pwm_target;

        if (diff > 0)
          flag = 1;
        else if (diff < 0)
          flag = -1;
        else
          state = S_HOLD_MAX_PWM;

        //Cannot set first timer for delay within the S_RUNNING case
        ts = millis();
      }
      break;

    case S_RUNNING:
      {

        analogWrite(MAGNET_1, curr_pwm);
        while ( (unsigned long)(millis() - ts) < delay_value) {
        }

        curr_pwm += flag;

        if ((curr_pwm_target == curr_pwm && flag == 1) || (curr_pwm_target == curr_pwm && flag == -1)) {
          state = S_HOLD_MAX_PWM;
        }

        ts = millis();
      }
      break;

    case S_HOLD_MAX_PWM:
      {
  
        analogWrite(MAGNET_1, curr_pwm);
        if ( (unsigned long)(millis() - ts) > TARGET_PWM_HOLD_DURATION) {
          state = S_READ; //S_PAUSE for testing 
  
          ts = millis();  
        }
        break;
      }
    case S_PAUSE:
      {
        analogWrite(MAGNET_1, 0);
        while (  (unsigned long) (millis() - ts) < PAUSE_DURATION) {
          //do nothing
        }
        ts = millis();
        state = S_READ;
      }
      break;
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
  Serial.print(",");
  Serial.print(String(flag));
  
}
```

***OpenBCI Code***

Install cyton library for python (for Windows run w/o sudo )

```
sudo python3 -m pip install brainflow
```

Included are also some of the code I used for debugging which can also help you if need be.

Take a look at the code and try to understand it. The next section will go over the code.

```
import serial
import time
import random
import math
import statistics

from brainflow.board_shim import BoardShim, BrainFlowInputParams, LogLevels, BoardIds
from brainflow.data_filter import DataFilter, AggOperations

'''
CYTON BOARD:

num eeg(emg,…) channels: 8

num acceleration channels: 3

sampling rate: 250

communication: serial port

signal gain: 24

'''

##Change these values depending on channel, some channels only go up to 100
BCI_UPPER_LIMIT = 55_000
BCI_LOWER_LIMIT = 45_000 #big negative numbers are considered no activity
SELECTED_CHANNEL = 8

DATA_ROWS = 80


DELAY_LOWER_LIMIT = 150
DELAY_UPPER_LIMIT = 100
DELAY_STEP = 10


PWM_LOWER_LIMIT = 20.0
PWM_UPPER_LIMIT = 40.0
#PWM_STEP = 10


SLEEP_TIMER = 3

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



def send_data(pwmTarget):
    ## TESTING - Send a random number to the arduino
    delay = 0
    pwmTarget = randomMultiple(PWM_LOWER_LIMIT, PWM_UPPER_LIMIT, PWM_STEP)
		#send values between PWM_LOWER_LIMIT (50) and    PWM_UPPER_LIMIT (255) 
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

    # Send the values to Arduino
    ser.write(str(delay).encode('utf-8'))
    ser.write(b',')
    ser.write(str(pwmTarget).encode('utf-8'))
    ser.write(b'\n')

def randomMultiple(minimum, maximum, step):
    return random.randint(math.ceil(minimum / step ), math.floor(maximum / step)) * step



### openBCI Connection ###

#openBCI board setup
BoardShim.enable_dev_board_logger()

# use synthetic board for demo
params = BrainFlowInputParams()
board = BoardShim(BoardIds.SYNTHETIC_BOARD.value, params)

#REAL BOARD
#params = BrainFlowInputParams()
#params.serial_port = "/dev/ttyUSB0" //CHANGE THIS DEPENDING ON YOUR OS
#board = BoardShim(BoardIds.CYTON_BOARD, params)

def get_board_data():

    board.prepare_session()
    board.start_stream()
    BoardShim.log_message(LogLevels.LEVEL_INFO.value, 'start sleeping in the main thread')
    time.sleep(SLEEP_TIMER)
    data = board.get_board_data(DATA_ROWS)
    board.stop_stream()
    board.release_session()
  

  
    eeg_channels = BoardShim.get_eeg_channels(BoardIds.CYTON_BOARD.value)
  
    downsampled_data = []

    # downsample data, it just aggregates data
    for count, channel in enumerate(eeg_channels):
        print('Original data for channel %d:' % channel)
        print(data[channel])
        # if count == 0:
        #     downsampled_channel = DataFilter.perform_downsampling(data[channel], 3, AggOperations.MEDIAN.value)
        # elif count == 1:
        #     downsampled_channel = DataFilter.perform_downsampling(data[channel], 2, AggOperations.MEAN.value)
        # else:
        #     downsampled_channel = DataFilter.perform_downsampling(data[channel], 2, AggOperations.EACH.value)
  
        #print('Downsampled data for channel %d:' % channel)
        #print(downsampled_data)

        # downsampled_data.append(downsampled_channel)

    return data[SELECTED_CHANNEL]



#Takes a channel with a number of eeg values and converts it to a 
#corresponding value in the range of PWM_LOWER_LIMIT(set to ~20) to PWM_UPPER_LIMIT(set to ~40)

def process_bci_data(channel):
  
    mean =  statistics.mean(channel) 

    if (mean < 0 ):
        return PWM_LOWER_LIMIT


    diff = (BCI_UPPER_LIMIT - BCI_LOWER_LIMIT)
    x = mean - BCI_LOWER_LIMIT

    x_normalized = (x/diff)

    #DEBUGGING
    #print("\n channel: \n", channel, "\n")
    #print("\n mean: ", mean, "\n")
    #print("\n x_nomalized:", x_normalized, "\n")

  
    return (x_normalized *  (PWM_UPPER_LIMIT - PWM_LOWER_LIMIT) ) + PWM_LOWER_LIMIT 

def get_pwm_value():
    #Collect data from bci headset

    channel_data = get_board_data()
    return process_bci_data(channel_data)

#print(get_pwm_value())

### openBCI Connection ###


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
                send_data(get_pwm_value())
            else:
                #print("Waiting")

        except KeyboardInterrupt:
            break

    # Close the serial connection
    ser.close()

    #iteration = 1 #For DEBUGGING 

    '''
    while True: 
       try:
            print("\n\n--------------- Iteration : ", iteration,"---------------\n\n")
            pwm = get_pwm_value()
            print("pwm: ", pwm)
            print("\n\nsleeping...\n\n")
            time.sleep(2)
            iteration = iteration + 1
        except KeyboardInterrupt:
            break
    '''

main()

```

## FAQ

Module Not Found Error
