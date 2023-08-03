import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

import styles from "./Header.module.css?inline";
import { Link } from "@builder.io/qwik-city";
import ThemeToggle from "~/components/interactives/themeToggle";

export default component$(() => {
    useStylesScoped$(styles);
    

    return (
        <header class="flex">
        <div class="container flex items-center justify-between mx-auto py-4 rounded-b-lg bg-white dark:bg-slate-900">
            <Image 
                src="/assets/logo/logo-vlock.png"
                alt="logo"
                width="100"
                height="100" 
            />
            <nav class="flex-grow uppercase font-bold ">
                <ul class="flex gap-3 items-center mx-auto items-center justify-center self-center">
                    <li><Link href="/">Accueil</Link></li>
                    <li><Link href="#">Abonnements</Link></li>
                    <li><Link href="/parkings/" class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded dark:bg-sky-200 dark:text-black">Carte des parkings</Link></li>
                    <li><Link href="#">A propos</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                   </ul>
            </nav> 
            <div id="toggleSection">
                <ul class="flex items-center gap-3">
                    <li>
                        <ThemeToggle />             
                    </li>
                    <li>

                        <Link
                        href="/signup/"
                         class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" 
                        >
                           S'enregistrer
                        </Link>
                        
                    </li>
                </ul>
            </div>
        </div>
    </header>
    );
    }
);