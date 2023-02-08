# frozen_string_literal: true

class HomeController < ApplicationController
  include ShopifyApp::EmbeddedApp
  include ShopifyApp::EnsureInstalled
  include ShopifyApp::ShopAccessScopesVerification

  DEV_INDEX_PATH = Rails.root.join("frontend")
  PROD_INDEX_PATH = Rails.public_path.join("dist")

  def index
    if ShopifyAPI::Context.embedded? && (!params[:embedded].present? || params[:embedded] != "1")
      redirect_to(ShopifyAPI::Auth.embedded_app_url(params[:host]), allow_other_host: true)
    else
      contents = File.read(File.join(Rails.env.production? ? PROD_INDEX_PATH : DEV_INDEX_PATH, "index.html"))

      render(plain: contents, content_type: "text/html", layout: false)
    end
  end
end
