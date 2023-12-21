const passageText = document.getElementById("paragraph");
const typedText = document.getElementById("typedText").value;
const mistakes = document.getElementById("mistakes");


let passage = "Confusion and chaos lifted. All was still and clear in his mind. Only hours earlier he was filled with misery, self-loathing and desperation. But now the lycanthropic curse had taken control, freed from its chains and eager to make up for lost time. Jagged claws easily removed the clothes from his body. He would have no more use for them. He had emerged beside a small, shallow river which was painted silver under the clear sky. It was cold, the dead of winter, and his breath misted before his eyes. The weather did not bother him. This body was made for endurance. His long, wiry limbs held easy strength. He felt a buzzing run through his whole body. An electrically charged energy that needed to be unleashed. His magnified senses announced the presence of all living creatures within running distance. None could defy him, none could oppose him. All would flee before him. But it would make no difference. This night would be coloured in blood. He threw back his head and let out a howl of hysteria, elation and fervour. The night belonged to him. The full moon was risen and the chase was on.";
let correct = 0;
let incorrect = 0;

// defines the passage and input text and splits it into characters.

let arrPassage = passage.split('');
console.log(arrPassage);

let arrTypedText = typedText.split('');
console.log(arrTypedText);


// // Displays the passage on the page.

function changePassage() {
    const element = passageText;
element.innerHTML = passage;
}
changePassage();

// compares the user input and the correct input and iterates itself to the next input


class myClass {
    constructor() {
        this.index = 0;
        this.passage = arrPassage;
        this.arrTypedText = arrTypedText;
        this.timerStarted = false;
        document.getElementById('typedText').addEventListener('input', this.checkArray.bind(this));
    }

    checkArray() {
        const typedText = document.getElementById("typedText").value;
        

        if (!this.timerStarted) {
            startTimer();
            this.timerStarted = true;
        }

        this.arrTypedText = document.getElementById('typedText').value.split('');
        if (this.passage[this.index] === this.arrTypedText[this.index]) {
           
            correct++
            this.index += 1;
            this.updateParagraph();
        } else {
            incorrect++;
            this.index += 1;
            this.updateParagraph();
        }   
    }

// Changes background color depending on if the input is correct or incorrect

    updateParagraph() {
        let html = '';
        for (let i = 0; i < this.passage.length; i++) {
            let spanClass = '';
            if (i < this.index) {
                spanClass = this.passage[i] === this.arrTypedText[i] ? 'correct' : 'incorrect';
            }
            html += `<span class="${spanClass}">${this.passage[i]}</span>`;
        }
        passageText.innerHTML = html;
    }
}

const instance = new myClass();


// // logging correct and incorrect inputs

// document.addEventListener("keydown", function () {
//     console.log("correct", correct);
//     console.log("incorrect", incorrect);
//   });

// counts the amount of words that are completed in a 60s interval

let spaceCount = 1;
let timeLimit = 60;
let timer;

//displays WPM, time, mistakes, and accuracy.

function updateCount() {
    const wordCountParagraph = document.getElementById('wpm');
    wordCountParagraph.textContent = `Wpm: ${spaceCount}`;

    const timeCount = document.getElementById('timer');
        timeCount.textContent =  `${timeLimit}` + 's';

    const mistakeCount = document.getElementById('mistakes');
        mistakeCount.textContent = "Mistakes: " + `${incorrect}`;

    const accuracyCount = document.getElementById('accuracy');
        accuracyCount.textContent = "accuracy:" + ((correct / (incorrect + correct) * 100) + '%');
}

// logic of the timer and what happens when the timer runs out of time.
function timerLogic() {
    updateCount();
        if (timeLimit === 0) {
            clearInterval(timer);       
            document.getElementById('typedText').readOnly=true;
            console.log('time limit reached');
        } else {
            timeLimit--;
        }
    }
    

document.getElementById('typedText').addEventListener('input', startTimer);


 //Starts the timer if it has not already been started

function startTimer() {
    if (!timer) {
    timer = setInterval(timerLogic, 1000);
    console.log(timeLimit);
    }
}

// counts words by how many times the space bar is pressed.

 document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key === ' ') {
      spaceCount++;
      updateCount();
    }
  });



  