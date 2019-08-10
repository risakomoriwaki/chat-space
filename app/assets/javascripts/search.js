$(document).on('turbolinks:load',function() {

  var search_list = $("#user-search-result");
  var chat_list = $("#chat-group-users")

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${user.user_name}
                  </p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.user_id}" data-user-name="${user.user_name}">追加</a>
                  </div>`;
      search_list.append(html);
  }
  function addUser(name, id){
    var html =  `<div class="chat-group-user clearfix">
                    <input name="group[user_ids][]" type="hidden" value="${id}">
                      <p class="chat-group-user__name">
                        ${name}
                      </p>
                      <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`;
      chat_list.append(html);
  }


  $(".chat-group-form__input").on("input", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user_name){
          appendUser(user_name);
        });
      }
      else {
        appendErrMsgToHTML("一致する名前はありません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $("#user-search-result").on("click", ".user-search-add", function () {
    var name = $(this).data("user-name")
    var id = $(this).data("user-id")
    addUser(name, id)
    $(this).parent().remove()
  });

  $("#chat-group-users").on("click", ".user-search-remove", function () {
    console.log(this)
    $(this).parent().remove()
  })
});

