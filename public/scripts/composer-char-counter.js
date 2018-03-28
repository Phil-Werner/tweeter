$(document).ready(function() {
  //console.log("This occurred.");

  $('textarea').on('keyup', function(){

    let textLength = $(this).val().length;
    //console.log(textLength);
    let textRemaining = 140 - textLength;

    //console.log($(this).siblings('.counter').val());
    //console.log($('.counter')[0].outerText);
    //$('.counter')[0].outerText = textRemaining;

      if (textRemaining < 0) {
      //  console.log("!!!");
        $('#counter').addClass('belowZero');

      }


    //$(this).siblings('.counter')[0].html(textRemaining);
    $('#counter').html(textRemaining);


  });
});