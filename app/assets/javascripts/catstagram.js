$(document).ready(function() {
  $('[data-meow-button="create"]').on('submit', function(event) {
    event.preventDefault();

    $form = $(event.currentTarget);

    $.ajax({
      type: "POST",
      url: $form.attr('action'),
      dataType: "json",
      success: function(meow) {
        action = '/posts/' + meow.post_id + '/meows' + meow.id;
        $newForm = $('<form>').attr({
          action: action,
          method: 'delete',
          'data-meow-button': 'delete'
        });
        $meowButton = $('<input>').attr({
          type: 'submit',
          value: 'Remove Meow'
        });
        $newForm.append($meowButton);
        $form.replaceWith($newForm);
      }
    });
  });
});
