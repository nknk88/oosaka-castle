var questions = [
  {'question': '大阪城を建てた人物は？', 'answers': ['豊臣秀吉', '大阪府', '西郷隆盛', '杉田玄白']},
  {'question': '大阪城が建てられたのはいつ？', 'answers': ['1626年', '1603年', '1612年', '1591年']},
  {'question': '大阪城の高さは？', 'answers': ['58ｍ', '74ｍ', '46ｍ', '99ｍ']},
  {'question': '大阪城にあるタイムカプセルが開封されるのはいつ？', 'answers': ['2100年', '2400年', '3000年', '2020年']}
 ];

Array.prototype.shuffle = function() {
    var i = this.length;
    while(i){
        var j = Math.floor(Math.random()*i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
};

var answers = [];
var current_question_number;

$.each(questions, function (i, question) {
  question.true_answer = question.answers[0];
  question.answers.shuffle();
});

$(function() {
  showQuestion(0);
  
  $('#answer_button').click(function () {
    var answer = -1;
    $.each($('#answers input'), function (i, value) {
      if ($(value).is(':checked')) {
        answer = i;
        return false;
      }
    });
    
    if (answer == -1) {
      $('#warning').slideDown();
      return false;
    }
    
    $('#warning').slideUp();
    
    answers[current_question_number] = questions[current_question_number].answers[answer];
    
    if (current_question_number < questions.length - 1) {
      showQuestion(current_question_number + 1);
    } else {
      showResult();
    }
  });
});

function showQuestion(question_number) {
  current_question_number = question_number;
  
  var question = questions[question_number];
  
  $('#question_number').text((question_number + 1) + "/" + questions.length);
  $('#question_body').text(question.question);
  $('#answers').empty();
  $.each(question.answers, function (i, value) {
    $('#answers').append($('<li/>').append($('<input type="radio" name="answer" id="answer' + i + '"/>')).append($('<label for="answer' + i + '"/>').text(value)));
  });
}
      
function showResult() {
  $('#question_view').hide();
  
  $.each(questions, function (i, question) {
    var is_true = answers[i] === question.true_answer;
    $('#results').append($('<tr/>')
                         .addClass(is_true ? 'true' : 'false')
                         .append($('<th/>').text(i + 1))
                         .append($('<td/>').text(answers[i]))
                         .append($('<td/>').text(question.true_answer))
                         .append($('<td/>').text(is_true ? '○' : '×'))
      );
  });
                                 
  $('#result_view').show();
}

//answers = ['富士山', 'チューリップ', 'あららぎ', '異世界人']; showResult(); // for debug of answer-view

