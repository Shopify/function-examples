# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "home#index"

  mount ShopifyApp::Engine, at: "/api"
  get "/api", to: redirect(path: "/") # Needed because our engine root is /api but that breaks FE routing

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get "/api/products/count", to: "products#count"
  get "/api/products/create", to: "products#create"

  # Any other routes will just render the react app
  match "*path" => "home#index", via: [:get, :post]
end
