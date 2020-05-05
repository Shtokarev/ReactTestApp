import React, { useState } from "react";
import { Form, FormSpy } from "react-final-form";
import { FormState } from "final-form";
import { motion, AnimatePresence } from "framer-motion";

import { MainLogo } from "../../../components/MainLogo/MainLogo";
import {
  InputField,
  InputFieldFinal,
  SelectField,
  SelectFieldFinal,
  IOption,
} from "../../../components/fields";
import { ContentContainer } from "../../../components/ContentContainer/ContentContainer";
import Validate from "../../../utils/validate";
import { Button } from "../../../components/uikit/Button";
import { AccountsType } from "../../../stores";
import css from "./Signup.module.scss";

export interface AccountTypeSelectOption extends IOption {
  value: AccountsType;
  label: string;
}

export interface Values {
  address?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  password?: string;
  select?: AccountTypeSelectOption;
  pin?: string;
}

interface SignupProps {
  goSignin: () => void;
  goHome: () => void;
  onSubmit: (values: Values) => any;
}

const selectOptios = [
  { value: "guest", label: "Guest" },
  { value: "user", label: "User" },
  { value: "admin", label: "Administrator" },
] as AccountTypeSelectOption[];

const Signup: React.FC<SignupProps> = (props) => {
  console.log("Signup render!");
  const { goSignin, goHome, onSubmit } = props;

  const [accountType, setAccountType] = useState<AccountsType>("guest");

  const onChangeHandler = (value: FormState<Values>) => {
    if (value.active === "select" && value.modified?.select) {
      const type = value.values.select?.value;

      if (type) {
        setAccountType(type);
      }
    }
  };

  const renderSelect = () => (
    <SelectFieldFinal
      name="select"
      className={css.selectBlock}
      component={SelectField}
      label="Account type"
      isSearchable={false}
      options={selectOptios}
      initialValue={selectOptios[0]}
    />
  );

  const renderAdminInputs = () => (
    <AnimatePresence>
      {accountType === "admin" && (
        <motion.div
          initial={{ height: "0px", opacity: 0 }}
          animate={{ height: "100%", opacity: [null, 0.1, 1] }}
          exit={{ height: "0px", opacity: [null, 0, 0, 0, 0] }}
          transition={{ duration: 0.25 }}
        >
          <InputFieldFinal
            name="pin"
            type="text"
            className={css.input}
            component={InputField}
            label="PIN code"
            placeholder="your pin code for admin access"
            validate={Validate.compose([
              Validate.minLength(4),
              Validate.maxLength(4),
            ])}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderUserInputs = () => (
    <AnimatePresence>
      {accountType !== "guest" && (
        <motion.div
          initial={{ height: "0px", opacity: 0 }}
          animate={{ height: "100%", opacity: [null, 0, 1] }}
          exit={{ height: "0px", opacity: [null, 0, 0, 0, 0] }}
          transition={{ duration: 0.25 }}
        >
          <InputFieldFinal
            name="firstName"
            type="text"
            className={css.input}
            component={InputField}
            label="First Name"
            placeholder="your first name"
            validate={Validate.compose([Validate.maxLength(128)])}
          />

          <InputFieldFinal
            name="lastName"
            type="text"
            className={css.input}
            component={InputField}
            label="Last Name"
            placeholder="your last name"
            validate={Validate.compose([Validate.maxLength(128)])}
          />

          <InputFieldFinal
            name="address"
            type="text"
            className={css.input}
            component={InputField}
            label="Address"
            placeholder="your address"
            validate={Validate.compose([Validate.maxLength(255)])}
          />

          <InputFieldFinal
            name="avatar"
            type="text"
            className={css.input}
            component={InputField}
            label="Avatar"
            placeholder="your avatar link"
            validate={Validate.compose([
              Validate.maxLength(320),
              Validate.url(),
            ])}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

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

      {renderUserInputs()}
      {renderAdminInputs()}

      <InputFieldFinal
        name="password"
        type="password"
        password
        className={css.input}
        component={InputField}
        label="Password"
        placeholder="yourpassword"
        validate={Validate.compose([
          Validate.minLength(6),
          Validate.maxLength(256),
          Validate.required(),
        ])}
      />
    </>
  );

  const renderForm = () => (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className={css.form}>
          <FormSpy
            subscription={{
              active: true,
              values: true,
              modified: true,
            }}
            onChange={onChangeHandler}
          />
          {renderSelect()}
          {renderInputs()}
          <div className={css.buttonContainer}>
            <Button className={css.signInButton} onClick={goSignin}>
              Sign in
            </Button>
            <Button className={css.submitButton} type="submit">
              Sign up
            </Button>
          </div>
          {submitError && <div className={css.formError}>{submitError}</div>}
        </form>
      )}
    />
  );

  const renderCustomHeader = () => (
    <MainLogo onClick={goHome} className={css.mainLogo} />
  );

  return (
    <div className={css.page}>
      <ContentContainer
        showHeader
        renderCustomHeader={renderCustomHeader}
        className={css.contentContainer}
        centerContent
        centerWithLeftMargin={175}
      >
        <span className={css.title}>Create an account</span>
        {renderForm()}
      </ContentContainer>
    </div>
  );
};

export default Signup;
