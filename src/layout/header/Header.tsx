import { component$, useStylesScoped$, useContext } from "@builder.io/qwik";
import { ThemeContext } from "~/store/themeContext/themeContext";
import { Image } from "@unpic/qwik";

import styles from "./Header.module.css?inline";

export default component$(() => {
    useStylesScoped$(styles);
    
    const themeCtx = useContext(ThemeContext);

    return (
        <header class="flex ">
        <div class="container flex items-center justify-between mx-auto py-4 bg-white rounded-b-lg">
            <Image 
                src="/assets/logo/logo-vlock.png"
                alt="logo"
                width="100"
                height="100" 
            />
            <nav class="flex-grow ">
                <ul class="flex gap-3 items-center mx-auto items-center justify-center self-center">
                    <li><a href="/">Accueil</a></li>
                    <li><a href="#">Abonnements</a></li>
                    <li><a href="/parkings/" class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">Carte des parkings</a></li>
                    <li><a href="#">A propos</a></li>
                    <li><a href="#">Contact</a></li>
                   </ul>
            </nav>
            <div id="toggleSection">
                <ul class="flex items-center gap-3">
                    <li>
                    <svg aria-hidden="true" height="24" viewBox="0 0 24 24" width="24" class="sun-and-moon" q:key="nb_0"><mask id="moon-mask" class="moon"><rect fill="white" height="100%" width="100%" x="0" y="0"></rect><circle cx="24" cy="10" fill="black" r="6"></circle></mask><circle cx="12" cy="12" fill="currentColor" mask="url(#moon-mask)" r="6" class="sun"></circle><g stroke="currentColor" class="sun-beams"><line x1="12" x2="12" y1="1" y2="3"></line><line x1="12" x2="12" y1="21" y2="23"></line><line x1="4.22" x2="5.64" y1="4.22" y2="5.64"></line><line x1="18.36" x2="19.78" y1="18.36" y2="19.78"></line><line x1="1" x2="3" y1="12" y2="12"></line><line x1="21" x2="23" y1="12" y2="12"></line><line x1="4.22" x2="5.64" y1="19.78" y2="18.36"></line><line x1="18.36" x2="19.78" y1="5.64" y2="4.22"></line></g></svg>              
                    </li>
                    <li>

                        <button class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" 
                        onClick$={() => themeCtx.isDarkMode = !themeCtx.isDarkMode}>
                            {themeCtx.isDarkMode ? "Mode sombre":"Mode clair" }
                        </button>
                        
                    </li>
                </ul>
            </div>
        </div>
    </header>
    );
    }
);