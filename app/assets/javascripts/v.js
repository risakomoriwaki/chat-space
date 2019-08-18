// var reloadMessages =  function() {
//   if (window.location.href.match(/\/groups\/\d+\/messages/),('.group__latest-message')){
//     last_message_id = $('.upper-info:last').data("message-id")
//     $.ajax({
//       url:  'api/messages',
//       type: 'get',
//       dataType: 'json',
//       data: {id: last_message_id}
//     })
//     .done(function(messages) {
//       console.log('success');
//       //追加するHTMLの入れ物を作る
//       var insertHTML = '';
//       //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
//       messages.forEach(function(message) {
//       //メッセージが入ったHTMLを取得
//       insertHTML = buildHTML(message);
//       //メッセージを追加
      
//       $('.messages').append(insertHTML);
//       $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight}, "fast");
//       })
//     })
//     .fail(function() {
//       console.log('error');
//     });
//   }else{
    
//   }
// }
//   setInterval(reloadMessages, 5000);  
