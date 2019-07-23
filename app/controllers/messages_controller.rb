class MessagesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @group = Group.find(1)
  end

  def create
  end

end