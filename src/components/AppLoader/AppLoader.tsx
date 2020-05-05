import React from "react";
import cn from "classnames";

import { ReactComponent as Loading } from "../../assets/images/spinner.svg";
import css from "./AppLoader.module.scss";

interface AppLoaderProps {
  className?: string;
}

export const AppLoader: React.FC<AppLoaderProps> = React.memo(
  ({ className }) => (
    <div className={cn(css.container, className)}>
      <Loading />
    </div>
  )
);
