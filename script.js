// Player registration
document.querySelector('.registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const playerName = document.querySelector('.player-name').value;
    localStorage.setItem('playerName', playerName);
    console.log(`Player name ${playerName} registered`);
    startQuiz();
});

// Quiz questions and answers
const quizQuestions = [
    {
        question: 'What is the most effective way to collect fresh water on a beach?',
        options: ['Dig a hole in the sand above the high tide line', 'Drink seawater', 'Collect rainwater', 'Drink from a stagnant pool'],
        correct: 2
    },
    {
        question: 'What are the key elements of a good survival shelter?',
        options: ['Close to the water', 'On a high, dry area', 'In a dense forest', 'Near a cliff'],
        correct: 1
    },
    {
        question: 'What is the best way to avoid sunburn on a beach?',
        options: ['Stay in the water', 'Apply sunscreen with at least SPF 30', 'Wear dark-colored clothing', 'Use a towel as a cover'],
        correct: 1
    },
    {
        question: 'How can you identify a rip current in the ocean?',
        options: ['Smooth water with few waves', 'Water that is unusually warm', 'Choppy, discolored water moving away from shore', 'Clear blue water'],
        correct: 2
    },
    {
        question: 'What should you do if you get caught in a rip current?',
        options: ['Swim directly back to shore', 'Swim parallel to the shore', 'Float and wave for help', 'Dive underwater and swim straight down'],
        correct: 1
    },
    {
        question: 'What is a good source of food on a beach if you are stranded?',
        options: ['Seaweed and shellfish', 'Dead fish found on the shore', 'Seagulls', 'Coconuts from palm trees'],
        correct: 0
    },
    {
        question: 'Which method is best for signaling for help on a beach?',
        options: ['Writing SOS in the sand', 'Shouting loudly', 'Using a mirror to reflect sunlight', 'Building a large fire'],
        correct: 2
    },
    {
        question: 'What is the primary danger of drinking seawater?',
        options: ['It causes dehydration', 'It contains harmful bacteria', 'It tastes bad', 'It is too cold to drink'],
        correct: 0
    },
    {
        question: 'What should you do to treat a jellyfish sting?',
        options: ['Rub sand on it', 'Apply vinegar', 'Rinse with freshwater', 'Cover with a bandage'],
        correct: 1
    },
    {
        question: 'What is the best way to keep warm if you are stranded overnight on a beach?',
        options: ['Stay in the water', 'Build a fire using driftwood', 'Cover yourself with wet seaweed', 'Sleep directly on the sand'],
        correct: 1
    },
    {
        question: 'What is the best way to purify water if you are stranded on a beach?',
        options: ['Drink it directly from a stream', 'Use a plastic bottle to create a solar still', 'Boil seawater', 'Drink rainwater only'],
        correct: 1
    },
    {
        question: 'How can you avoid dehydration on a beach?',
        options: ['Drink lots of coffee', 'Stay in the shade and drink freshwater', 'Swim frequently', 'Eat salty snacks'],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

function startQuiz() {
    document.querySelector('.home').style.display = 'none';
    document.querySelector('.quiz').style.display = 'block';
    console.log('Quiz started');
    showQuestion();
}

function showQuestion() {
    const questionElement = document.querySelector('.question');
    const optionsElement = document.querySelector('.options');
    questionElement.textContent = quizQuestions[currentQuestion].question;
    optionsElement.innerHTML = '';

    quizQuestions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        optionsElement.appendChild(button);
    });
    document.querySelector('.next-question').style.display = 'none';
    console.log(`Displaying question: ${quizQuestions[currentQuestion].question}`);
}

function selectAnswer(selected) {
    console.log(`Selected answer: ${selected}`);
    if (selected === quizQuestions[currentQuestion].correct) {
        score++;
        console.log('Answer is correct');
    } else {
        console.log('Answer is incorrect');
    }

    // Show the "Next Question" button for the master user to proceed
    document.querySelector('.next-question').style.display = 'block';
}

document.querySelector('.next-question').addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
});

function endQuiz() {
    console.log(`Quiz ended with score: ${score}`);
    document.querySelector('.quiz').style.display = 'none';
    showLeaderboard();
}

function showLeaderboard() {
    const playerName = localStorage.getItem('playerName');
    const leaderboardList = document.querySelector('.leaderboard-list');

    // Fetch existing scores from local storage or initialize an empty array if none exist
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    // Add the current player's score to the scores array
    scores.push({ name: playerName, score: score });
    // Save the updated scores array back to local storage
    localStorage.setItem('scores', JSON.stringify(scores));
    console.log('Scores updated', scores);

    // Sort the scores array in descending order based on the score
    scores.sort((a, b) => b.score - a.score);
    // Clear the leaderboard list element
    leaderboardList.innerHTML = '';
    // Populate the leaderboard list element with sorted scores
    scores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = `${score.name}: ${score.score}`;
        leaderboardList.appendChild(li);
    });

    // Display the leaderboard section
    document.querySelector('.leaderboard').style.display = 'block';
    console.log('Leaderboard displayed');
}