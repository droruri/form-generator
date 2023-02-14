import React from "react";
import {FieldValues, Path, useFormContext} from "react-hook-form";
import {GeneratedFormInput} from "./generated-form-input";


interface GeneratedInputProps<FormFields extends FieldValues, Sections> {
  name: Path<FormFields>
  generatedFormInput: GeneratedFormInput<Sections>
}

export function GeneratedInput<FormFields extends FieldValues, Sections>({
                                                       name,
                                                       generatedFormInput
                                                     }: GeneratedInputProps<FormFields, Sections>) {

  const {register} = useFormContext<FormFields>()
  /*const isRequired: boolean = generatedFormInput.validators.map(val => val.type).includes('required')
  if (!generatedFormInput.isVisible(control)) {
    return null
  }*/

  let InputComponent = <input
    {...register(name, {
        valueAsNumber: generatedFormInput.type === 'number',
    })}
    name={name}
    type={generatedFormInput.type}
    defaultValue={generatedFormInput.defaultValue}
    disabled={generatedFormInput.disabled}
    placeholder={generatedFormInput.placeholder}
    className={generatedFormInput.className}
  />

  return (
    <div className="flex-column bottom-marg-10">
      <label htmlFor={name.toString()}>
        {generatedFormInput.titleComponent}
      </label>
      {InputComponent}
    </div>
  )
}
