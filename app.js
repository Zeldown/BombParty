const url = 'https://raw.githubusercontent.com/Zeldown/BombParty/main/words.json';

let json;
let interval;

let used = [];

fetch(url).then(res => res.json()).then(out => {

    json = out

    console.log("Loaded json with " + json['length'] + " words");

    let selfTurn = document.querySelector('.selfTurn');
    
    
    start(selfTurn.children[0].children[0]);
});

function start(input) {
    interval = setInterval(function() {
        let text = document.querySelector('.syllable').innerHTML;
    
        let foundWord;
        for(let word of json) {
            if(word.label.includes(text) && !used[word.label]) {
                console.log("found word: " + word.label);
                foundWord = word.label;
                break;
            }
        }

        if(foundWord) {
            input.value = foundWord;
            document.body.addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                  event.preventDefault();
                  used[foundWord] = true;
                  clearInterval(interval);
                }
              });
        }else {
            console.log("not found");
            document.body.addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                  event.preventDefault();
                  used[foundWord] = true;
                  clearInterval(interval);
                }
              });
        }
    }, 100);
}
