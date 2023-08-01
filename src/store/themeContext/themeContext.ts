import { createContextId } from "@builder.io/qwik";

export interface IThemeContext{
    isDarkMode:boolean;

}

export const ThemeContext = createContextId<IThemeContext>('layout.theme-context');



