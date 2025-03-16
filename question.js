// Sample Questions
const questions = [
    {
        question: "What is the primary function of the heart?",
        options: ["Pump blood", "Digest food", "Filter air", "Produce hormones"],
        correctAnswer: "Pump blood",
    },
    {
        question: "Which vitamin is produced by the skin when exposed to sunlight?",
        options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
        correctAnswer: "Vitamin D",
    },
    {
        question: "What is the normal range for blood pressure in adults?",
        options: ["90/60 mmHg", "120/80 mmHg", "140/90 mmHg", "160/100 mmHg"],
        correctAnswer: "120/80 mmHg",
    },
];

let score = 0;

// Display Questions
function displayQuestions() {
    const questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = questions
        .map((question, index) => `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">Question ${index + 1}: ${question.question}</h5>
                    <div class="options">
                        ${question.options
                            .map(
                                (option) => `
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="question${index}" value="${option}">
                                    <label class="form-check-label">${option}</label>
                                </div>
                            `
                            )
                            .join("")}
                    </div>
                    <div class="feedback mt-2"></div>
                </div>
            </div>
        `)
        .join("");
}

// Check Answers
function checkAnswers() {
    const questionContainer = document.getElementById("questionContainer");
    const feedbackElements = questionContainer.querySelectorAll(".feedback");

    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        const feedbackElement = feedbackElements[index];

        if (selectedOption) {
            if (selectedOption.value === question.correctAnswer) {
                feedbackElement.innerHTML = `<i class="bi bi-check-circle-fill text-success"></i> Correct!`;
                score++;
            } else {
                feedbackElement.innerHTML = `<i class="bi bi-x-circle-fill text-danger"></i> Incorrect. The correct answer is: ${question.correctAnswer}`;
            }
        } else {
            feedbackElement.innerHTML = `<i class="bi bi-exclamation-circle-fill text-warning"></i> Please select an answer.`;
        }
    });

    // Update Score
    document.getElementById("score").textContent = score;
}

// Event Listener for Submit Button
document.getElementById("submitButton").addEventListener("click", checkAnswers);

// Display Questions on Page Load
displayQuestions();