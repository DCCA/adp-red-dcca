//Acess JSON - https://api.myjson.com/bins/mxy0i
var quizData = null;
var jqxhr = $.getJSON("https://api.myjson.com/bins/mxy0i", function(result){
  quizData = result.quizzes;
})

//Listenner
$('.quiz').on('click', function(){
  $('#home').addClass('hide');
  $('#quiz').removeClass('hide');
  if($(this).attr('id') === 'q1'){
    $('#question').text(quizData[0].questions[0].question);
  } else{
    $('#question').text(quizData[1].questions[0].question)
  }
})

$('.answers').on('click', function(){
  $('#quiz').addClass('hide');
  $('#result').removeClass('hide');
})
