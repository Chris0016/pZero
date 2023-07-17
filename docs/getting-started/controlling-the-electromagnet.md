---
sidebar_position: 3
---
# Controlling the Electromagnet

Powerful electromagnets run hot and are expensive. A good way to get started quickly is to use a small motor with some tape attached. You can test your code hundreads of times without worrying about breaking an expensive electromagnet.

## Materials Required

* Arduino Uno R3
* Arduino IDE
* USB Coms cable
* MOSFET Transistor
* Breadboard
* Jumper Wires
* Alligator Clips
* Power supply
* 

## Setup

In this case our motor is replacing the electromagnet for development purposes. However, the goal is to be able to communicate with our 'electromagnet' and be able to vary the strength of the electromagnet. By changing the power of the electromagnet we achieve the pulsating effect of the ferrofluid seen [here](https://www.youtube.com/watch?v=FKUgnO14eJ4).

We can simulate giving the electromagnet less power through a technique called pwm(link me) instead of getting dedicated circuitry.

PWM stands for Pulse Width Modulation. If we send a constant stream of power to our motor and it will run at full power. However, if our power stream pulsates between on and off, depending on the rate, we can make our device at a lesser power. Moreover, by fine tunning the on and off rate we can have further control of at what percentage of speed/strength the device runs at.

The first step is to setup wirings to connect our motor, MOSFET Transistor, and Arduino.

We explore why a MOSFET and not a Relay in the FAQ below. 

### Wiring

Diagram of schematics


Image of schematics


## Progamming the Arduino

**Hello World Program**

A good way to test if everything is working



## FAQ

**Why a MOSFET Transistor and Not a Relay?**  

In short, MOSFETs can switch between on and off much faster than traditional relays allowing us to do actual pwm.       Also because relays have an electromagnet inside they make a noticeable click every time it switches state. You can read more about the differences between Relays and MOSFET Transistors here(Link to personal page).

**I can't connect to my Arduino?**

* Make sure Arduino is not on top of  a metal surface. Restart and try again.
* Set the Output Device
  * **Linux Devices**
  * -Permission denied error. Need to add sudo to Dialout group and tty
  * ```
    //Add your standard user to the group "dialout'
      sudo usermod -a -G dialout your-username

    //Add your standard user to the group "tty"
      sudo usermod -a -G tty your-username

    //Logout/Login
    ```
  * -No device found error. Finding correct output. Should be /dev/ttyACM0 or /dev/ttyUSB0.
  * ```
    //Run this command to find which port
    dmesg | grep tty

    //or 
    //Remove Arduino usb plug
    ls /dev

    //Reconnect usb device
    ls /dev

    //See what new port appeared by comparing output of first command(when device wasn't plugged in) to output // of last command(when device was plugged in).  

    ```
  * **Windows**
  * Output device should be "COM1"
