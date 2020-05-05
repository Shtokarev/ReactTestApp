import React from "react";
import cn from "classnames";
import { ReactComponent as HiddenPass } from "../../../../assets/images/ic_hidden_pass.svg";
import { ReactComponent as VisiblePass } from "../../../../assets/images/ic_visible_pass.svg";
import css from "./Eye.module.scss";

interface IEyeProps {
  className?: string;
  showed: boolean;
  onClick: () => void;
}

export const Eye = (props: IEyeProps) => {
  const { className, showed, onClick } = props;

  return (
    <div className={cn(className, css.eye)} onClick={onClick}>
      {showed ? (
        <VisiblePass className={css.open} />
      ) : (
        <HiddenPass className={css.close} />
      )}
    </div>
  );
};
