$(document).on('turbolinks:load',function() {
  function buildHTML(message){
    var addImage = (message.image.url ) ? `<img class = "lower-message__image", src="${message.image.url}">` : ''
    var html = `<div class = "message" data-message-id=${message.id}>
                  <div class = "upper-info">
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
      $('.form__submit').attr('disabled', false);
    })
    });

    var reloadMessages =  function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/),('.group__latest-message')){
        //last_message_id = $('.upper-info:last').data("message-id")
        last_message_id = $('.message:last').data("message-id")
        console.log(last_message_id);
        $.ajax({
          url:  'api/messages',
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          //console.log('success');
          //追加するHTMLの入れ物を作る
          var insertHTML = '';
          //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          messages.forEach(function(message) {
          //メッセージが入ったHTMLを取得
          insertHTML = buildHTML(message);
          //メッセージを追加
          
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight}, "fast");
          })
        })
        .fail(function() {
          console.log('error');
        });
      }
    }
    setInterval(reloadMessages, 5000);  
    
})