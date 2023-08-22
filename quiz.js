// Changes Made:
//  display:none moved to css file
//  #playButton[disabled]:hover changed to #playButton:disabled:hover
//  Home button, questions and choices styled to make them visible in dark background
//  next button disabled until user selects a radio button
//  showQuestion() broken down into displayQuestion() & trackQuestion()

const nameForm = document.getElementById("nameForm");
const fNameInput = document.getElementById("fname");
const lNameInput = document.getElementById("lname");
const playButton = document.getElementById("playButton");
const questionsPage = document.querySelector(".questions-page");
const questionElement = document.getElementById("questions");
const choicesElement = document.getElementById("choices");
const nextButton = document.getElementById("nextButton");
const lastPage = document.querySelector(".last-page");
const resultsTable = document.getElementById("resultTable");
const homeButton = document.getElementById("homeButton");

let currentQuestionsIndex = 0;
let playerName = "";
let totalPoints = 0;
let selectedChoiceIndex = null; // Variable to store the index of the selected choice


// Quiz data in JSON format
const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Berlin", "Madrid", "Paris"],
        correctAnswer: 3,
        points: 2
    },
    {
        question: "Which is the largest planet in our solar system?",
        choices: ["Venus", "Jupiter", "Saturn", "Mars"],
        correctAnswer: 1,
        points: 1
    },
    {
        question: "What is the symbol for Iron in the periodic table?",
        choices: ["Fe", "Ir", "In", "I"],
        correctAnswer: 0,
        points: 3
    }
];

// event listener for first name input
fNameInput.addEventListener("input", () => {
    playButton.disabled = fNameInput.value.trim() === ""; // play button enabled if first or last name entered
});

// event listener for last name input
lNameInput.addEventListener("input", () => {
    playButton.disabled = lNameInput.value.trim() === ""; // play button enabled if first or last name entered
});

// event listener for play button on home screen
// also shows the first question
playButton.addEventListener("click", (event) => {
    event.preventDefault();
    playerName = fNameInput.value.trim() + " " + lNameInput.value.trim();
    showQuestion();
});


// event listener for home button
homeButton.addEventListener("click", (event) => {

    event.preventDefault();

    fNameInput.value = "";
    lNameInput.value = "";
    playerName = "";
    currentQuestionsIndex = 0;
    totalPoints = 0;
    playButton.disabled = true;
    showMainScreen();
})

// function to show the main screen
function showMainScreen() {
    nameForm.style.display = "block";
    questionsPage.style.display = "none";
    lastPage.style.display = "none";
}

// function to show question and take user selection for choices
function showQuestion() {
    if (currentQuestionsIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionsIndex];
        nextButton.disabled = true; // nextButton is disabled for the next question
        
        displayQuestion(currentQuestion);
        trackChoice();
        
    } else {
        showLastScreen();
    }
}

// function to display the actual question
function displayQuestion(question) {
    questionElement.textContent = question.question;
    const correctAnswerIndex = question.correctAnswer;
    choicesElement.innerHTML = "";

    nameForm.style.display = "none";
    questionsPage.style.display = "block";
    lastPage.style.display = "none";

    // Display answer choices
    for (let i = 0; i < question.choices.length; i++) {
        const choice = question.choices[i];
        choicesElement.innerHTML += `
            <label>
                <input type="radio" name="choice" value="${choice}" data-index="${i}">
                ${choice}
            </label>
            <br>`;
    }
}

// function to track user selection
function trackChoice() {
    const radioButtons = document.querySelectorAll('input[name="choice"]');
    radioButtons.forEach((radio) => {
        radio.addEventListener("click", () => {
            selectedChoiceIndex = parseInt(radio.getAttribute("data-index"));
            nextButton.disabled = false;    // nextButton is enabled once the user selects an option
        });
    });
}

// event listener for next button
nextButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (selectedChoiceIndex !== null) {
        const currentQuestion = quizData[currentQuestionsIndex];
        const correctAnswerIndex = currentQuestion.correctAnswer;

        // Check if the selected choice is correct and update total points
        if (selectedChoiceIndex === correctAnswerIndex) {
            totalPoints += currentQuestion.points;
        }

        // Move to the next question
        currentQuestionsIndex++;
        selectedChoiceIndex = null; // Reset the selected choice index for the next question

        showQuestion();
    }
});

//  function to show the last screen
function showLastScreen() {

    nameForm.style.display = "none";
    questionsPage.style.display = "none";
    lastPage.style.display = "block";

    resultsTable.innerHTML = `
        <table>
            <tr>
                <th>Name</th>
                <th>Points</th>
            </tr>
            <tr>
                <td>${playerName}</td>
                <td>${totalPoints}</td>
            </tr>
        </table>`;
}