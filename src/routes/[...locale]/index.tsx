import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Section from "~/layout/containers/Section";
import LogoVlockUI from "~/assets/images/logo/logo-vlock.png?jsx";
import SignUpUI from "~/assets/images/signup-ui.png?jsx";
import MapUI from "~/assets/images/map-ui.png?jsx";
import BikeUI from "~/assets/images/bike-ui.png?jsx";

export default component$(() => {
  return (
    <>
      <Section
        class="bg-sky-200 dark:bg-sky-900 py-7 min-h-[70vh] flex justify-center overflow-hidden"
        container={true}
      >
        <div class="container flex flex-col my-auto justify-between items-center gap-7">
          <h1 class="text-center mb-6">
            {$localize`Welcome to`} <span class="hidden">v-lock</span>
          </h1>
          <LogoVlockUI style="width:400px;" alt="logo" />

          <p>
            {$localize`v-lock is an application that allows you to find secure bicycle parking in Wallonia.`}
          </p>

          <a
            href="./parkings/"
            class="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded mt-6 mx-auto text-center"
          >
            {$localize`Parking map`}
          </a>
        </div>
      </Section>
      <Section class="bg-secondary py-12" container>
        <h2>{$localize`How does it work ?`}</h2>
        <div class="flex gap-7 flex-wrap">
          <article class="flex flex-col basis-1/4 flex-auto min-w-[240px]">
            <h3>{$localize`Sign up`}</h3>
            <SignUpUI style="width:200px;" />
            <p>
              {$localize` The first step is to register with us. It couldn't be easier! Just click on the "Sign up" button in the top right-hand corner of the page, and fill in the form. You'll then receive a confirmation e-mail, and you can log in.
     `}
            </p>
          </article>
          <article class="flex flex-col basis-1/4 flex-auto min-w-[240px]">
            <h3>{$localize`Submit a request`}</h3>
            <MapUI style="width:200px;" />
            <p>
              {$localize` Once you've created an account, you can submit a request. In your profile, you are entitled to add three addresses: one for your home/residential address, and two others as points of interest. You can submit a request for each address. In order for a request to be processed, your profile must first be verified. You can still submit a request in parallel, but it will only be processed once your profile has been created and validated.
       `}
            </p>
          </article>
          <article class="flex flex-col basis-1/4 flex-auto min-w-[240px]">
            <h3>{$localize`Access to the bike box`}</h3>
            <BikeUI style="width:200px;" />
            <p>
              {$localize`
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam,
              sint! Et quasi quibusdam voluptatem, illo alias repellat ducimus
              nemo ratione dolores ab magnam molestiae quia veritatis rem
              voluptatibus fuga harum? Tempore tenetur ullam nihil accusantium
              adipisci asè`}
            </p>
          </article>
        </div>
      </Section>
      ;
      <Section>
        <h2>{$localize`Our team`}</h2>
        <div class="flex gap-8">
          <article>
            <h3>Personne 1</h3>
          </article>
          <article>
            <h3>Personne 2</h3>
          </article>
        </div>
      </Section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Parkings à vélo sécurisés en Wallonie | v-lock",
  meta: [
    {
      name: "description",
      content:
        "v-lock est une application qui vous permet de trouver des parkings à vélo sécurisés en Wallonie.",
    },
    // Open Graph
    {
      property: "og:title",
      content: "Parkings à vélo sécurisés en Wallonie | v-lock",
    },
    {
      property: "og:description",
      content:
        "v-lock est une application qui vous permet de trouver des parkings à vélo sécurisés en Wallonie.",
    },
    {
      property: "og:image",
      content: "https://v-lock.be/assets/logo/logo-vlock.png",
    },
    {
      property: "og:url",
      content: "https://v-lock.be",
    },
    {
      property: "og:type",
      content: "website",
    },
    // Twitter
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:title",
      content: "Parkings à vélo sécurisés en Wallonie | v-lock",
    },
    {
      property: "twitter:description",
      content:
        "v-lock est une application qui vous permet de trouver des parkings à vélo sécurisés en Wallonie.",
    },
    {
      property: "twitter:image",
      content: "https://v-lock.be/assets/logo/logo-vlock.png",
    },
    {
      property: "twitter:url",
      content: "https://v-lock.be",
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:creator",
      content: "@vlock",
    },
    {
      property: "twitter:site",
      content: "@vlock",
    },
  ],
};
