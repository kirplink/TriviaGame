var fixedQuestionBank = [
    {
        question: "This is a test question",
        correctAnswer: `<span class="answer-choice" id="correct-answer">this is the correct answer.</span>`,
        wrongAnswer1: `<span class="answer-choice">this is wrong answer one.</span>`,
        wrongAnswer2: `<span class="answer-choice">this is wrong answer two.</span>`,
        wrongAnswer3: `<span class="answer-choice">this is wrong answer three.</span>`,
        correctAnswerText: `<p>this is the correct answer.</p>`
    },
    {
        question: "This is another test question",
        correctAnswer: `<span class="answer-choice" id="correct-answer">this is the correct answer.</span>`,
        wrongAnswer1: `<span class="answer-choice">this is wrong answer one.</span>`,
        wrongAnswer2: `<span class="answer-choice">this is wrong answer two.</span>`,
        wrongAnswer3: `<span class="answer-choice">this is wrong answer three.</span>`,
        correctAnswerText: `<p>this is the correct answer.</p>`
    },
    {
        question: "This is test question number three",
        correctAnswer: `<span class="answer-choice" id="correct-answer">this is the correct answer.</span>`,
        wrongAnswer1: `<span class="answer-choice">this is wrong answer one.</span>`,
        wrongAnswer2: `<span class="answer-choice">this is wrong answer two.</span>`,
        wrongAnswer3: `<span class="answer-choice">this is wrong answer three.</span>`,
        correctAnswerText: `<p>this is the correct answer.</p>`
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
    function frame() {
        if (width >= 99) {
            elem.style.width = '100%';
            clearInterval(timeBarIntervalId);
        } else {
            width += .0333; 
            elem.style.width = width + '%'; 
        }
    }
}


