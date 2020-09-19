import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { FORM_ERROR } from "final-form";

import { asThunk } from "store/common/thunk.helper";
import { authByEmail, registerUser, RegisterPayload } from "store";
import Signup, { Values } from "modules/Auth/Signup/Signup";
import { getFingerPrintId } from "utils/fingerPrint";
import { routes } from "routes";

interface SignupPageProps {
  registerUser: any;
  authByEmail: any;
}

const SignupPage: React.FC<SignupPageProps> = (props) => {
  let history = useHistory();

  console.log("SignupPage render!");
  const { registerUser } = props;

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

  const goSignin = () => history.push(routes.login());

  const goHome = () => history.push(routes.map());

  return (
    <Signup goSignin={goSignin} goHome={goHome} onSubmit={onSubmitSignup} />
  );
};

const mapDispatchToProps = {
  registerUser: asThunk(registerUser),
  authByEmail: asThunk(authByEmail),
};

export default connect(null, mapDispatchToProps)(SignupPage);
