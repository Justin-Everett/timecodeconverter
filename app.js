const select = document.getElementById("conversion");
const element = document.getElementById('frm3');

const drop = document.createElement('input');
const textChild = document.createTextNode("Input time offset (formatted as hh/mm/ss/ff)"); 
const p = document.createElement('br');

select.addEventListener('change', function handleChange(event) {
    if (event.target.value == 2) {
        element.insertBefore(p, element.firstChild);
        element.insertBefore(drop, element.firstChild);
        element.insertBefore(p, element.firstChild);
        element.insertBefore(textChild, element.firstChild);
    } else {
        p.remove();
        drop.remove();
        textChild.remove();
        p.remove();
    }
});

function doSubmit() {
    if (select.value == 1) {
        //frame
        var a = parseInt(document.getElementById('enter').value);
        var hours = Math.floor(a/90000);
        var mins = Math.floor((a%90000)/1500);
        var sec = Math.floor((a%90000%1500)/25);
        var frames = Math.floor((a%90000%1500%25));
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
        var delay = 0;
        var output = '';
        
        if (drop.value.length == 0) {
            delay = '00:00:00:00';
        } else {
            delay = drop.value;
        }

        finalVal = getFrames(document.getElementById('enter').value) - getFrames(delay);
        
        output = String(finalVal);
        document.getElementById('output').innerHTML = output;

    }
}

function getFrames(inp) {
    var thing = inp.split(':');
    var multiplier = 90000;
    var frameValue = 0;
        for (i=0;i<3;i++) {
            frameValue += parseInt(thing[i]*multiplier);
            multiplier /= 60;
        }
        frameValue += parseInt(thing[3]);
    return frameValue;
}
