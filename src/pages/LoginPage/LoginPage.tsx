import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { FORM_ERROR } from "final-form";

import { asThunk } from "store/common/thunk.helper";
import { authByEmail, AuthByEmailPayload } from "store";
import { routes } from "routes";
import Login from "modules/Auth/Login/Login";
import { getFingerPrintId } from "utils/fingerPrint";

interface LoginPageDispatchProps {
  authByEmail: any;
}

const LoginPage: React.FC<LoginPageDispatchProps> = ({ authByEmail }) => {
  let history = useHistory();

  console.log("LoginPage render!");

  const goSignup = () => history.push(routes.signup());

  const goHome = () => history.push(routes.map());

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
};

export default connect(null, mapDispatchToProps)(LoginPage);
