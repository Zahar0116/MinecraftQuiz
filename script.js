document.addEventListener('DOMContentLoaded', () => {

    const questions = [
    {
        text: "Який блок потрібен для створення порталу в Незер?",
        answers: ["Камінь", "Обсидіан", "Глибокий сланець", "Бедрок"],
        correct: 1
    },
    {
        text: "Скільки алмазів потрібно для алмазної кирки?",
        answers: ["2", "3", "4", "5"],
        correct: 1
    },
    {
        text: "Який моб вибухає біля гравця?",
        answers: ["Зомбі", "Скелет", "Кріпер", "Павук"],
        correct: 2
    },
    {
        text: "Чим приручають вовка?",
        answers: ["Рибою", "Кісткою", "Пшеницею", "Морквою"],
        correct: 1
    },
    {
        text: "Який вимір є домом для Ендер-дракона?",
        answers: ["Незер", "Верхній світ", "Енд", "Печери"],
        correct: 2
    },
    {
        text: "Яка руда дає червоний пил?",
        answers: ["Залізна руда", "Золота руда", "Редстоунова руда", "Мідна руда"],
        correct: 2
    },
    {
        text: "Що потрібно для створення факела?",
        answers: ["Вугілля і палиця", "Камінь і палиця", "Вугілля і дошки", "Кремінь і палиця"],
        correct: 0
    },
    {
        text: "Яка істота торгує з гравцем?",
        answers: ["Вілладжер", "Кріпер", "Слизень", "Гаст"],
        correct: 0
    },
    {
        text: "Скільки блоків має сторона стандартного чанка?",
        answers: ["8", "16", "32", "64"],
        correct: 1
    },
    {
        text: "Який предмет потрібен для активації порталу в Енд?",
        answers: ["Око Краю", "Перлина Краю", "Зірка Незеру", "Тотем безсмертя"],
        correct: 0
    }
];

   const audio = document.querySelector("#clickAudio")

    const scoreDisplay = document.querySelector("#score-display")
    const questionText = document.querySelector("#question-text");
    const answerContainer = document.querySelector("#answers-container");
    const startScreen = document.querySelector("#start-screen");
    const quizScreen = document.querySelector("#quiz-screen");
    const resultScreen = document.querySelector("#result-screen");
    const startBtn = document.querySelector("#start-btn");
    const restartBtn = document.querySelector("#restart-btn");
    const timerDisplay = document.querySelector("#timer");
    let questionIndex = 0;
    let score = 0;
    let timer = 15;
    let interval;
    function showQuestion(question) {
        answerContainer.innerHTML = '';
        questionText.textContent = question.text;
        for(let i = 0; i < 4; i++) {
            let btn = document.createElement('button')
            btn.classList.add("answer-btn");
            btn.textContent = question.answers[i];
            btn.onclick = () => checkAnswer(btn, i);
            answerContainer.appendChild(btn);
        }
    }

    function checkAnswer(button, answerIndex) {
	audio.currentTime = 0; 
	audio.play();
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        });
        clearInterval(interval);
        if(questions[questionIndex].correct === answerIndex) {
            button.classList.add("correct");
            score += parseInt(timer/15*100);
        } else {
            button.classList.add("wrong");
        }
        setTimeout(nextQuestion, 1000);
        scoreDisplay.textContent = `бали : ${score}`
    }
    
    function nextQuestion() {
        questionIndex++;
        if(questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
            startTimer();
        } else {
            showResult();
        }
    }

    function showResult() {
        quizScreen.classList.add("hide");
        resultScreen.classList.remove("hide");
        let accuracy = Math.round(score / questions.length);
        document.querySelector('#result-text').textContent =
            `Твій результат: ${score} з ${questions.length * 100} | ${accuracy}%`;
    }

    function startGame() {
        startScreen.classList.add("hide");
        resultScreen.classList.add("hide");
        quizScreen.classList.remove("hide");
        questionIndex = 0;
        score = 0;
        showQuestion(questions[0]);
        startTimer();
        scoreDisplay.textContent = `бали : ${score}`
	audio.currentTime = 0; 
	audio.play();
    }

    function startTimer() {
        clearInterval(interval);
        timer = 15;
        timerDisplay.textContent = `Час: ${timer}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.textContent = `Час: ${timer}`;
            if(timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    startBtn.onclick = startGame;
    restartBtn.onclick = startGame;

});