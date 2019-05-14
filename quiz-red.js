//Acess JSON - https://api.myjson.com/bins/mxy0i
var quizData = null;
var jqxhr = $.getJSON("https://api.myjson.com/bins/mxy0i", function(result){
  quizData = result.quizzes;
})
var trackQuiz = 0;
var trackQuestion = 0;
var score = 0;

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
})

$('.answers').on('click', function(){
  var resp = $(this).attr('id');
  if(quizData[trackQuiz].questions[trackQuestion].answers[resp].value){
    $(this).addClass('correct');
    score++
    trackQuestion++;
    loadQuestion();
  } else {
    $(this).addClass('wrong');
    trackQuestion++;
    loadQuestion();
  }
})

//Funtions
function loadQuestion(){
  $('#question').text(quizData[trackQuiz].questions[trackQuestion].question);
  for(var i = 0; i < quizData[trackQuiz].questions[trackQuestion].answers.length ; i++){
    $('#'+i).text(quizData[trackQuiz].questions[trackQuestion].answers[i].content);
  }
}
