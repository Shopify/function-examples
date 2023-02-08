# frozen_string_literal: true

module Shopify
  class AfterAuthenticateJob < ActiveJob::Base
    def perform(shop_domain:)
      shop = Shop.find_by(shopify_domain: shop_domain)

      # Need to put this check after we can confirm the app_uninstalled webhook is working
      # and deleting the shop record.
      # return if shop.registered

      cart_transform_id = BuildCommands.new(shop).install_function
      shop.update!(registered: true) if cart_transform_id.present?
    end
  end
end
