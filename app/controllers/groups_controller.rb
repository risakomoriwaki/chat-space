class GroupsController < ApplicationController

  def new
  end

  def create
    @group = group.new(group_params)
    end
  end

  def edit
    @group = Gweet.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    if group.user_id == current_user.id
      group.update(group_params)
      end
  end

end
