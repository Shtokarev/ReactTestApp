import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import cn from "classnames";

import { resetToastifyError } from "../../stores/error/ErrorAction";
import css from "./ErrorMessage.module.scss";

const DEFAULT_DURATION = 3000;

interface ErrorMessageProps {
  error: string | null;
  className?: string;
  duration?: number;
  hideBar?: boolean;
  resetToastifyError: typeof resetToastifyError;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  className,
  duration = DEFAULT_DURATION,
  hideBar = false,
  resetToastifyError,
}) => {
  useEffect(() => {
    if (error) {
      toast(error, {
        className: cn(css.main, className),
        bodyClassName: css.messageBody,
        progressClassName: css.progressBar,
      });
      resetToastifyError();
    }
  }, [error, className, resetToastifyError]);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={duration}
      pauseOnHover
      closeButton={false}
      hideProgressBar={hideBar}
    />
  );
};

const mapDispatchToProps = {
  resetToastifyError,
};

export default connect(null, mapDispatchToProps)(ErrorMessage);
