const BOX_W = 40;
const BOX_G = 40;

var container;
var disposedText;
var blinkingInterval;
var letterSeek;
var started = false;
var mainDiv;
var startButton;

function init(){
    container = document.getElementById('text-container')
    mainDiv = document.getElementById('main-div');
    startButton = document.getElementById('start-button');
}

function disposeText(){
    clearDisposedText();
    const text = getText();
    disposedText = [];
    text.split('').forEach(c => {
        boxId = createLetterBox(c);
        disposedText.push({id: boxId, letter: c});
    });
    letterSeek = 0;
}

function disposeTextBreakingWords(){
    
}

function createLetterBox(letter){
    
    const box = document.createElement('div');
    box.classList.add('letter-box');
    box.innerHTML = letter;
    box.id = `letter-${disposedText.length}`
    
    if(letter === ' '){
        box.classList.add('space');
    }

    container.appendChild(box);

    return box.id;
}

function getText(){
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor sodales neque, eget ullamcorper mi egestas quis. In blandit porta cursus. Duis efficitur luctus sagittis. Morbi facilisis, nunc id egestas sagittis, nulla dui dictum purus, eu sodales arcu nisl vel augue. Nunc accumsan mi enim, sed malesuada tortor viverra quis. Quisque tempus mauris eu est vulputate lacinia. Phasellus id felis faucibus sem interdum tincidunt. Sed luctus felis arcu, at aliquet velit fermentum ac. In ut neque eu risus pulvinar elementum quis non nisi. Phasellus accumsan nisi massa, et rutrum libero condimentum ultrices. Ut at eros facilisis, maximus orci eget, viverra ligula. Praesent cursus pharetra metus sodales placerat. Fusce facilisis, mauris ac pulvinar suscipit, justo tellus vulputate ipsum, sit amet placerat tortor nibh id quam. Phasellus non purus risus.

    Nam ac lacinia lacus. Proin tellus quam, euismod a mattis at, semper vel lorem. Proin dictum, quam vitae vehicula tincidunt, arcu augue suscipit ipsum, eu sollicitudin arcu erat a tortor. Integer eu maximus sem. Duis tempus pharetra est id dignissim. Sed justo sem, pulvinar at augue a, commodo dignissim nibh. Suspendisse potenti. Duis at ex lorem. Donec vehicula interdum aliquam. Suspendisse potenti. Cras turpis erat, venenatis sit amet ultricies ac, pulvinar vel mauris. Phasellus at lorem leo.
    
    In lobortis odio eu mi egestas, eget ornare risus interdum. Vivamus vulputate metus vitae lectus eleifend venenatis. Proin ullamcorper semper massa a faucibus. In in elementum neque, vitae gravida turpis. Morbi ut rutrum ligula, sit amet laoreet ipsum. Vivamus nec odio aliquam, commodo nibh vel, convallis dui. Duis nunc ante, vulputate vitae sapien quis, ultrices vestibulum dolor. Fusce pretium mauris luctus dapibus commodo. Nam id aliquam leo. In nec magna sit amet ex efficitur hendrerit at nec dolor. Vivamus nec sagittis elit. Suspendisse ut arcu sed ex sollicitudin maximus ac non ex. Morbi sit amet`;
}

function markLetterBox(letterBoxId, correct){
    document.getElementById(letterBoxId).classList.add(correct ? 'correct' : 'incorrect');
    document.getElementById(letterBoxId).classList.remove(correct ? 'incorrect' : 'correct');
}

function clearDisposedText(){
    disposedText?.forEach(c => {
        const child = document.getElementById(c.id);
        container.removeChild(child);
    })
}

function setBlinkBackground(){
    clearBlinkingInterval();
    blinkingInterval = setInterval(() => {
        const selected = document.getElementById(disposedText[letterSeek].id);
        selected.classList.toggle('selected');
    }
    , 500)
}

function clearBlinkingInterval(){
    window.clearInterval(blinkingInterval);
}

function scrollLetterBoxIntoView(){
    document.getElementById(disposedText[letterSeek].id).scrollIntoView(true);
}

function clearBuggedBlinked(){
    var letterBox = container.firstElementChild;
    while(letterBox){
        if(letterBox.id !== disposedText[letterSeek].id){
            letterBox.classList.remove('selected');
        }
        letterBox = letterBox.nextElementSibling;
    }
}

// Listener and click functions

function start(){
    disposeText();
    seyKeydownEventListener();
    setBlinkBackground();
    scrollLetterBoxIntoView();
    mainDiv.removeChild(startButton);

}

function handleKey(event){
    if(event.key == ' ' && event.target == document.body) {
        event.preventDefault();
        console.log(1)
    }
     if(event.key == 'Backspace'){
        letterSeek--;
        console.log(2)

        return;
    }else if(event.key != 'Shift' && event.key !== ' ' && disposedText[letterSeek].letter !== ' ' && (letterSeek <= disposedText.length)){
        if(event.key === disposedText[letterSeek].letter){
            markLetterBox(disposedText[letterSeek].id, true);
            letterSeek++;
            console.log(3)

            return;
        }else{
            markLetterBox(disposedText[letterSeek].id, false)
            letterSeek++;
            console.log(4)

            return;
        }
        
    }else if(event.key === ' ' && disposedText[letterSeek].letter === ' '){
        letterSeek++;
        console.log(1)

        return;
    }
}

keyDownEventListener = (event) => {
    handleKey(event);
    if(letterSeek >= disposedText.length){
        clearBlinkingInterval();
    }
    scrollLetterBoxIntoView();
    clearBuggedBlinked();
}

function seyKeydownEventListener(){
    document.removeEventListener('keydown', keyDownEventListener);
    document.addEventListener('keydown', keyDownEventListener);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
})
