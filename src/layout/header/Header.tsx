import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

import { Link } from "@builder.io/qwik-city";
import ThemeToggle from "~/components/interactives/ThemeToggle";
import styles from "./Header.module.css";

export default component$(() => {
  return (
    <header id="main-header" class="bg-transparent">
      <div class="container flex items-center justify-between mx-auto opacity-95 p-4 rounded-b-xl bg-white dark:bg-slate-900">
        <div id={styles.burgerMenu} class="lg:hidden">
          <input type="checkbox" />

          <span></span>
          <span></span>
          <span></span>

          <ul
            id={styles["burgerMenu__nav"]}
            class="bg-primary flex flex-col gap-4"
          >
            <li>
              <Link href="./">Accueil</Link>
            </li>
            <li>
              <Link href="./subscriptions">Abonnements</Link>
            </li>
            <li>
              <Link href="/parkings/">Carte des parkings</Link>
            </li>
          </ul>
        </div>
        <Image
          src="/assets/logo/logo-vlock.png"
          alt="logo"
          width="100"
          height="37.67"
        />
        <nav class="flex-grow uppercase font-bold hidden lg:block">
          <ul class="flex gap-3 mx-auto items-center justify-center self-center">
            <li>
              <Link href="./">{$localize`Home`}</Link>
            </li>
            <li>
              <Link href="./subscriptions">{$localize`Subscriptions`} </Link>
            </li>
            <li>
              <Link
                href="./parkings/"
                class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded dark:bg-sky-200 dark:text-black"
              >
                {$localize`Parking map`}
              </Link>
            </li>
            <li>
              <Link href="./about">{$localize`About`}</Link>
            </li>
            <li>
              <Link href="./contact">{$localize`Contact`}</Link>
            </li>
          </ul>
        </nav>
        <div id="toggleSection">
          <ul class="flex items-center gap-3">
            <li>
              <ThemeToggle />
            </li>
            <li>
              <select
                id="lang-select"
                class="bg-tertiary border-[1px] rounded-xl px-2 py-[5px] border-slate-800"
              >
                <option value="fr">Français</option>
                <option value="nl">Nederlands</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
});
