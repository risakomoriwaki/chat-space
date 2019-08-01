Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'groups#index'
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    # グループ機能は新規作成new、編集機能edit、グループを保存crate、グループを更新update
    resources :messages, only: [:index, :create]
    # メッセージは一覧表示と保存 グループの中にあるのでネスト
  end  
end
