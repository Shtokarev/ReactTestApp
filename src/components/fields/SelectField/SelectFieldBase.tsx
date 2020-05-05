import React from "react";
import Select, { components } from "react-select";
import cn from "classnames";
import { ValueType } from "react-select/src/types";

import { ReactComponent as RemoveIcon } from "../../../assets/images/ic_delete-tag.svg";
import "./SelectFieldBase.scss";

export interface IOption {
  value: string | number;
  label: string;
}

interface ISelectFieldBaseProps {
  options?: IOption[];
  value?: IOption;
  onChange: (value: ValueType<IOption>) => void;
  isMulti?: boolean;
  hideArrow?: boolean;
  isDisabled?: boolean;
  [otherProps: string]: any;
}

const MultiValueRemove = (props: any) => {
  return (
    <components.MultiValueRemove {...props}>
      <RemoveIcon />
    </components.MultiValueRemove>
  );
};

const Option = ({ children, ...props }: any) => {
  // disable onMouseMove, onMouseOver props for performance
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = Object.assign(props, { innerProps: rest });

  return <components.Option {...newProps}>{children}</components.Option>;
};

const SelectFieldBase: React.FC<ISelectFieldBaseProps> = (props) => {
  const {
    value,
    onChange,
    options,
    hasError,
    hideArrow,
    className,
    ...rest
  } = props;

  return (
    <div
      className={cn("SelectFieldBase", "bootstrapWrapper", {
        error: hasError,
        hideArrow: props.isMulti || hideArrow,
      })}
    >
      <Select
        className="selectField"
        classNamePrefix="react-select"
        value={value}
        onChange={onChange}
        options={options}
        components={{ MultiValueRemove, Option }}
        {...rest}
      />
    </div>
  );
};

export default SelectFieldBase;
