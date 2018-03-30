$(document).ready(function() {

  $('textarea').on('keyup', function(){

    let textLength = $(this).val().length;
    let textRemaining = 140 - textLength;

      if (textRemaining < 0) {
        $('#counter').addClass('belowZero');
      }

      if (textRemaining >= 0) {
        $('#counter').removeClass('belowZero');
      }
    $('#counter').html(textRemaining);
  });
});