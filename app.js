const select = document.getElementById("conversion");
const element = document.getElementById('frm3');
const drop = document.getElementById('drop');
const fRate = document.getElementById('fr');
var frameRate = 25;
var delay = '';

select.addEventListener('change', function handleChange(event) {
    //clear input box
    document.getElementById('enter').value = '';
    //clear output
    document.getElementById('output').innerHTML = '';
  });

function doSubmit() {
    if (fRate.value.length == 0) {
        frameRate = 25;
    } else {
        frameRate = fRate.value;
    }

    if (drop.value.length == 0) {
        delay = '00:00:00:00';
    } else {
        delay = drop.value;
    }

    if (select.value == 1) {
        //frame
        let f = (3600*frameRate);
        var a = parseInt(document.getElementById('enter').value);
        a = a+getFrames(delay);
        var hours = Math.floor(a/f);
        var mins = Math.floor((a%f)/(60*frameRate));
        var sec = Math.floor((a%f%(60*frameRate))/frameRate);
        var frames = Math.floor((a%f%(60*frameRate)%frameRate));
        //add delay

        //construct string output
        var output = '';
        var c = ':';
        var arr = [hours,mins,sec,frames];
        for (i in arr) {
            if (arr[i] < 10) {
                output += '0'
            }
            output += String(arr[i]);
            if (i < 3) {
                output += c;
            }
        }

        document.getElementById('output').innerHTML = output;

    } else if (select.value == 2) {
        //time (add delay)
        
        var finalVal = 0;
        var output = '';

        finalVal = getFrames(document.getElementById('enter').value) - getFrames(delay);
        
        output = String(finalVal);
        document.getElementById('output').innerHTML = output;

    }
    
    function getFrames(inp) {
    var thing = inp.split(':');
    var multiplier = (3600*frameRate);
    var frameValue = 0;
        for (i=0;i<3;i++) {
            frameValue += parseInt(thing[i]*multiplier);
            multiplier /= 60;
        }
        frameValue += parseInt(thing[3]);
    return frameValue;
}
}
