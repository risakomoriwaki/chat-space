class MessagesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @groups = group.find(params[:id])
  end

  def create
  end

end