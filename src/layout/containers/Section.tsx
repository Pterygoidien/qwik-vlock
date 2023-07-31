import { Slot, component$ } from "@builder.io/qwik";

interface SectionProps {
    bgColor?: string;
    container?:boolean;
}

export default component$<SectionProps>((props) => {
    return(
        <section class={`${props.bgColor}`}>
            <div class={`${(props.container || props.container !== false) && "container"} py-4`}>
                <Slot />
            </div>
        </section>
    )}
);
