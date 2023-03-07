import {createStore, produce} from "solid-js/store";
import {Form, FormErrors, GliderInputEvent, SubmitCallback} from "../types/Form";
import {Accessor, Component, For, ParentComponent, Show} from "solid-js";

declare module "solid-js" {
    namespace JSX {
        interface Directives {
            validate: Validator[];
        }
    }
}

type Validator = (element: HTMLInputElement, ...rest: any[]) => string;

type ErrorProps = { messages: string[]; }

export const FormError: ParentComponent = (props) => {

    const errors = () => props.children as string[] || [];
    return (
        <Show when={errors().length > 0}>
            <div
                class="flex-it grow text-xs bg-red-400 text-white p-3 pl-3 mt-1 rounded-md">
                <For each={errors()}>
                    {
                        (error) =>
                            <div>
                                {error}
                            </div>
                    }
                </For>
            </div>
        </Show>
    )
}

export const maxLengthValidator: Validator = (element: HTMLInputElement, maxLength = 7) => {
    if (element.value.length === 0 || element.value.length < maxLength) {
        return "";
    }

    return `${element.name} should be less than ${maxLength} characters`;
}

export const firstUppercaseLetter: Validator = (element: HTMLInputElement) => {
    const {value} = element;

    if (value.length === 0) {
        return "";
    }

    return value[0] !== value[0].toUpperCase() ?
        `${element.name} first letter should be uppercase` : "";
}

export const useForm = <T extends Form>(initialForm: T) => {

    const [form, setForm] = createStore<T>(initialForm);
    const [errors, setErrors] = createStore<FormErrors>();

    const handleInput = (e: GliderInputEvent) => {
        const {name, value} = e.currentTarget;
        setForm(
            name as any,
            value as any,
        );
    }

    const submitForm = (submitCallback: SubmitCallback<T>) => () => {
        submitCallback(form);
    }

    const validate = (ref: HTMLInputElement, accessor: Accessor<Validator[]>) => {
        const validators = accessor() || [];

        ref.onblur = checkValidity(ref, validators)
    }

    const checkValidity = (element: HTMLInputElement, validators: Validator[]) => () => {
        // reset to empty array of errors
        setErrors(element.name, []);

        for (const validator of validators) {
            const message = validator(element);

            if (!!message) {
                setErrors(produce(errors => {
                    errors[element.name].push(message);
                }));
            }
        }

        console.log(JSON.stringify(errors));
    }

    return {handleInput, submitForm, validate, errors};
}