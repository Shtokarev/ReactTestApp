import React from "react";
import { FieldRenderProps } from "react-final-form";

import SelectFieldBase, { IOption } from "./SelectFieldBase";
import { BaseField } from "../BaseField/BaseField";
import { FinalField } from "../FinalField/FinalField";

interface ISelectFieldProps extends FieldRenderProps<any, HTMLElement> {
  className?: string;
  options?: IOption[];
  label?: string;
}

const SelectField: React.FC<ISelectFieldProps> = (props) => {
  const { input, options, value, ...rest } = props;

  const renderField = (hasError?: boolean) => (
    <SelectFieldBase
      options={options}
      hasError={hasError}
      value={value}
      {...input}
      {...rest}
    />
  );

  return <BaseField renderField={renderField} {...props} />;
};

export default SelectField;

export const SelectFieldFinal = FinalField<ISelectFieldProps>();
