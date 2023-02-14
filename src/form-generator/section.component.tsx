import {FieldValues} from "react-hook-form";
import React, {useMemo, useRef} from "react";
import {GeneratedInput} from "./generated-input.component";
import {GeneratedFormInput} from "./generated-form-input";
import {Collapse} from "./collapse.component";

export interface FormSection {
  titleComponent?: React.ReactNode;
  collapsable?: CollapseSettings;
  //isVisible?: (control: Control<FieldValues, unknown>) => boolean;
  className?: string
}

export interface SectionDefault {
  main: unknown
}

interface SectionComponentProps<Sections> {
  sectionName: string
  section: FormSection
  inputs: Array<[string, GeneratedFormInput<Sections>]>
}

interface CollapseSettings {
  title: string;
  isCollapsed: boolean
}


export function SectionComponent<FormFields extends FieldValues, Sections extends SectionDefault>({
                                                                                sectionName,
                                                                                section,
                                                                                inputs = []
                                                                              }: SectionComponentProps<Sections>) {


  //const {control}: UseFormReturn<FormFields, unknown> = useFormContext<FormFields>()

  const defaultSection: React.MutableRefObject<FormSection> = useRef<FormSection>({
    //isVisible: () => true,
    titleComponent: null,
    className: ''
  })

  const _section = useMemo(() => {
    if(section){
      return Object.assign<FormSection, FormSection>(defaultSection.current, section)
    }
    return defaultSection.current
  }, [section])

  /*if (!_section.isVisible?.(control)) {
    return null
  }*/

  const _inputs = inputs
    .filter(([, input]) => input.section === sectionName)

  const Section = <>
    {_section.titleComponent}
    <div className={_section.className}>
      {_inputs.map(([name, input]) => (
        <GeneratedInput key={name} name={name} generatedFormInput={input}/>
      ))}
    </div>
  </>

  if (_section.collapsable) {
    return <Collapse className=""
                     isOpen={!(_section.collapsable?.isCollapsed ?? false)}
                     sectionTitle={_section.collapsable.title}>
      {Section}
    </Collapse>
  }

  return Section
}
