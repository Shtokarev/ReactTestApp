import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FORM_ERROR } from "final-form";

import { asThunk } from "../../stores/common/thunk.helper";
import { authByEmail, AuthByEmailPayload } from "../../stores";
import { routes } from "../../routes";
import Login from "../../modules/Auth/Login/Login";
import { getFingerPrintId } from "../../utils/fingerPrint";

interface LoginPageDispatchProps {
  authByEmail: any;
  push: (path: string) => any;
}

const LoginPage: React.FC<LoginPageDispatchProps> = ({ authByEmail, push }) => {
  console.log("LoginPage render!");

  const goSignup = () => push(routes.signup());

  const goHome = () => push(routes.map());

  const onSubmitLogin = async (values: any) => {
    const { email, password } = values;

    try {
      const fingerprint = await getFingerPrintId();

      const payload: AuthByEmailPayload = {
        email,
        password,
        fingerprint,
      };

      await authByEmail(payload);
      goHome();
    } catch (error) {
      return error.error ? { [FORM_ERROR]: error.error } : error;
    }
  };

  return <Login goSignup={goSignup} goHome={goHome} onSubmit={onSubmitLogin} />;
};

const mapDispatchToProps = {
  authByEmail: asThunk(authByEmail),
  push,
};

export default connect(null, mapDispatchToProps)(LoginPage);
