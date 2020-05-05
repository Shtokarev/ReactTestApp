import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FORM_ERROR } from "final-form";

import { asThunk } from "../../stores/common/thunk.helper";
import { authByEmail, registerUser, RegisterPayload } from "../../stores";
import Signup, { Values } from "../../modules/Auth/Signup/Signup";
import { getFingerPrintId } from "../../utils/fingerPrint";
import { routes } from "../../routes";

interface SignupPageProps {
  registerUser: any;
  authByEmail: any;
  push: (path: string) => any;
}

const SignupPage: React.FC<SignupPageProps> = (props) => {
  console.log("SignupPage render!");
  const { registerUser, push } = props;

  const onSubmitSignup = async (values: Values) => {
    if (!values.email) {
      return { email: "Email required" };
    }

    if (!values.password) {
      return { password: "Password required" };
    }

    if (!values.select?.value) {
      return { select: "Need to select account type" };
    }

    try {
      const fingerprint = await getFingerPrintId();

      const payload: RegisterPayload = {
        address: values.address,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        avatar: values.avatar,
        role: values.select?.value,
        pin: values.pin,
        fingerprint,
      };

      await registerUser(payload);
      goHome();
    } catch (error) {
      return error.error ? { [FORM_ERROR]: error.error } : error;
    }
  };

  const goSignin = () => push(routes.login());

  const goHome = () => push(routes.map());

  return (
    <Signup goSignin={goSignin} goHome={goHome} onSubmit={onSubmitSignup} />
  );
};

const mapDispatchToProps = {
  registerUser: asThunk(registerUser),
  authByEmail: asThunk(authByEmail),
  push,
};

export default connect(null, mapDispatchToProps)(SignupPage);
