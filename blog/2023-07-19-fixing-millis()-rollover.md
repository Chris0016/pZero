---
slug: fixing-millis-rollover
title: Fixing the millis() Rollover Issue
authors: [perez]
 
tags: [arduino, millis(), datatypes, rollover]
---
# Fixing the millis() Rollover Issue: Leveraging the "unsigned long" Data Type for Accurate Timing in Arduino

If you've encountered the millis() rollover issue in Arduino programming, you're not alone. Fortunately, there is a simple solution: leveraging the "unsigned long" data type. This data type plays a crucial role in ensuring accurate timing by extending the range of millis() and preventing time rollover. But what exactly is the "unsigned long" data type, and why is it relevant in this context?

To address the millis() rollover issue, we can declare a variable of type "unsigned long" to store the value returned by the millis() function. The "unsigned long" data type is capable of holding larger numerical values compared to "int" or "long". This extended range delays the occurrence of rollovers, allowing for more precise timing over extended periods. By using "unsigned long" variables to store the millis() value, we can effectively prevent time rollover issues and maintain accurate timekeeping in our Arduino projects.

```cpp
int period = 1000;
unsigned long time_now = 0;
  
void setup() {
    Serial.begin(115200);
}
  
void loop() {
    if(millis() - time_now > period){
        time_now = millis();
        Serial.println("Hello");
    }
  
    //Run other code
}
```

The "unsigned" aspect of "unsigned long" means it represents only non-negative values. This exclusion of negative numbers expands the range of positive values the variable can store. When it comes to timing operations, this is crucial as it ensures our code can handle values beyond what a standard "int" or "long" data type can accommodate.

Utilizing "unsigned long" is not only about fixing the millis() rollover issue; it also future-proofs your code. By employing a data type with a larger range, you allow your project to scale and adapt without running into timing limitations if you need it. Whether you're working on long-duration timing tasks or planning to expand your project's functionality, the "unsigned long" data type provides the necessary flexibility to handle larger values reliably.

In summary, by utilizing the "unsigned long" data type, we can overcome the millis() rollover issue and ensure accurate timing in Arduino programming. Its extended range and exclusion of negative values make it a powerful tool for precise timekeeping over prolonged periods. Moreover, the future-proofing aspect ensures your code remains adaptable as your project evolves. Embrace the capabilities of "unsigned long" and take control of accurate timing in your Arduino projects.

For an even more in detail explanation you can check out this [stackexchange link](https://arduino.stackexchange.com/questions/12587/how-can-i-handle-the-millis-rollover).

### Reaching Out

Join the[ discord server ](../docs/intro)to ask any questions you may have or propose changes/ideas.

We also have a [Youtube channel ](https://www.youtube.com/@dynamicSuspense00)available with tutorial videos.
