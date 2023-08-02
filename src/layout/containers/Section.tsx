import { Slot, component$ } from "@builder.io/qwik";

interface SectionProps {
    class?: string;
    container?:boolean;
}

export default component$<SectionProps>((props) => {
    return(
        <section class={`${props.class}`}>
            <div class={`${(props.container !== false) && "container"} py-4`}>
                <Slot />
            </div>
        </section>
    )}
);
