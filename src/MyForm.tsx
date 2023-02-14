import {
    FormGeneratorComponent,
    FormGeneratorInputs,
    FormGeneratorSections
} from "./form-generator/form-generator.component";
import {SectionDefault} from "./form-generator/section.component";
import {useRef} from "react";


interface FormFields {
    name: string,
    city: string,
    age: number
}

interface Sections extends SectionDefault {

}

export function MyForm() {
    const formData = useRef<FormFields>();

    const sections: FormGeneratorSections<Sections> = {
        main: {}
    }

    const inputs: FormGeneratorInputs<FormFields, Sections> = {
        name: {
            titleComponent: "Name",
            defaultValue: "",
            section: "main"
        },
        city: {
            titleComponent: "City",
            defaultValue: "",
            section: "main"
        },
        age: {
            titleComponent: "Age",
            defaultValue: null,
            section: "main",
            type: "number"
        },

    }

    function myAlert() {
        alert(JSON.stringify(formData.current))
    }

    function onFormDataChange(data: FormFields) {
        formData.current = data
    }

    return <>
        <FormGeneratorComponent inputs={inputs} sections={sections} onFormDataChange={onFormDataChange}/>
        <button onClick={myAlert}>Send!</button>
    </>
}