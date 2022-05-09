Rails.application.routes.draw do
  
  resources :ratings
  resources :matches
  resources :friends
  resources :shows
  resources :comments
  resources :posts
  resources :sessions
  resources :users


post '/search' ,to: "shows#search"
post '/getuser' ,to: "users#getuser"
post '/getpost' => 'posts#getpost'
post '/getcomment' => 'comments#getcomment'


post "/addfriend", to: "friends#create"

  post "/signup", to: "users#create"
  get "/me", to: "users#me"


  post "/login", to: "sessions#login"
  delete "/logout", to: "sessions#destroy"


  get ':username' => 'users#show'

  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
