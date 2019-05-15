//Vars
var quizData = null,
    trackQuiz = 0,
    trackQuestion = 0,
    score = 0,
    visScore = 0;

//Getting JSON
let req = new XMLHttpRequest();

req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
        quizData = JSON.parse(req.responseText);
        quizData = quizData.quizzes;
    }
};

req.open("GET", "https://api.jsonbin.io/b/5cdc4dda838e9b0c10ba0dd0", true);
req.setRequestHeader("secret-key", "$2a$10$DLfcuUdKcW6IzR.LwyM.UeBiA6m9fMYTmORO/gQAPwJ8jxVHwLDRC");
req.send();

//Listenner
$('.quiz').on('click', function() {
    $('#home').addClass('hide');
    $('#quiz').removeClass('hide');
    if ($(this).attr('id') === 'q1') {
        trackQuiz = 0;
        loadQuestion();
    } else {
        trackQuiz = 1;
        loadQuestion();
    }
});

$('.answers').on('click', function() {
    var resp = $(this).attr('id');
    if (trackQuestion != 2) {
        var t = this;
        checkingAnswer(this, resp);
        $('button').addClass('disabled');
        setTimeout(function() {
            loadQuestion();
            $(t).removeClass('btn-success');
            $(t).removeClass('btn-danger');
            $('button').removeClass('disabled');
        }, 2000);
    } else {
        checkingAnswer(this, resp);
        $('button').addClass('disabled');
        setTimeout(function() {
            resultPage();
        }, 2000);
    }
})

//Funtions
function resultPage() {
    $('#quiz').addClass('hide');
    $('#result').removeClass('hide');
    if (visScore > 50) {
        $('.message').text('passed!');
    } else {
        $('.message').text('failed!');
    }
}

function checkingAnswer(a, b) {
    if (quizData[trackQuiz].questions[trackQuestion].answers[b].value) {
        $(a).addClass('btn-success');
        alert('You got the correct answer!');
        score++
        visScore = Math.round((score / 3) * 100);
        $('.score').text(visScore);
        trackQuestion++;
    } else {
        $(a).addClass('btn-danger');
        alert('You got the wrong answer!');
        trackQuestion++;
    }
}

function loadQuestion() {
    $('#question').text(quizData[trackQuiz].questions[trackQuestion].question);
    for (let i = 0; i < quizData[trackQuiz].questions[trackQuestion].answers.length; i++) {
        $('#' + i).text(quizData[trackQuiz].questions[trackQuestion].answers[i].content);
        $('.trackQ').text(trackQuestion + 1);
    }
}
