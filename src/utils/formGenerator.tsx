import { component$, useStore, $ } from "@builder.io/qwik";
import type { QwikSubmitEvent } from "@builder.io/qwik";

export interface IFields {
    name: string;
    type: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    value?: any;
    options?: string[];
    maxLength?: number;
    minLength?: number;
    pattern?: string;
}

export default component$<{fields:IFields[], submitText:string}>(({
    fields, submitText
}) => {

    const fieldState = useStore(() => {
        return fields.reduce((acc: Record<string, any>, field: IFields) => {
            return {...acc, [field.name]: field.value};
        }, {});
    });

    const regexValidator = $((field:IFields, pattern:string): boolean => {
        const regex = new RegExp(pattern);
        return regex.test(field.value as string);
    });

    const lengthValidator = $((field:IFields): boolean => {
        if(field.minLength) field.value.length >= field.minLength;
        if(field.maxLength) field.value.length <= field.maxLength;
        return true;
    })

    const submitHandler= $((e: QwikSubmitEvent<HTMLFormElement>) => {
        const form = e.target as HTMLFormElement;
        const formIsValid = fields.every((field:IFields) => {
            if(field.required && !fieldState[field.name]) return false;
            if (field.pattern) return regexValidator(field, field.pattern);
            if(field.minLength || field.maxLength) return lengthValidator(field);
            return true;
        });
        if(formIsValid) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log(data);
        } else {
            console.log('form is not valid');
        }
    })

  


    return (
        <form 
            onSubmit$={submitHandler}
        >
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
                            class="border border-gray-300 rounded-md w-full px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
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
