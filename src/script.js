var pins = [];

class Pin {
    constructor(num, value, bitmask) {
        this.num = num;
        this.value = value;
        this.bitmask = bitmask;
    }
}

function portToPins(port, pinlayout) {
    let mask = 1;   //bit mask

    //loop through the 8 bits in a port
    for (let i = 0; i < 8; i++) {
        //is the pin even valid?
        if (pinlayout[i] == null) {
            mask = mask << 1; //check the next pin
            continue;
        }
        //checking if the value we want is a 1
        if ((port & mask) != 0) {
            pins[pinlayout[i]] = new Pin(pinlayout[i], true, mask);
        } else {
            pins[pinlayout[i]] = new Pin(pinlayout[i], false, mask);
        }

        mask = mask << 1; //check the next pin
    }

    //we're done now
    return;
} 

function displayPins() {
    for (var p of pins) {
        if (p === undefined) continue; //don't care about missing pins in the array
        if (p.num < 22) continue; //don't care about the pins that aren't on the big header
        let tbl = document.getElementById(`p${p.num}`);
        tbl.innerHTML = (p.value) ? "1" : "0";
    }
}

function onButton() {
    //reset
    pins = [];
    //all the text boxes
    var porta = parseInt(document.getElementById("porta").value, 16);
    var portb = parseInt(document.getElementById("portb").value, 16);
    var portc = parseInt(document.getElementById("portc").value, 16);
    var portd = parseInt(document.getElementById("portd").value, 16);
    var portg = parseInt(document.getElementById("portg").value, 16);
    var portl = parseInt(document.getElementById("portl").value, 16);

    portToPins(porta, [22, 23, 24, 25, 26, 27, 28, 29]); //port a
    portToPins(portb, [53, 52, 51, 50, null, null, null, null]); //port b
    portToPins(portc, [37, 36, 35, 34, 33, 32, 31, 30]); //port c
    portToPins(portd, [null, null, null, null, null, null, null, 38]); //port d
    portToPins(portg, [41, 40, 39, null, null, null, null, null]); //port g
    portToPins(portl, [49, 48, 47, 46, 45, 44, 43, 42]); //port l

    //display pins now
    displayPins();
}