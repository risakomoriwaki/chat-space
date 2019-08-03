class MessagesController < ApplicationController
  before_action :set_group
  # private以下にset_groupを定義し、before_actionを利用して呼び出すことで、
  # messagesコントローラの全てのアクションで@groupを利用できるようになります。

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end
  # indexアクションでは、Messageモデルの新しいインスタンスである@message、
  # グループに所属する全てのメッセージである@messagesを定義しています。
  # 「n + 1 問題」を避けるために、includes(:user)の記述を忘れずに行いましょう。

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(params[:group_id]), notice: 'メッセージが送信されました' }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
