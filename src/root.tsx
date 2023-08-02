import { component$} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

 

  return (

    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <script dangerouslySetInnerHTML={`
          var html = document.querySelector('html');
          html.className = localStorage.getItem('theme') || window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        `} />

        <ServiceWorkerRegister />
      </head>
      <body lang="fr" class="dark:bg-sky-700 dark:text-white">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
