//Acess JSON - https://api.myjson.com/bins/mxy0i
var quizData = null,
    jqxhr = $.getJSON("https://api.myjson.com/bins/mxy0i", function(result){
  quizData = result.quizzes;
}),
    trackQuiz = 0,
    trackQuestion = 0,
    score = 0,
    visScore = 0;

//Listenner
$('.quiz').on('click', function(){
  $('#home').addClass('hide');
  $('#quiz').removeClass('hide');
  if($(this).attr('id') === 'q1'){
    trackQuiz = 0;
    loadQuestion();
  } else{
    trackQuiz = 1;
    loadQuestion();
  }
});

$('.answers').on('click', function(){
  var resp = $(this).attr('id');
  if(trackQuestion != 2){
    var t = this;
    checkingAnswer(this, resp);
    setTimeout(function(){
      loadQuestion();
      $(t).removeClass('btn-success');
      $(t).removeClass('btn-danger');
    },2000);
  } else{
      checkingAnswer(this, resp);
      setTimeout(function(){
        resultPage();
      },2000);
  }})

//Funtions
function resultPage(){
  $('#quiz').addClass('hide');
  $('#result').removeClass('hide');
  if(visScore > 0.5){
    $('.message').text('Passou!');
  } else{
    $('.message').text('Bombou!');
  }
}

function checkingAnswer(a, b){
  if(quizData[trackQuiz].questions[trackQuestion].answers[b].value){
    $(a).addClass('btn-success');
    alert('Correct!');
    score++
    visScore = score/3;
    $('.score').text(visScore);
    trackQuestion++;
  } else {
    $(a).addClass('btn-danger');
    alert('Wrong!');
    trackQuestion++;
  }
  }

function loadQuestion(){
  $('#question').text(quizData[trackQuiz].questions[trackQuestion].question);
  for(var i = 0; i < quizData[trackQuiz].questions[trackQuestion].answers.length ; i++){
    $('#'+i).text(quizData[trackQuiz].questions[trackQuestion].answers[i].content);
  }
}
