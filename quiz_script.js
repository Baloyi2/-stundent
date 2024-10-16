let currentQuestionIndex = 0;
let score = 0;
let totalQuestions; 
const quizData = [];

// Show question count input after selecting level
function showQuestionCount() {
    const levelSelection = document.querySelector('.level-selection');
    const startSection = document.getElementById('start');
    levelSelection.style.display = 'none'; // Hide level selection
    startSection.style.display = 'block'; // Show question count input
}

// Start the quiz
function startQuiz() {
    const input = document.getElementById('numQuestions').value;
    const selectedLevel = document.getElementById('quizLevel').value; 
    totalQuestions = parseInt(input);

    if (isNaN(totalQuestions) || totalQuestions < 4 || totalQuestions > 25) {
        alert("Please enter a number between 4 and 25.");
        return;
    }

    // Hide the start section and input elements
    document.getElementById('start').style.display = 'none'; 

    // Generate questions and display the first question
    generateRandomQuestions(selectedLevel); 
}

// Generate random questions based on the selected level
function generateRandomQuestions(level) {
    quizData.length = 0; 

    for (let i = 0; i < totalQuestions; i++) {
        let range = level === 'basic' ? 50 : level === 'intermediate' ? 100 : 176;
        const num1 = Math.floor(Math.random() * range);
        const num2 = Math.floor(Math.random() * range);
        const operators = ['+', '-', '*', '/'];
        const operator = operators[Math.floor(Math.random() * operators.length)];

        let correctAnswer = calculateAnswer(num1, num2, operator);
        const answers = generateAnswerOptions(correctAnswer);
        
        quizData.push({
            question: `What is ${num1} ${operator} ${num2}?`,
            answers: answers,
            correct: answers.indexOf(correctAnswer)
        });
    }

    loadQuestion(); 
}

// Function to calculate the answer based on operator
function calculateAnswer(num1, num2, operator) {
    let result;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : num1; // Avoid division by zero
            break;
        default:
            return "0"; // Default case
    }

    // Format result to decimal only if necessary
    return result % 1 === 0 ? result.toString() : result.toFixed(2); // Return as string for consistency
}

// Generate answer options
function generateAnswerOptions(correctAnswer) {
    const answers = new Set();
    answers.add(correctAnswer);

    // Generate one incorrect answer based on the type of the correct answer
    if (correctAnswer.includes('.')) {
        const incorrectAnswer = (parseFloat(correctAnswer) + (Math.random() * 5)).toFixed(2);
        answers.add(incorrectAnswer);
    } else {
        const incorrectAnswer = parseInt(correctAnswer) + Math.floor(Math.random() * 3) + 1;
        answers.add(incorrectAnswer.toString());
    }

    // Generate other incorrect answers (decimal numbers)
    while (answers.size < 4) {
        const randomAnswer = (Math.random() * 176).toFixed(2); // Random decimal number
        if (randomAnswer !== correctAnswer) {
            answers.add(randomAnswer);
        }
    }

    return Array.from(answers).sort(() => Math.random() - 0.5); // Shuffle the answers
}

// Load the current question
function loadQuestion() {
    const quizContainer = document.getElementById('quiz');
    const questionData = quizData[currentQuestionIndex];

    quizContainer.innerHTML = `
        <div class="question">${questionData.question}</div>
        ${questionData.answers.map((answer, index) => `
            <div class="answer" onclick="selectAnswer(${index}, this)">
                <span>${answer}</span>
            </div>
        `).join('')}
    `;
    quizContainer.style.display = 'block';
    document.getElementById('feedback').style.display = 'none'; 
}

// Select an answer
function selectAnswer(selectedIndex, element) {
    const questionData = quizData[currentQuestionIndex];
    const correctIndex = questionData.correct;

    if (selectedIndex === correctIndex) {
        score++;
        element.classList.add('correct');
        document.getElementById('feedback').innerText = 'Correct!';
    } else {
        element.classList.add('incorrect');
        document.querySelectorAll('.answer')[correctIndex].classList.add('correct');
        document.getElementById('feedback').innerText = `Incorrect! The correct answer was: ${questionData.answers[correctIndex]}`;
    }

    // Disable further clicking and show feedback
    document.querySelectorAll('.answer').forEach(answer => answer.onclick = null);
    document.getElementById('feedback').style.display = 'block';

    // Move to the next question after a delay
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        setTimeout(() => {
            document.getElementById('feedback').style.display = 'none';
            loadQuestion();
        }, 2000); // 2 seconds delay
    } else {
        setTimeout(showScore, 2000); // Show score after the last question
    }
}

// Show the final score
function showScore() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('feedback').style.display = 'none';
    
    const scorePercentage = (score / totalQuestions) * 100;
    let formattedScorePercentage = scorePercentage % 1 === 0 ? Math.round(scorePercentage) : scorePercentage.toFixed(2);

    document.getElementById('score').innerHTML = `
        <img id="resultImage" src="hund.png" alt="Quiz Result" style="width: 100%; max-width: 300px;">
        Your score: ${score} out of ${totalQuestions} (${formattedScorePercentage}%)
    `;
    
    document.getElementById('score').style.display = 'block';
    document.getElementById('restartButton').style.display = 'block';
    document.getElementById('continueButton').style.display = 'block';
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('quiz').style.display = 'none'; // Hide the quiz
    document.getElementById('start').style.display = 'block'; // Show question count input
}

// Continue to level selection
function goToGrades() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('quiz').style.display = 'none'; // Hide the quiz
    document.querySelector('.level-selection').style.display = 'flex'; // Show level selection
}

// Open settings
function openSettings() {
    // Placeholder for settings functionality
    alert('Settings opened!'); // Replace with actual settings panel
}

// Placeholder function for back button
function goToUserHome() {
    alert('Returning to user home.');
}
