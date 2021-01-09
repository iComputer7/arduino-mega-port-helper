
# arduino-mega-port-helper

A tool that will help you not go crazy when trying to access ports on the Arduino Mega. I tested this with the Arduino Mega 2560, but it should work on the other version as well.

## What are ports and why would I want to control them?

A port is a group of 8 pins on the actual microcontroller chip. But in order to control each pin in each port, you have to change a specific bit in a variable. The Arduino library does this for us with `digitalWrite()` but each call takes about 50 clock cycles. This is fine for people who just want to write code quickly without regard to speed, but if you're doing timing sensitive work or changing a lot of pins at once, this starts to add up quickly.

## What makes ports so difficult?

The Arduino Uno has a port layout that actually makes sense, so port commands on the Uno are not that difficult to code. The designers just put each port right next to each other. (Fun fact, pins 13-8 and 7-0 are on seperate headers for a reason. They're on different ports.)

Hoewver, the people who designed the Arduino Mega decided to put all of the PWM and serial pins next to each other. This would be fine if all of the PWM pins were on their own ports, but they aren't. A normal user wouldn't notice because Arduinos have their own pin numbering scheme, but is extremely frustrating when dealing with the ports directly.