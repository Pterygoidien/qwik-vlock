import { component$ } from "@builder.io/qwik";
import Section from "~/layout/containers/Section";
import FormGenerator, { type IFields } from "~/utils/formGenerator";


enum language
{
    french,
    english,
    dutch,
    german,
}
export default component$(() => {

    const formContent: IFields[] = [
        {
            name: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'Email',
            required: true,
            minLength: 5,
            maxLength: 50,
            pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$',
        },
        {
            name: 'password',
            type: 'password',
            label: 'Mot de passe',
            placeholder: 'Mot de passe',
            required: true,
        },
        {
            name: 'firstName',
            type: 'text',
            label: 'Prénom',
            placeholder: 'Prénom',
            required: true,
        }, {
            name: 'lastName',
            type: 'text',
            label: 'Nom',
            placeholder: 'Nom',
            required: true,
        },{
            name: 'phone',
            type: 'tel',
            label: 'Téléphone',
            placeholder: 'Téléphone',
            required: false
        },{
            name: 'language',
            type: 'select',
            label: 'Langue',
            placeholder: 'Langue',
            required: true,
            options: Object.keys(language),
        },
    ]    

    return(
        <Section>
            <h1>Créer un compte</h1>
            <FormGenerator fields={formContent} submitText="Créez votre compte"/>           
        </Section>
    )
});