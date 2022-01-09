let url = 'https://raw.githubusercontent.com/Zeldown/BombParty/main/words.json';

let json;
let interval;

fetch(url).then(res => res.json()).then(out => {

    json = out

    console.log("Loaded json with " + json['length'] + " words");

    let selfTurn = document.querySelector('.selfTurn');

    let stopButton = document.createElement('button');
    stopButton.innerHTML = "Stop"
    stopButton.onclick = () => {
        if(interval) {
            clearInterval(interval);
            stopButton.innerHTML = "Start";
            interval = null;
        }else {
            start(selfTurn.children[0].children[0]);
            stopButton.innerHTML = "Stop";
        }
    }

    selfTurn.appendChild(stopButton);
    
    start(selfTurn.children[0].children[0]);
});

function start(input) {
    interval = setInterval(function() {
        let text = document.querySelector('.syllable').innerHTML;
    
        let foundWord;
        for(let word of json) {
            if(word.label.includes(text)) {
                console.log("found word: " + word.label);
                foundWord = word.label;
                break;
            }
        }

        if(foundWord) {
            input.value = foundWord;
            
            let evt = new CustomEvent('keyup');
            evt.which = 13;
            evt.keyCode = 13;
            input.dispatchEvent(evt);
        }else {
            console.log("not found");
        }
    }, 1000);
}
