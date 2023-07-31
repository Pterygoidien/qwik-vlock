import { component$, Slot, useContextProvider, useSignal, useStyles$, useContext } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "~/layout/header/Header";
import Footer from "~/layout/footer/Footer";

import styles from "./styles.css?inline";
import { ThemeContext } from "~/store/themeContext/themeContext";

export const onGet: RequestHandler = async ({ cacheControl }) => {
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

  const theme = useSignal(true);
  useContextProvider(ThemeContext, theme);
  useStyles$(styles);
  return (
    <>
     <Header />
      <main>
        <button 
          class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          onClick$={():boolean => theme.value = !theme.value}
        >
            {theme.value ? "Mode clair" : "Mode sombre"}
          </button>
          <Child />
        <Slot />
      </main>
      <Footer />
   </>
  );
});

const Child = component$(() => {
  const theme = useContext(ThemeContext);
  return (
    <div>
      <p>
        Theme is {theme.value ?  "light": "dark"}
      </p>
    </div>
  );
});