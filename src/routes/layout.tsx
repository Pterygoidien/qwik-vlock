import { component$, Slot,useContextProvider, useStore, useStyles$, useVisibleTask$} from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import Header from "~/layout/header/Header";
import Footer from "~/layout/footer/Footer";

import { type IThemeContext, ThemeContext} from "~/store/themeContext/themeContext";

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

  const themeStore = useStore<IThemeContext>({
    theme:'light',
    manualToggle: false,
  }, {deep:false})

  useContextProvider(ThemeContext, themeStore);

  useVisibleTask$(({track})=>{ 
    track(()=>{
      if(themeStore.manualToggle) {
        localStorage.setItem('theme', themeStore.theme); 
        const html = document.querySelector('html');
        if(html) html.className = themeStore.theme;
      }
    })

    if(!themeStore.manualToggle)
    {
      themeStore.theme = localStorage.theme || 'light';
    }
    

  });

  //const themeStore = useSignal<boolean>(false);
  /*useContextProvider(ThemeContextSignal, themeStore);
  
  useVisibleTask$(({track})=>{
    track(()=> {
      if(('theme' in localStorage) && themeStore.value !== (localStorage.theme === 'dark')){
        localStorage.setItem('theme', themeStore.value ? 'dark' : 'light');
      }

    });
    try {
      const html = document.querySelector('html');
      if(localStorage.theme) {
        themeStore.value = localStorage.theme === 'dark';
      }
      else if(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeStore.value = true;
        localStorage.setItem('theme', 'dark');
      }
      else {
        themeStore.value = false;
      }

      
      if(html)
      {
        if(themeStore.value){
        html.classList.add('dark');
      }
      else{
        html.classList.remove('dark');
      }}


    } catch (error) {
      console.log(error);
    }
    

  });*/
  


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


