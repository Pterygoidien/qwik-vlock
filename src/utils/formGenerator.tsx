import { component$, useStore } from "@builder.io/qwik";

export interface IFields {
    name: string;
    type: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    options?: string[];
    maxLength?: number;
    minLength?: number;
    pattern?: string;
}

export default component$<{fields:IFields[], submitText:string}>(({
    fields, submitText
}) => {

    let fieldState = useStore({})

    fields.forEach((field:IFields) => {
        fieldState = {...fieldState, [field.name]: field.value}
    })

    console.log(fieldState)


    return (
        <form>
            {fields.map((field:IFields, key:number) =>(<fieldset key={key}>
                    <label for={field.name}>
                        {field.label}
                    </label>
                    {field.type === 'select' ? (
                        <select name={field.name} id={field.name} required={field.required}>
                            {field.options?.map((option:string, key:number) => {
                                return(
                                    <option key={key} value={option}>{option}</option>
                                )
                            })}
                        </select>
                    ) : (
                        <input 
                            type={field.type} 
                            name={field.name} 
                            id={field.name} 
                            placeholder={field.placeholder} 
                            required={field.required}
                            value={field.value}
                            onCompositionEndCapture$={(e) => {
                                fieldState[field.name] = (e.target as HTMLInputElement).value;
                            }}
                        />
                    )}
                    </fieldset>
                )
            )}
            <button 
                type="submit"
                class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
            >{submitText}</button>
            </form>
    );
});
