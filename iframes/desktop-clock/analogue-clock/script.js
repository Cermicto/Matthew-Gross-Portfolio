d = document
d.gebi = d.getElementById
d.gebc = d.getElementsByClassName

const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const clock = document.querySelector('.clock');


circleRotatorStarted = false
rotatedDegree = null

timeSpeedIncrement = 0

function setClock() {
    now = new Date();
    minutes = now.getMinutes();
    hours = now.getHours();
    seconds = now.getSeconds();
    // console.log(`hour: ${hours}, minute: ${minutes}, second: ${seconds}`)

    if (!circleRotatorStarted) {
        if (seconds == 0) {
            rotatedDegree = 0
        } else {
            rotatedDegree = seconds * 6
        }
        circleRotatorStarted = true
    }

    if (hours > 12) {
        hours -= 12
    }

    const minutesDegrees = (minutes / 60) * 360;
    const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30;

    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

    if (seconds == 0) {
        d.gebc(`tick0`)[0].classList.add('tick-highlighted')
    } else {
        d.gebc(`tick${seconds}`)[0].classList.add('tick-highlighted')
    }

    if (seconds === 0) {
        window.setTimeout(function() {
            // cleared = clearHighlightedTicks()
            for (var i = 1; i <= 60; i++) {
                document.getElementsByClassName(`tick${i}`)[0].classList.remove('tick-highlighted')
            }

            hUpdated = updateHighlights()
        }, 500)
    }

    setCircleRotation(seconds)

    return true
}

function setCircleRotation(seconds) {
    d.gebi('circleRotator').style.transform = `translateX(-50%) translateY(-50%) rotateZ(${rotatedDegree}deg)`

    if (seconds == 60) {
        rotatedDegree = 0
    } else {
        rotatedDegree = (seconds * 6) + 6
    }


}

function clearHighlightedTicks() {
    highlightedTicks = d.gebc('tick-highlighted')

    for (var i = 0; i < highlightedTicks.length; i++) {
        highlightedTicks[i].classList.remove('tick-highlighted')
    }

    return true
}

function initializeHighlights() {
    now = new Date();
    minute = now.getMinutes();
    hour = now.getHours();

    if (hour > 12) {
        hour -= 12
    }

    if (hour === 0) {
        hour = 12
    }

    hourMarkNumber = d.gebi(`hourMarkNumber${hour}`)
    hourMarkDivider = d.gebi(`hourMark${hour}Divider`)

    hourMarkNumber.classList.add('number-highlighted')
    hourMarkDivider.classList.add('hour-divider-highlighted')

    if (minute % 5 != 0) {
        minuteMarkDivider = d.gebi(`minuteMark${minute}`)
        minuteMarkDivider.classList.add('minute-divider-highlighted')
    } else {
        currentHourMinuteMarkDividerNumber = minute / 5
        currentHourMinuteMarkDivider = d.gebi(`hourMark${currentHourMinuteMarkDividerNumber}Divider`)
        currentHourMinuteMarkDivider.classList.add('minute-divider-highlighted')
    }

    // initialize minute marker
    if (minute == 0) {
        currentHourMinuteMarkDividerNumber = 12
        currentHourMinuteMarkDivider = d.gebi(`hourMark${currentHourMinuteMarkDividerNumber}Divider`)
        currentHourMinuteMarkDivider.classList.add('minute-divider-highlighted')
    } else {
        if (minute % 5 != 0) {
            minuteMarkDivider = d.gebi(`minuteMark${minute}`)
            minuteMarkDivider.classList.add('minute-divider-highlighted')
        } else {
            currentHourMinuteMarkDividerNumber = minute / 5
            currentHourMinuteMarkDivider = d.gebi(`hourMark${currentHourMinuteMarkDividerNumber}Divider`)
            currentHourMinuteMarkDivider.classList.add('minute-divider-highlighted')
        }
    }

    return true
}



function updateHighlights() {
    now = new Date();
    minute = now.getMinutes();
    hour = now.getHours();

    if (hour > 12) {
        hour -= 12
    }

    // set hour
    hourMarkNumber = d.gebi(`hourMarkNumber${hour}`)
    hourMarkDivider = d.gebi(`hourMark${hour}Divider`)

    d.gebc('number-highlighted')[0].classList.remove('number-highlighted')
    hourMarkNumber.classList.add('number-highlighted')

    d.gebc('hour-divider-highlighted')[0].classList.remove('hour-divider-highlighted')
    hourMarkDivider.classList.add('hour-divider-highlighted')

    // set minute

    if (minute == 0) {
        d.gebc('minute-divider-highlighted')[0].classList.remove('minute-divider-highlighted')
        currentHourMinuteMarkDividerNumber = 12
        currentHourMinuteMarkDivider = d.gebi(`hourMark${currentHourMinuteMarkDividerNumber}Divider`)
        currentHourMinuteMarkDivider.classList.add('minute-divider-highlighted')
    } else {
        if (minute % 5 != 0) {
            d.gebc('minute-divider-highlighted')[0].classList.remove('minute-divider-highlighted')
            minuteMarkDivider = d.gebi(`minuteMark${minute}`)
            minuteMarkDivider.classList.add('minute-divider-highlighted')
        } else {
            d.gebc('minute-divider-highlighted')[0].classList.remove('minute-divider-highlighted')
            currentHourMinuteMarkDividerNumber = minute / 5
            currentHourMinuteMarkDivider = d.gebi(`hourMark${currentHourMinuteMarkDividerNumber}Divider`)
            currentHourMinuteMarkDivider.classList.add('minute-divider-highlighted')
        }
    }

    return true
}

function createMinuteMarks() {
    for (let i = 1; i <= 60; i++) {
        if (i == 60) {
            var hourMark = document.createElement('div');
            hourMark.classList.add('hour-mark');
            var angle = 0;
            hourMark.innerHTML = `<div id="hourMarkNumberBox${(i / 5)}" class="hour-mark-number-box">
                    <span id="hourMarkNumber${(i / 5)}" class="hour-mark-number" style="transform: rotateZ(${angle * -1}deg)">${i / 5}</span>
                </div>
                <br>
                <span id="hourMark${i / 5}Divider" class="hour-mark-divider tick tick0">|</span>`;
            hourMark.style.transform = `translate(-50%, -50%) rotateZ(${angle}deg) translateY(-105px)`;
            clock.appendChild(hourMark);
        } else if (i % 5 != 0) {
            var minuteMark = document.createElement('div');
            minuteMark.className = `minute-mark tick tick${i}`
            minuteMark.id = "minuteMark" + i
            minuteMark.textContent = "|";
            var angle = (i / 60) * 360;
            minuteMark.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-90px)`;
            clock.appendChild(minuteMark);
        } else {
            var hourMark = document.createElement('div');
            hourMark.classList.add('hour-mark');
            var angle = (i / 60) * 360;
            hourMark.innerHTML = `<div id="hourMarkNumberBox${(i / 5)}" class="hour-mark-number-box">
                    <span id="hourMarkNumber${(i / 5)}" class="hour-mark-number" style="transform: rotateZ(${angle * -1}deg)">${i / 5}</span>
                </div>
                <br>
                <span id="hourMark${i / 5}Divider" class="hour-mark-divider tick tick${i}">|</span>`;
            hourMark.style.transform = `translate(-50%, -50%) rotateZ(${angle}deg) translateY(-105px)`;
            clock.appendChild(hourMark);
        }
    }

    return true
}

function initializeTicks() {
    now = new Date();
    seconds = now.getSeconds();

    for (var i = 1; i <= seconds; i++) {

        d.gebc(`tick${i}`)[0].classList.add('tick-highlighted')
    }

    return true
}


mmCreated = createMinuteMarks();
hInited = initializeHighlights()
tInited = initializeTicks()
clockIsSet = setClock();

setInterval(function() {
    clockSet = setClock()
}, 1000);

function resizeClock() {
    windowHeight = window.innerHeight
    windowWidth = window.innerWidth

    // get scale ratio of clock size to 90% of most narrow height or width
    if (windowWidth > windowHeight) { // get scale ratio of clock size to 90% of windowHeight
        clockRatioToArea = (windowHeight / 300) * .9
    } else { // get scale ratio of clock size to 90% of windowWidth
        clockRatioToArea = (windowWidth / 300) * .9
    }

    // scale clock
    d.gebi('clock').style.transform = `scale(${clockRatioToArea},${clockRatioToArea})`
}

window.onresize = function() {
    resizeClock()
}

resizeClock()

// refresh page on return to tab

var vis = (function() {
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();

var visible = vis(); // gives current state

vis(reloadPage); // registers a handler for visibility changes`

// vis(function(){
//     document.title = vis() ? 'Visible' : 'Not visible';
// });

function reloadPage() {
    location.reload();
}