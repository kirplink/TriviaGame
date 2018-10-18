var fixedQuestionBank = [
    {
        question: "What did the crocodile swallow in Peter Pan?",
        correctAnswer: `<span class="answer-choice" id="correct-answer">An Alarm Clock</span>`,
        wrongAnswer1: `<span class="answer-choice">Silver Spoon</span>`,
        wrongAnswer2: `<span class="answer-choice">Captain Hook's Food</span>`,
        wrongAnswer3: `<span class="answer-choice">A Treasure Map</span>`,
        correctAnswerText: `<p>An Alarm Clock</p>`
    },
    {
        question: "What year did the first World War Start",
        correctAnswer: `<span class="answer-choice" id="correct-answer">1914</span>`,
        wrongAnswer1: `<span class="answer-choice">1921</span>`,
        wrongAnswer2: `<span class="answer-choice">1939</span>`,
        wrongAnswer3: `<span class="answer-choice">1916</span>`,
        correctAnswerText: `<p>1914</p>`
    },
    {
        question: "What does the roman numeral C represent",
        correctAnswer: `<span class="answer-choice" id="correct-answer">100</span>`,
        wrongAnswer1: `<span class="answer-choice">50</span>`,
        wrongAnswer2: `<span class="answer-choice">1000</span>`,
        wrongAnswer3: `<span class="answer-choice">25</span>`,
        correctAnswerText: `<p>100</p>`
    },
    {
        question: "What is the smallest bone in the body?",
        correctAnswer: `<span class="answer-choice" id="correct-answer">The Stapes</span>`,
        wrongAnswer1: `<span class="answer-choice">Femur</span>`,
        wrongAnswer2: `<span class="answer-choice">Malleus</span>`,
        wrongAnswer3: `<span class="answer-choice">Ulna</span>`,
        correctAnswerText: `<p>The Stapes</p>`
    },
    {
        question: "How many dots are on two dice?",
        correctAnswer: `<span class="answer-choice" id="correct-answer">42</span>`,
        wrongAnswer1: `<span class="answer-choice">21</span>`,
        wrongAnswer2: `<span class="answer-choice">44</span>`,
        wrongAnswer3: `<span class="answer-choice">36</span>`,
        correctAnswerText: `<p>42</p>`
    },
    {
        question: "What’s the name of the famous big clock in London?",
        correctAnswer: `<span class="answer-choice" id="correct-answer">Big Ben</span>`,
        wrongAnswer1: `<span class="answer-choice">The Tower</span>`,
        wrongAnswer2: `<span class="answer-choice">Windsor Clock</span>`,
        wrongAnswer3: `<span class="answer-choice">Time's Tower</span>`,
        correctAnswerText: `<p>Big Ben</p>`
    },
    {
        question: "Who painted the Sistine Chapel?",
        correctAnswer: `<span class="answer-choice" id="correct-answer">Michelangelo</span>`,
        wrongAnswer1: `<span class="answer-choice">Leonardo</span>`,
        wrongAnswer2: `<span class="answer-choice">Donatello</span>`,
        wrongAnswer3: `<span class="answer-choice">Raphael</span>`,
        correctAnswerText: `<p>Michelangelo</p>`
    },
    {
        question: "Which is the largest ocean?",
        correctAnswer: `<span class="answer-choice" id="correct-answer">Pacific</span>`,
        wrongAnswer1: `<span class="answer-choice">Atlantic</span>`,
        wrongAnswer2: `<span class="answer-choice">Artic</span>`,
        wrongAnswer3: `<span class="answer-choice">Indian</span>`,
        correctAnswerText: `<p>Pacific</p>`
    },
    {
        question: "How many squares are there on a chess board?",
        correctAnswer: `<span class="answer-choice" id="correct-answer">64</span>`,
        wrongAnswer1: `<span class="answer-choice">81</span>`,
        wrongAnswer2: `<span class="answer-choice">49</span>`,
        wrongAnswer3: `<span class="answer-choice">100</span>`,
        correctAnswerText: `<p>64</p>`
    },
    {
        question: "When was President Kennedy killed?",
        correctAnswer: `<span class="answer-choice" id="correct-answer">1963</span>`,
        wrongAnswer1: `<span class="answer-choice">1959</span>`,
        wrongAnswer2: `<span class="answer-choice">1966</span>`,
        wrongAnswer3: `<span class="answer-choice">1953</span>`,
        correctAnswerText: `<p>1963</p>`
    },

]


var questionBank = [];
var answerOrder = ['correctAnswer', 'wrongAnswer1', 'wrongAnswer2', 'wrongAnswer3'];
var initialTime = 30;
var intervalId;
var timeBarIntervalId;
var wins = 0;
var losses = 0;
//aranges the questions into a random order

function setQuestionBank() {
    for (let val of fixedQuestionBank) {
        questionBank.push(val);
    }
    console.log(questionBank);
    shuffle(questionBank);
}

// displays the question and places the answers in a random order
function setQuestion() {
    
    shuffle(answerOrder);
    // console.log(answerOrder);
    initialTime = 30;
    $('#time-remaing').html(initialTime);
    $('#question').html(questionBank[0].question);
    $('#answers').html('');
    for (let val of answerOrder){
        $('#answers').append(questionBank[0][val]);
       
    }
    startCountDown();
    clearInterval(timeBarIntervalId);
    timeBar();
}

function countDown() {
    if (initialTime === 0) {
        
        $('#myProgress').addClass('display-none');
        clearInterval(intervalId);
        clearInterval(timeBarIntervalId);
        $('#answers').html(`
            <p>Times Up!</p>
            <p>The correct answer was:</p>
            ${questionBank[0].correctAnswerText}
        `)
        losses++;
        displayNewQuestion();

    } else {
        initialTime--;
        $('#time-remaing').html(initialTime); 
    }
    
}

function startCountDown() {
    
    intervalId = setInterval(countDown, 1000)
}

//listens for when the answer choices are clicked
$(document).on('click', '.answer-choice', function() {
    // console.log(this.id);
    if (this.id === 'correct-answer') {
        // console.log('correct answer');
        $('#answers').html(`
            <p>Correct Answer!</p>
        `)
        wins++;
        displayNewQuestion();
        $('#myProgress').addClass('display-none');
        clearInterval(intervalId);
        clearInterval(timeBarIntervalId);
    } else {
        // console.log('wrong answer');
        $('#answers').html(`
            <p>Wrong Answer!</p>
            <p>The correct answer was:</p>
            ${questionBank[0].correctAnswerText}
        `)
        losses++;
        displayNewQuestion();
        $('#myProgress').addClass('display-none');
        clearInterval(intervalId);
        clearInterval(timeBarIntervalId);
    }
    
})

$(document).on('click', '#begin-game', function() {
    
    setQuestionBank();
    setQuestion();
    wins = 0;
    losses = 0;
    $('#begin-game').addClass('display-none');
});

function displayFinalScreen() {
    $('#question').html(`You've answered all the questions, your final score is as follows:`);
    $('#answers').html(`
        <span class="answer-choice">Correct: ${wins}</span>
        <span class="answer-choice">Incorrect: ${losses}</span>
    `);
    $('#begin-game').html('Play Again!').removeClass('display-none');
}

function displayNewQuestion() {
    console.log(questionBank.length);
    if (questionBank.length > 1) {
        questionBank.shift();
        setTimeout(setQuestion, 3000);
    } else {
        questionBank.shift();
        displayFinalScreen();
    }
    
}

//Fisher–Yates Shuffle
function shuffle(array) {
    var m = array.length, t, i;
      
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}


// code adjusted from https://www.w3schools.com/howto/howto_js_progressbar.asp
function timeBar() {
    var elem = document.getElementById("myBar"); 
    var width = 0;
    timeBarIntervalId = setInterval(frame, 10);
    $('#myProgress').removeClass('display-none');
    function frame() {
        if (width >= 99.8) {
            elem.style.width = '100%';
            clearInterval(timeBarIntervalId);
        } else {
            width += .0333; 
            elem.style.width = width + '%'; 
        }
    }
}


