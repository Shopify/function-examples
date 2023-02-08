# Shopify App Template - Ruby

This is a template for building a [Shopify app](https://shopify.dev/apps/getting-started) using Ruby on Rails and React. It contains the basics for building a Shopify app.

Rather than cloning this repo, you can use your preferred package manager and the Shopify CLI with [these steps](#installing-the-template).

## Benefits

Shopify apps are built on a variety of Shopify tools to create a great merchant experience. The [create an app](https://shopify.dev/apps/getting-started/create) tutorial in our developer documentation will guide you through creating a Shopify app using this template.

The Ruby app template comes with the following out-of-the-box functionality:

- OAuth: Installing the app and granting permissions
- GraphQL Admin API: Querying or mutating Shopify admin data
- REST Admin API: Resource classes to interact with the API
- Shopify-specific tooling:
  - AppBridge
  - Polaris
  - Webhooks

## Tech Stack

This template combines a number of third party open source tools:

- [Rails](https://rubyonrails.org/) builds the backend.
- [Vite](https://vitejs.dev/) builds the [React](https://reactjs.org/) frontend.
- [React Router](https://reactrouter.com/) is used for routing. We wrap this with file-based routing.
- [React Query](https://react-query.tanstack.com/) queries the Admin API.

These third party tools are complemented by Shopify specific tools to ease app development:

- [Shopify API library](https://github.com/Shopify/shopify-api-ruby) adds OAuth to the Rails backend. This lets users install the app and grant scope permissions.
- [App Bridge](https://shopify.dev/apps/tools/app-bridge) and [App Bridge React](https://shopify.dev/apps/tools/app-bridge/getting-started/using-react) add authentication to API requests in the frontend and renders components outside of the App’s iFrame.
- [Polaris React](https://polaris.shopify.com/) is a powerful design system and component library that helps developers build high quality, consistent experiences for Shopify merchants.
- [Custom hooks](https://github.com/Shopify/shopify-frontend-template-react/tree/main/hooks) make authenticated requests to the Admin API.
- [File-based routing](https://github.com/Shopify/shopify-frontend-template-react/blob/main/Routes.jsx) makes creating new pages easier.

## Getting started

### Requirements

1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).
1. You must have [Ruby](https://www.ruby-lang.org/en/) installed.
1. You must have [Bundler](https://bundler.io/) installed.
1. You must have [Node.js](https://nodejs.org/) installed.

### Installing the template

This template runs on Shopify CLI 3.0, which is a node package that can be included in projects. You can install it using your preferred Node.js package manager:

Using yarn:

```shell
yarn create @shopify/app --template=ruby
```

Using npx:

```shell
npm init @shopify/app@latest --template=ruby
```

Using pnpm:

```shell
pnpm create @shopify/app@latest --template=ruby
```

This will clone the template and install the CLI in that project.

### Setting up your Rails app

Once the Shopify CLI clones the repo, you will be able to run commands on your app.
However, the CLI will not manage your Ruby dependencies automatically, so you will need to go through some steps to be able to run your app.
To make the process easier, the template provides a script to run the necessary steps:

1. Start off by switching to the `web` folder:
   ```shell
   cd web
   ```
1. Install the ruby dependencies:
   ```shell
   bundle install
   ```
1. Run the [Rails template](https://guides.rubyonrails.org/rails_application_templates.html) script.
   It will guide you through setting up your database and set up the necessary keys for encrypted credentials.
   ```shell
   bin/rails app:template LOCATION=./template.rb
   ```

And your Rails app is ready to run! You can now switch back to your app's root folder to continue:

```shell
cd ..
```

### Local Development

[The Shopify CLI](https://shopify.dev/apps/tools/cli) connects to an app in your Partners dashboard.
It provides environment variables, runs commands in parallel, and updates application URLs for easier development.

You can develop locally using your preferred Node.js package manager.
Run one of the following commands from the root of your app:

Using yarn:

```shell
yarn dev
```

Using npm:

```shell
npm run dev
```

Using pnpm:

```shell
pnpm run dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start development.

## Deployment

### Application Storage

This template uses [Rails' ActiveRecord framework](https://guides.rubyonrails.org/active_record_basics.html) to store Shopify session data.
It provides migrations to create the necessary tables in your database, and it stores and loads session data from them.

The database that works best for you depends on the data your app needs and how it is queried.
You can run your database of choice on a server yourself or host it with a SaaS company.
Once you decide which database to use, you can configure your app to connect to it, and this template will start using that database for session storage.

### Build

The frontend is a single page React app.
It requires the `SHOPIFY_API_KEY` environment variable, which you can get by running `yarn run info --web-env`.
The CLI will set up the necessary environment variables for the build if you run its `build` command from your app's root:

Using yarn in your app's root folder:

```shell
yarn build --api-key=REPLACE_ME
```

Using npm:

```shell
npm run build --api-key=REPLACE_ME
```

Using pnpm:

```shell
pnpm run build --api-key=REPLACE_ME
```

The app build command will build both the frontend and backend when running as above.
If you're manually building (for instance when deploying the `web` folder to production), you'll need to build both of them:

```shell
cd web/frontend
SHOPIFY_API_KEY=REPLACE_ME yarn build
cd ..
rake build:all
```

## Hosting

When you're ready to set up your app in production, you can follow [our deployment documentation](https://shopify.dev/apps/deployment/web) to host your app on a cloud provider like [Heroku](https://www.heroku.com/) or [Fly.io](https://fly.io/).

When you reach the step for [setting up environment variables](https://shopify.dev/apps/deployment/web#set-env-vars), you also need to set the following variables:

| Variable                   | Secret? | Required |     Value      | Description                                                 |
| -------------------------- | :-----: | :------: | :------------: | ----------------------------------------------------------- |
| `RAILS_MASTER_KEY`         |   Yes   |   Yes    |     string     | Use value from `web/config/master.key` or create a new one. |
| `RAILS_ENV`                |         |   Yes    | `"production"` |                                                             |
| `RAILS_SERVE_STATIC_FILES` |         |   Yes    |      `1`       | Tells rails to serve the React app from the public folder.  |
| `RAILS_LOG_TO_STDOUT`      |         |          |      `1`       | Tells rails to print out logs.                              |

## Known issues

### Hot module replacement and Firefox

When running the app with the CLI in development mode on Firefox, you might see your app constantly reloading when you access it.
That happened in previous versions of the CLI, because of the way HMR websocket requests work.

We fixed this issue with v3.4.0 of the CLI, so after updating it, you can make the following changes to your app's `web/frontend/vite.config.js` file:

1. Change the definition `hmrConfig` object to be:

   ```js
   const host = process.env.HOST
     ? process.env.HOST.replace(/https?:\/\//, "")
     : "localhost";

   let hmrConfig;
   if (host === "localhost") {
     hmrConfig = {
       protocol: "ws",
       host: "localhost",
       port: 64999,
       clientPort: 64999,
     };
   } else {
     hmrConfig = {
       protocol: "wss",
       host: host,
       port: process.env.FRONTEND_PORT,
       clientPort: 443,
     };
   }
   ```

1. Change the `server.host` setting in the configs to `"localhost"`:

   ```js
   server: {
     host: "localhost",
     ...
   ```

### I can't get past the ngrok "Visit site" page

When you’re previewing your app or extension, you might see an ngrok interstitial page with a warning:

```
You are about to visit <id>.ngrok.io: Visit Site
```

If you click the `Visit Site` button, but continue to see this page, then you should run dev using an alternate tunnel URL that you run using tunneling software.
We've validated that [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/run-tunnel/trycloudflare/) works with this template.

To do that, you can [install the `cloudflared` CLI tool](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/), and run:

```shell
# Note that you can also use a different port
cloudflared tunnel --url http://localhost:3000
```

In a different terminal window, navigate to your app's root and call:

```shell
# Using yarn
yarn dev --tunnel-url https://tunnel-url:3000
# or using npm
npm run dev --tunnel-url https://tunnel-url:3000
# or using pnpm
pnpm dev --tunnel-url https://tunnel-url:3000
```

## Developer resources

- [Introduction to Shopify apps](https://shopify.dev/apps/getting-started)
- [App authentication](https://shopify.dev/apps/auth)
- [Shopify CLI](https://shopify.dev/apps/tools/cli)
- [Shopify API Library documentation](https://github.com/Shopify/shopify-api-ruby/tree/main/docs)
