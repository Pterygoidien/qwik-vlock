import { component$ } from "@builder.io/qwik"
import Section from "~/layout/containers/Section"
import FormGenerator, { type IFields } from "~/utils/formGenerator";


export default component$(() => {


    const contactForm:IFields[] = [
        {
            type: 'text',
            name: 'name',
            label: 'Name',
            placeholder: 'Enter your name',
            required: true,
        },
        {
            type: 'email',
            name: 'email',
            label: 'Email',
            pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
            required:true,
        },
        {
            type: 'textarea',
            name: 'message',
            label: 'Message',
            placeholder: 'Enter your message',
            required: true,
            
        }


    ]

    return (
        <Section>
            <h2>Contact</h2>
            <FormGenerator fields={contactForm} submitText="Envoyer" />
        </Section>
    )
});
