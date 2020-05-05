import React from "react";
import { connect } from "react-redux";
import cn from "classnames";

import { Avatar } from "../Avatar/Avatar";
import { UserState, AppState } from "../../stores";
import css from "./ContentContainerHeader.module.scss";

interface ContentContainerHeaderProps {
  title?: string;
  className?: string;
  user: UserState;
}

const ContentContainerHeader: React.FC<ContentContainerHeaderProps> = ({
  className,
  title,
  user,
}) => {
  return (
    <div className={cn(css.headerFrame, className)}>
      <span>{title}</span>
      <div className={css.userContainer}>
        <span>Shtokarev Yuri</span>
        <Avatar url="https://avatars1.githubusercontent.com/u/37445718?s=52&v=4" />
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(ContentContainerHeader);
