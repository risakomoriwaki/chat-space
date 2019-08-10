$(document).on('turbolinks:load',function() {
  function buildHTML(message){
    var addImage = (message.image.url ) ? `<img class = "image_size", src="${message.image.url}">` : ''
    var html = `<div class = "message">
                  <div class = upper-info>
                    <div class = "upper-info__user">
                      ${message.user_name}
                    </div>
                    <div class = "upper-info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class = "message__text">
                    <p class = "lower-message__content">
                      ${message. content}
                    </p>
                      ${addImage}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    const formData = new FormData($(this).get()[0]);
    var url = $(this).attr('action')
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(content){
      var html = buildHTML(content);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight}, "fast");
      $('#new_message')[0].reset();
      $('.form__submit').attr('disabled', false);
  
    })
    .fail(function(){
      alert('error');
    })
  })
})