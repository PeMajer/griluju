"use client";

// CSS is imported in globals.css to keep it in the main bundle (no extra blocking request).
// The JS module is imported dynamically inside useEffect to defer its evaluation until
// after first paint — vanilla-cookieconsent is ~45 kB and would otherwise block hydration.

import { useEffect } from "react";

declare function gtag(...args: unknown[]): void;

function updateConsent(accepted: boolean) {
  const value = accepted ? "granted" : "denied";
  gtag("consent", "update", {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}

export function CookieBanner() {
  useEffect(() => {
    import("vanilla-cookieconsent").then((CookieConsent) => {
      CookieConsent.run({
        categories: {
          necessary: {
            enabled: true,
            readOnly: true,
          },
          analytics: {
            enabled: false,
            autoClear: {
              cookies: [{ name: /^(_ga|_gid|_gat)/ }],
            },
          },
        },

        onConsent: () => {
          updateConsent(CookieConsent.acceptedCategory("analytics"));
        },

        onChange: () => {
          updateConsent(CookieConsent.acceptedCategory("analytics"));
        },

        language: {
          default: "cs",
          translations: {
            cs: {
              consentModal: {
                title: "Používáme cookies",
                description:
                  "Analytické cookies nám pomáhají zlepšovat obsah webu. Žádné reklamy třetích stran.",
                acceptAllBtn: "Přijmout vše",
                acceptNecessaryBtn: "Jen nezbytné",
                showPreferencesBtn: "Nastavení",
              },
              preferencesModal: {
                title: "Nastavení cookies",
                closeIconLabel: "Zavřít",
                acceptAllBtn: "Přijmout vše",
                acceptNecessaryBtn: "Jen nezbytné",
                savePreferencesBtn: "Uložit nastavení",
                sections: [
                  {
                    title: "Nezbytné cookies",
                    description:
                      "Tyto cookies jsou nutné pro správné fungování webu a nelze je vypnout.",
                    linkedCategory: "necessary",
                  },
                  {
                    title: "Analytické cookies",
                    description:
                      "Pomáhají nám zjistit, jak návštěvníci web používají (Google Analytics). Data jsou anonymizovaná.",
                    linkedCategory: "analytics",
                  },
                ],
              },
            },
          },
        },
      });
    });
  }, []);

  return null;
}
