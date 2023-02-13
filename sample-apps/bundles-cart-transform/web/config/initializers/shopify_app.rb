# frozen_string_literal: true

ShopifyApp.configure do |config|
  config.webhooks = [
    # After a store owner uninstalls your app, Shopify invokes the APP_UNINSTALLED webhook
    # to let your app know.
    { topic: "app/uninstalled", address: "api/webhooks/app_uninstalled" },
  ]
  config.application_name = "My Shopify App"
  config.old_secret = ""
  config.scope = ENV.fetch("SCOPES", "write_products") # See shopify.app.toml for scopes
  # Consult this page for more scope options: https://shopify.dev/api/usage/access-scopes
  config.embedded_app = true
  config.after_authenticate_job = { job: "Shopify::AfterAuthenticateJob", inline: false }
  config.api_version = ShopifyAPI::AdminVersions::LATEST_SUPPORTED_ADMIN_VERSION
  config.shop_session_repository = "Shop"

  config.reauth_on_access_scope_changes = true

  config.root_url = "/api"
  config.login_url = "/api/auth"
  config.login_callback_url = "/api/auth/callback"
  config.embedded_redirect_url = "/ExitIframe"

  # You may want to charge merchants for using your app. Setting the billing configuration will cause the Authenticated
  # controller concern to check that the session is for a merchant that has an active one-time payment or subscription.
  # If no payment is found, it starts off the process and sends the merchant to a confirmation URL so that they can
  # approve the purchase.
  #
  # Learn more about billing in our documentation: https://shopify.dev/apps/billing
  # config.billing = ShopifyApp::BillingConfiguration.new(
  #   charge_name: "My app billing charge",
  #   amount: 5,
  #   interval: ShopifyApp::BillingConfiguration::INTERVAL_ANNUAL,
  #   currency_code: "USD", # Only supports USD for now
  # )

  config.api_key = ENV.fetch("SHOPIFY_API_KEY", "").presence
  config.secret = ENV.fetch("SHOPIFY_API_SECRET", "").presence
  config.myshopify_domain = ENV.fetch("SHOP_CUSTOM_DOMAIN", "").presence if ENV.fetch("SHOP_CUSTOM_DOMAIN", "").present?

  if defined? Rails::Server
    raise("Missing SHOPIFY_API_KEY. See https://github.com/Shopify/shopify_app#requirements") unless config.api_key
    raise("Missing SHOPIFY_API_SECRET. See https://github.com/Shopify/shopify_app#requirements") unless config.secret
  end
end

Rails.application.config.after_initialize do
  if ShopifyApp.configuration.api_key.present? && ShopifyApp.configuration.secret.present?
    ShopifyAPI::Context.setup(
      api_key: ShopifyApp.configuration.api_key,
      api_secret_key: ShopifyApp.configuration.secret,
      api_version: ShopifyApp.configuration.api_version,
      host_name: URI(ENV.fetch("HOST", "")).host || "",
      scope: ShopifyApp.configuration.scope,
      is_private: !ENV.fetch("SHOPIFY_APP_PRIVATE_SHOP", "").empty?,
      is_embedded: ShopifyApp.configuration.embedded_app,
      logger: Rails.logger,
      log_level: :info,
      private_shop: ENV.fetch("SHOPIFY_APP_PRIVATE_SHOP", nil),
      user_agent_prefix: "ShopifyApp/#{ShopifyApp::VERSION}",
    )

    add_gdpr_webhooks
    ShopifyApp::WebhooksManager.add_registrations
  end
end

def add_gdpr_webhooks
  gdpr_webhooks = [
    # NOTE: To register the URLs for the three GDPR topics that follow, please set the appropriate
    # webhook endpoint in the 'GDPR mandatory webhooks' section of 'App setup' in the Partners Dashboard.
    # The code that processes these webhooks is located in the `app/jobs` directory.
    #
    # 48 hours after a store owner uninstalls your app, Shopify invokes this SHOP_REDACT webhook.
    # https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks#shop-redact
    { topic: "shop/redact", address: "api/webhooks/shop_redact" },

    # Store owners can request that data is deleted on behalf of a customer. When this happens,
    # Shopify invokes this CUSTOMERS_REDACT webhook to let your app know.
    # https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks#customers-redact
    { topic: "customers/redact", address: "api/webhooks/customers_redact" },

    # Customers can request their data from a store owner. When this happens, Shopify invokes
    # this CUSTOMERS_DATA_REQUEST webhook to let your app know.
    # https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks#customers-data_request
    { topic: "customers/data_request", address: "api/webhooks/customers_data_request" },
  ]

  ShopifyApp.configuration.webhooks = if ShopifyApp.configuration.has_webhooks?
    ShopifyApp.configuration.webhooks.concat(gdpr_webhooks)
  else
    gdpr_webhooks
  end
end
