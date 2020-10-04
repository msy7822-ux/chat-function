Rails.application.routes.draw do
  root to: 'rooms#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # フロントエンドとバックエンドをつなぐことができる(おそらくお互いを監視する部分)
  mount ActionCable.server => '/cable'
end
