import React, { useState } from "react";
import { FieldRenderProps } from "react-final-form";
import cn from "classnames";
import { BaseField } from "../BaseField/BaseField";
import { FinalField } from "../FinalField/FinalField";
import { Eye } from "./Eye/Eye";
import css from "./InputField.module.scss";

interface InputFieldProps extends FieldRenderProps<any, HTMLElement> {
  label?: string;
  className?: string;
  description?: string;
  password?: boolean;
  type?: string;
  placeholder?: string;
  requiredmark?: boolean;
  // [key: string]: any;
}

export const InputField = React.memo((props: InputFieldProps) => {
  const { input, password, type, placeholder } = props;
  const [passwordShowed, setPasswordShowed] = useState<boolean>(false);
  const handleEyeClick = () => setPasswordShowed(!passwordShowed);

  const renderField = (hasError?: boolean) => (
    <div className={cn(css.wrapper, css.bootstrapStyle, hasError && css.error)}>
      <input
        className={cn(css.input, hasError && css.error)}
        {...input}
        placeholder={placeholder}
        type={
          passwordShowed ? "text" : password ? "password" : type || input.type
        }
      />
      {password && (
        <Eye
          showed={passwordShowed}
          onClick={handleEyeClick}
          className={css.eye}
        />
      )}
    </div>
  );

  return <BaseField renderField={renderField} {...props} />;
});

export const InputFieldFinal = FinalField<InputFieldProps>();
