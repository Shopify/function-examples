# frozen_string_literal: true

class BuildCommands
  attr_reader :shop

  def initialize(shop)
    @shop = shop
  end

  # we have to store the function value, so that we can later use it to destroy the function if needed
  def install_function
    shop.with_shopify_session do
      client = ShopifyAPI::Clients::Graphql::Admin.new(
        session: ShopifyAPI::Context.active_session,
        api_version: "unstable",
      )
      query = <<~QUERY
        mutation cartTransformCreate($functionId: String!) {
          cartTransformCreate(functionId: $functionId) {
            cartTransform {
              functionId
              id
            }
            userErrors {
              field
              message
            }
          }
        }
      QUERY
      function_id = ENV["SHOPIFY_CART_MERGE_EXPAND_ID"]
      variables = {
        "functionId" => function_id,
      }
      Rails.logger.info("Installing function with id #{function_id}")
      result = client.query(query: query, variables: variables)
      cart_transform_id = result.body.dig("data", "cartTransformCreate", "cartTransform", "id")

      if cart_transform_id.nil?
        user_errors = result.body.dig("data", "cartTransformCreate", "userErrors")
        Rails.logger.error("Error installing function with id #{function_id}: #{user_errors}")
        nil
      else
        cart_transform_id
      end
    end
  end

  def destroy_function(cart_transform_id)
    shop.with_shopify_session do
      client = ShopifyAPI::Clients::Graphql::Admin.new(
        session: ShopifyAPI::Context.active_session,
        api_version: "unstable",
      )
      query = <<~QUERY
        mutation cartTransformDelete($id: ID!) {
          cartTransformDelete(id: $id) {
            deletedId
            userErrors {
              field
              message
            }
          }
        }
      QUERY
      variables = {
        id: cart_transform_id,
      }
      result = client.query(query: query, variables: variables)
      cart_transform_id = result.body.dig("data", "cartTransformDelete", "deletedId")

      return cart_transform_id unless cart_transform_id.nil?

      result.body("userErrors")
    end
  end

  def products
    shop.with_shopify_session do
      client = ShopifyAPI::Clients::Graphql::Admin.new(session: ShopifyAPI::Context.active_session)
      query = <<~QUERY
        {
          products(first: 10) {
            edges {
              cursor
              node {
                id
                title
                onlineStoreUrl
              }
            }
          }
        }
      QUERY
      client.query(query: query)
    end
  end
end
