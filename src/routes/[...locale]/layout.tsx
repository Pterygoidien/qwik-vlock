import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useVisibleTask$,
  useOnDocument,
  $,
} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import { extractLang } from "~/i18n";

import Header from "~/layout/header/Header";
import Footer from "~/layout/footer/Footer";

import {
  type IThemeContext,
  ThemeContext,
} from "~/store/themeContext/themeContext";

const locales = new Set(["en", "fr"]);

export const onGet: RequestHandler = async ({
  cacheControl,
  request,
  url,
  redirect,
  pathname,
  params,
  locale,
}) => {
  if (locales.has(params.locale)) {
    locale(params.locale);
  } else {
    const guessedLocale = extractLang(request, url);
    let path;
    if (
      params.locale === "__" ||
      /^[a-z][a-z](-[a-z][a-z])?/i.test(params.locale)
    ) {
      // invalid locale
      path = "/" + pathname.split("/").slice(2).join("/");
    } else {
      path = pathname;
    }
    throw redirect(301, `/${guessedLocale}${path}${url.search}`);
  }

  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const themeStore = useStore<IThemeContext>(
    {
      theme: "light",
      manualToggle: false,
    },
    { deep: false }
  );

  useContextProvider(ThemeContext, themeStore);

  useOnDocument(
    "DOMContentLoaded",
    $(() => {
      themeStore.theme =
        localStorage.theme ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
      document.documentElement.setAttribute("data-theme", themeStore.theme);
    })
  );

  useVisibleTask$(({ track }) => {
    track(themeStore);
    localStorage.setItem("theme", themeStore.theme);
    document.documentElement.setAttribute("data-theme", themeStore.theme);
  });

  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
