import React, {HTMLInputTypeAttribute} from "react";
import {Control} from "react-hook-form";
import {RegisterOptions} from "react-hook-form/dist/types/validator";

export class GeneratedFormInput<Sections> {
  titleComponent: React.ReactNode;
  defaultValue: any;
  section: keyof Sections
  disabled?: boolean
  className?: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | undefined;
  isVisible?: (control: Control) => boolean;
  options?: RegisterOptions

  constructor({titleComponent, defaultValue, section, disabled, className, type, placeholder, isVisible, options}: {
    titleComponent: React.ReactNode,
    defaultValue: any,
    section: keyof Sections,
    disabled?: boolean,
    className?: string,
    type?: HTMLInputTypeAttribute | undefined,
    placeholder?: string
    isVisible?: (control: Control) => boolean
    options?: RegisterOptions
  }) {
    this.titleComponent = titleComponent
    this.defaultValue = defaultValue
    this.section = section
    this.disabled = disabled || false
    this.className = className || ''
    this.type = type || "text"
    this.placeholder = placeholder || ""
    this.isVisible = isVisible || (() => true)
    this.options = options
  }
}
