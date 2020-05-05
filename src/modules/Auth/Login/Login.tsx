import React from "react";
import { Form } from "react-final-form";

import { MainLogo } from "../../../components/MainLogo/MainLogo";
import { InputField, InputFieldFinal } from "../../../components/fields";
import { ContentContainer } from "../../../components/ContentContainer/ContentContainer";
import Validate from "../../../utils/validate/";
import { Button } from "../../../components/uikit/Button";
import css from "./Login.module.scss";

interface LoginProps {
  goSignup: () => void;
  goHome: () => void;
  onSubmit: (values: any) => any;
}

const Login: React.FC<LoginProps> = ({ goSignup, goHome, onSubmit }) => {
  console.log("Login render!");

  const renderInputs = () => (
    <>
      <InputFieldFinal
        name="email"
        type="text"
        className={css.input}
        component={InputField}
        label="Email"
        placeholder="yourmail@example.com"
        validate={Validate.compose([
          Validate.minLength(6),
          Validate.maxLength(255),
          Validate.required(),
          Validate.email(),
        ])}
      />
      <InputFieldFinal
        name="password"
        type="password"
        password
        className={css.input}
        component={InputField}
        label="Password"
        placeholder="enter your password here"
        validate={Validate.compose([
          Validate.minLength(6),
          Validate.maxLength(256),
          Validate.required(),
        ])}
      />
    </>
  );

  const renderCustomHeader = () => (
    <MainLogo onClick={goHome} className={css.mainLogo} />
  );

  const renderForm = () => (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className={css.form}>
          {renderInputs()}
          <div className={css.buttonContainer}>
            <Button className={css.signUpButton} onClick={goSignup}>
              Sign up
            </Button>
            <Button className={css.submitButton} type="submit">
              Sign in
            </Button>
          </div>
          {submitError && <div className={css.formError}>{submitError}</div>}
        </form>
      )}
    />
  );

  return (
    <div className={css.page}>
      <ContentContainer
        showHeader
        renderCustomHeader={renderCustomHeader}
        className={css.contentContainer}
        centerContent
        centerWithLeftMargin={120}
        wider={false}
      >
        <span className={css.title}>Login</span>
        {renderForm()}
      </ContentContainer>
    </div>
  );
};

export default Login;
