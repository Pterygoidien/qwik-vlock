import { createContextId, type Signal } from "@builder.io/qwik";

export interface IThemeContext{
    theme:'light'|'dark';
    manualToggle:boolean;
}

export const ThemeContextSignal = createContextId<Signal<boolean>>('layout.dark-mode.signal');

export const ThemeContext = createContextId<IThemeContext>('layout.dark-mode.store');