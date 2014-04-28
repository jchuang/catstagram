$(document).ready(function() {

  $('[data-post-id]').on('submit', '[data-meow-button="create"]', function(event) {
    event.preventDefault();

    $form = $(event.currentTarget);
    $meows = $form.siblings('[data-post-meow-count]');

    $.ajax({
      type: "POST",
      url: $form.attr('action'),
      dataType: "json",
      success: function(meow) {
        action = '/posts/' + meow.post_id + '/meows/' + meow.id;
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

        var count = $meows.data("postMeowCount");
        count++;
        $meows.data("postMeowCount", count);
        if (count == 1) {
          $meows.text(count + " Meow");
        } else {
          $meows.text(count + " Meows");
        }
      }
    });
  });

  $('[data-post-id]').on('submit', '[data-meow-button="delete"]', function(event) {
    event.preventDefault();

    $form = $(event.currentTarget);
    $meows = $form.siblings('[data-post-meow-count]');

    $.ajax({
      type: "DELETE",
      url: $form.attr('action'),
      dataType: "json",
      success: function() {
        $post = $form.closest('[data-post-id]');
        action = '/posts/' + $post.data('post-id') + '/meows';
        $newForm = $('<form>').attr({
          action: action,
          method: 'post',
          'data-meow-button': 'create'
        });
        $meowButton = $('<input>').attr({
          type: 'submit',
          value: 'Meow'
        });
        $newForm.append($meowButton);
        $form.replaceWith($newForm);

        var count = $meows.data("postMeowCount");
        count--;
        $meows.data("postMeowCount", count);
        if (count == 1) {
          $meows.text(count + " Meow");
        } else {
          $meows.text(count + " Meows");
        }
      }
    });
  });
});
