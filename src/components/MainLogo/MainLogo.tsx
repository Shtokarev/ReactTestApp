import React from "react";
import cn from "classnames";

import mainLogo from "../../assets/images/logo/logo.png";
import mainLogo2x from "../../assets/images/logo/logo@2x.png";
import mainLogo3x from "../../assets/images/logo/logo@3x.png";

import css from "./MainLogo.module.scss";

interface MainLogoProps {
  onClick?: () => void;
  className?: string;
}

export const MainLogo: React.FC<MainLogoProps> = ({ onClick, className }) => (
  <div
    className={cn(css.logoContainer, className)}
    {...(onClick ? { onClick } : {})}
  >
    <img
      src={mainLogo}
      srcSet={`${mainLogo2x} 2x, ${mainLogo3x} 3x`}
      alt="Fullstack logo"
    ></img>
  </div>
);
