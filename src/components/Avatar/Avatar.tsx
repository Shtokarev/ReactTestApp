import React, { useState } from "react";
import cn from "classnames";

import css from "./Avatar.module.scss";
import defaultAvatar from "../../assets/images/avatar.png";

interface AvatarProps {
  noBorder?: boolean;
  className?: string;
  url?: string;
}

export const Avatar = React.memo(
  ({ url, className, noBorder = false }: AvatarProps) => {
    const [error, setError] = useState<boolean>(false);

    const onError = () => {
      setError(true);
    };

    return (
      <img
        src={url && !error ? url : defaultAvatar}
        className={cn(css.avatar, className, { [css.noBorder]: noBorder })}
        onError={onError}
        alt="Avatar"
      />
    );
  }
);
