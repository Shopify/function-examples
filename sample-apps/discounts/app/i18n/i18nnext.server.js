import { RemixI18Next } from "remix-i18next";
import { resolve } from "path";

import Backend from "i18next-fs-backend";

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: ["en"],
    fallbackLanguage: "en",
    searchParamKey: "locale",
    order: ["header", "searchParams"],
  },
  i18next: {
    backend: {
      loadPath: resolve("./app/locales/{{lng}}.json"),
    },
    /**
     * Set to `process.env.NODE_ENV !== "production"` to see debug output
     */
    debug: false,
    /**
     * The default locale for the app.
     */
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    /**
     * The supported locales for the app.
     *
     * These should correspond with the JSON files in the `public/locales` folder.
     *
     * @see Available Shopify Admin languages in the Shopify Help Center:
     * https://help.shopify.com/en/manual/your-account/languages#available-languages
     */
    supportedLngs: ["en"],
  },
  backend: Backend,
});

export default i18next;
