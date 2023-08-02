import { component$, Slot,useContextProvider,useSignal,useStyles$, useVisibleTask$} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "~/layout/header/Header";
import Footer from "~/layout/footer/Footer";

import { ThemeContext } from "~/store/themeContext/themeContext";

import styles from "./styles.css?inline";

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

  useStyles$(styles);
  const themeStore = useSignal<boolean>(false);
  useContextProvider(ThemeContext, themeStore);
  
  useVisibleTask$(({track})=>{
    track(themeStore);
    const body = document.querySelector('html');
    if(body)
    {
      if(themeStore.value){
      body.classList.add('dark');
    }
    else{
      body.classList.remove('dark');
    }}

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


