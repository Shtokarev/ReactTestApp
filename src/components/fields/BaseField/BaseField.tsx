import React from "react";
import { FieldRenderProps } from "react-final-form";
import cn from "classnames";
import css from "./BaseField.module.scss";

interface BaseFieldProps extends FieldRenderProps<any, HTMLElement> {
  label?: string | JSX.Element;
  className?: string;
  description?: string;
  requiredmark?: boolean;
  renderField: (hasError?: boolean) => any;
}

export const BaseField: React.FC<BaseFieldProps> = (props) => {
  const {
    meta: { error, submitError, touched, dirtySinceLastSubmit },
    label,
    className,
    description,
    renderField,
    requiredmark,
  } = props;

  const hasError =
    (error && touched) || (!dirtySinceLastSubmit && submitError && touched);

  return (
    <div className={cn(css.wrapper, css.bootstrapStyle, className)}>
      {label && (
        <label className={cn(css.label, requiredmark && css.requiredmark)}>
          {label}
        </label>
      )}
      {description && <p className={css.description}>{description}</p>}
      <div className={css.control}>
        {renderField(hasError)}

        {hasError && <p className={css.error}>{error || submitError}</p>}
      </div>
    </div>
  );
};
