import { component$, useStylesScoped$, useContext } from "@builder.io/qwik";
import { ThemeContext } from "~/store/themeContext/themeContext";
import { Image } from "@unpic/qwik";

import styles from "./Header.module.css?inline";

export default component$(() => {
    useStylesScoped$(styles);
    
    const theme = useContext(ThemeContext);

    return (
        <header class="flex ">
            <div class="container flex items-center justify-between mx-auto py-4 bg-white rounded-b-lg">
                <Image 
                    src="/assets/logo/logo-vlock.png"
                    alt="logo"
                    width="100"
                    height="100" 
                />
                <nav>
                    <ul class="flex gap-3 items-center">
                        <li><a href="#">Accueil</a></li>
                        <li><a href="#">A propos</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><button id="toggle" class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">Carte des parkings</button></li>
                    </ul>
                </nav>
                <div id="toggleSection">
                    <ul class="flex items-center gap-3">
                        <li>
                        <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z" class="fill-sky-400/20"></path><path d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z" class="fill-sky-500"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z" class="fill-sky-500"></path></svg>
                                        
                        </li>
                        <li>
                            {theme.isDarkMode ? "Mode sombre":"Mode clair" }
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
    }
);