import React, { useState, useRef } from "react";
import { FieldRenderProps, Field } from "react-final-form";
import cn from "classnames";
import { AppLoader } from "../../AppLoader/AppLoader";
import css from "./InputIconField.module.scss";

interface InputIconFieldProps {
  name: string;
  label?: string;
  buttonLabel?: string;
  prompt?: string;
  className?: string;
  errorCallback?: ({ error }: { error: string | null }) => any;
}

// TODO - check when back will be ready
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const InputIconField: React.FC<InputIconFieldProps> = (props) => {
  const { name, label, buttonLabel, prompt, className, errorCallback } = props;

  const [specifiedFile, setSpecifiedFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const refOnChange = useRef<any>(null);

  const validatorAndFileUpload = async (values: FileList): Promise<any> => {
    if (!values || !values.length) {
      return;
      // return 'Required';
    }

    const file = values[0];

    if (
      file.name === specifiedFile?.name &&
      file.size === specifiedFile?.size &&
      file.lastModified === specifiedFile?.lastModified
    ) {
      return;
    }

    setLoading(true);
    // TODO IMPLEMENT real uploading (wait backend, mock post request for now)
    try {
      await sleep(500);
      const result = true; // Math.random() * 10 > 6;

      if (!result) {
        throw new Error("loading error: 404");
      }
    } catch (er) {
      setSpecifiedFile(undefined);

      if (refOnChange.current) {
        refOnChange.current(null);
      }

      if (errorCallback) {
        errorCallback({ error: er.message });
      }

      return;
    } finally {
      setLoading(false);
    }

    setSpecifiedFile(file);
  };

  const renderWrappedPrompt = () => (
    <>
      {prompt?.split("\n").map((item, index) => (
        <div className={css.fileName} key={index}>
          {item}
        </div>
      ))}
    </>
  );

  const renderPrompt = () => (
    <div className={css.prompt}>
      {specifiedFile ? "Uploaded file" : renderWrappedPrompt()}
      {specifiedFile && (
        <div className={css.fileName}>{specifiedFile.name}</div>
      )}
    </div>
  );

  const renderField = () => (
    <Field name={name} validate={validatorAndFileUpload}>
      {(props: FieldRenderProps<any, HTMLElement>) => {
        const {
          input: { value, onChange, ...input },
          meta: {
            error,
            submitError,
            touched,
            dirtySinceLastSubmit,
            validating,
          },
        } = props;

        const hasError =
          (error && touched && !validating) ||
          (!dirtySinceLastSubmit && submitError && touched && !validating);

        const handleChange = ({
          target,
        }: React.ChangeEvent<HTMLInputElement>) => {
          onChange(target.files); // instead of the default target.value
        };

        if (refOnChange !== null) {
          refOnChange.current = onChange;
        }

        return (
          <label className={cn(className, css.buttonContainer)}>
            <input {...input} type="file" onChange={handleChange} {...props} />
            <div className={css.button}>{buttonLabel}</div>
            {hasError && <p className={css.error}>{error || submitError}</p>}
          </label>
        );
      }}
    </Field>
  );

  return (
    <>
      {label && <span className={css.mobileLabel}>{label}</span>}
      <div className={cn(css.container, className)}>
        {label && <span>{label}</span>}
        {renderPrompt()}
        {renderField()}
        {loading && <AppLoader className={css.loader} />}
      </div>
    </>
  );
};
