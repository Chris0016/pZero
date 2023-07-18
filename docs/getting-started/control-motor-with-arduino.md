---
sidebar_position: 4
---
# Control Motor with Arduino

In the previous tutorial we went over the wiring and introduced hello programs you can use to test your setup is correct. In this page we'll go over how to communicate with the arduino in order to tell it what power levels to run at.

## Arduino Setup Test Code

```
const int MAGNET_1 = 9;

void setup() {
   pinMode(MAGNET_1, OUTPUT);
}

void loop() {
	run_for_5s();
 	exit(0);
}

void run_for_5s(){
	_run_magnet(5_000, 255);
}

void _run_magnet(int duration, int max_pwm){
  static int ts = millis();
  analogWrite(MAGNET_1, max_pwm);
  
   while(millis() - ts < duration ){
   //do nothing 
   }

  analogWrite(MAGNET_1, 0);

}
```

## Control Motor with Arduino

The first step is to have a function that takes in a target pwm as a parameter and tells the motor to run at that pwm.

```bash
const int MAGNET_1 = 9;

void setup() {
   pinMode(MAGNET_1, OUTPUT);
}

void loop() {
	//play around with ths value and observe the different speeds of the motor. 
	int target_pwm = 100;
	run_magnet(target_pwm);
}

void run_magnet(int target_pwm){
	analogWrite(target_pwm);
}

```

## Smoothen Transition to PWM

We can  observe that our motor with tape starts and immediately reaches the target_pwm. We then change our program to make it go from 0 to target_pwm very smoothly by adding a delay and incrementing our values.

```
const int MAGNET_1 = 9;
static int delay = 500; //play around with this value to change transitions between pwms. 
static int delay_before_next_loop = 5000; //Wait 5 seconds before repeating process
unsigned long ts = millis();


void setup() {
   pinMode(MAGNET_1, OUTPUT);
}

void loop() {

	int target_pwm = 255; //play around with ths value and observe the different speeds of the motor. 
	run_magnet(target_pwm);

	while ( (unsigned long)(millis() - ts) < delay_before_next_loop) {
			//doNothing
        }
}

void run_magnet(int target_pwm){
	int curr_pwm = 0;
	while(curr_pwm < target_pwm){
		static int ts = millis();
		analogWrite(curr_pwm);

        	while ( (unsigned long)(millis() - ts) < delay_value) {
			//doNothing
        	}

		curr_pwm++; 
	}

}

```

## FAQs

What does static mean?

Why add a delay between target_pwm's?

What does unsigned long mean and why use it?
