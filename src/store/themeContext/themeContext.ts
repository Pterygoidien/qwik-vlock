import { createContextId, type Signal } from "@builder.io/qwik";

export interface IThemeContext{
    isDarkMode:boolean;

}

export const ThemeContext = createContextId<Signal<boolean>>('layout.dark-mode');



