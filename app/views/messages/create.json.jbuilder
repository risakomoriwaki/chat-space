json.(@message, :content, :image)
json.user_id    @message.user_id
json.user_name  @message.user.name
json.date       @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id