import { $, component$, useContext } from "@builder.io/qwik";
import styles from "./ThemeToggle.module.css";
import { ThemeContext } from "~/store/themeContext/themeContext";



export default component$(() => {
    const themeCtx = useContext(ThemeContext);

    const toggleHandler = $(()=> {
        themeCtx.theme = (themeCtx.theme === 'light') ? 'dark' : 'light';
        themeCtx.manualToggle = true;

    });

    return(
       <button aria-label={themeCtx.theme} aria-live="polite" id="theme-toggle" title="Toggles light &amp; dark" type="button" class={styles['theme-toggle']} onClick$={toggleHandler}>
            <svg aria-hidden="true" height="24" viewBox="0 0 24 24" width="24" class={styles['sun-and-moon']} q:key="nb_0">
                <mask id="moon-mask" class={styles['moon']}>
                    <rect fill="white" height="100%" width="100%" x="0" y="0"></rect>
                    <circle cx="24" cy="10" fill="black" r="6"></circle>
                </mask>
                <circle cx="12" cy="12" fill="currentColor" mask="url(#moon-mask)" r="6" class={styles['sun']}></circle>
                <g stroke="currentColor" class={styles['sun-beams']}>
                    <line x1="12" x2="12" y1="1" y2="3"></line>
                    <line x1="12" x2="12" y1="21" y2="23"></line><line x1="4.22" x2="5.64" y1="4.22" y2="5.64"></line>
                    <line x1="18.36" x2="19.78" y1="18.36" y2="19.78"></line><line x1="1" x2="3" y1="12" y2="12"></line>
                    <line x1="21" x2="23" y1="12" y2="12"></line><line x1="4.22" x2="5.64" y1="19.78" y2="18.36"></line>
                    <line x1="18.36" x2="19.78" y1="5.64" y2="4.22"></line>
                </g>
            </svg>
        </button>
           

    )
});