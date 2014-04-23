$(document).ready(function() {
  $('[data-meow-button="create"]').on('submit', function(event) {
    event.preventDefault();

    $form = $(event.currentTarget);

    $.ajax({
      type: "POST",
      url: $form.attr('action'),
      dataType: "json",
      success: function() {
        alert('meow!');
      }
    });
  });
});
