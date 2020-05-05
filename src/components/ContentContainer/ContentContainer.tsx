import React from "react";
import cn from "classnames";

import ContentContainerHeader from "../ContentContainerHeader/ContentContainerHeader";
import css from "./ContentContainer.module.scss";

interface ContentContainerProps {
  className?: string;
  showHeader?: boolean;
  headerTitle?: string;
  centerContent?: boolean;
  centerWithLeftMargin?: number;
  renderCustomHeader?: () => JSX.Element;
  wider?: boolean;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className,
  showHeader,
  headerTitle,
  centerContent,
  centerWithLeftMargin,
  renderCustomHeader,
  wider = false,
}) => {
  const renderHeader = () =>
    renderCustomHeader ? (
      renderCustomHeader()
    ) : (
      <ContentContainerHeader title={headerTitle} />
    );

  const renderCenterVerticalBlock = () => (
    <div className={css.centerVertical}></div>
  );

  const renderCentredContent = () => (
    <div className={cn(css.centerContent)}>{children}</div>
  );

  const renderCenteredWithLeftMarginContent = () => (
    <div className={cn(css.centerContent)}>
      <div
        className={css.leftSpace}
        style={{ width: centerWithLeftMargin }}
      ></div>
      <div className={css.centerContainer}>{children}</div>
      <div
        className={css.rightSpace}
        style={{ width: centerWithLeftMargin }}
      ></div>
    </div>
  );

  return (
    <div
      className={cn(
        css.container,
        { [css.centred]: !showHeader && centerContent },
        { [css.wider]: wider },
        className
      )}
    >
      {showHeader && renderHeader()}
      {centerContent
        ? centerWithLeftMargin
          ? renderCenteredWithLeftMarginContent()
          : renderCentredContent()
        : children}
      {showHeader && centerContent && renderCenterVerticalBlock()}
    </div>
  );
};
