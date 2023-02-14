import React, {useEffect, useMemo} from "react";
import {FieldValues, FormProvider, useForm, UseFormReturn} from "react-hook-form";
import {FormSection, SectionComponent, SectionDefault} from "./section.component";
import {GeneratedFormInput} from "./generated-form-input";

export type FormGeneratorInputs<FormFields, Sections> = Record<keyof FormFields, GeneratedFormInput<Sections>>
export type FormGeneratorSections<Sections> = Record<keyof Sections, FormSection>

interface FormGeneratorComponentProps<FormFields, Sections> {
  inputs: FormGeneratorInputs<FormFields, Sections>
  sections: FormGeneratorSections<Sections>
  onFormDataChange?: (data:FormFields) => void
  onValidStateChange?: (isValid:boolean) => void
}

export function FormGeneratorComponent<FormFields extends FieldValues, Sections extends SectionDefault>({
                                                                                      inputs,
                                                                                      sections,
                                                                                      onFormDataChange,
                                                                                      onValidStateChange,
                                                                                    }: FormGeneratorComponentProps<FormFields, Sections>) {

  const _inputs: [string, GeneratedFormInput<Sections>][] = useMemo(() => Object.entries<GeneratedFormInput<Sections>>(inputs), [inputs])
  const _sections: [string, FormSection][] = useMemo(() => Object.entries<FormSection>(sections), [sections])

  const methods: UseFormReturn<FormFields, unknown> = useForm<FormFields>({mode: "onChange"})

  const watchAll: FormFields = methods.watch()

  useEffect(() => {
    console.log(watchAll)
    onFormDataChange?.(watchAll)
  }, [watchAll])

  useEffect(() => {
    methods.trigger()
  }, [])

  useEffect(() => {
    onValidStateChange?.(methods.formState.isValid)
  }, [methods.formState.isValid])

  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
    }}>
      <div style={{
          marginLeft: 20,
          marginRight: 20,
      }}>
        <FormProvider {...methods} >
        {
          _sections.map(([sectionName, section]) => {
            return <SectionComponent<FormFields, Sections> key={sectionName} sectionName={sectionName} section={section}
                                                           inputs={_inputs}/>
          })
        }
        </FormProvider>
      </div>
    </div>
  )
}




