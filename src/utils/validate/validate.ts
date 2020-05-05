import format from 'string-template';
import { Validator } from 'class-validator';

export interface IOption {
  value: string | number;
  label: string;
}

export const DEFAULT_MAX_LENGTH = 255;
export const MESSAGE_REQUAIRED = 'Required';
export const MESSAGE_MIN_LENGTH =
  'Field must include at least {minLength} characters';
export const MESSAGE_MAX_LENGTH =
  'Field must have {maxValue} characters or less';
export const MESSAGE_EMAIL_NOT_VALID = 'Please enter a valid e-mail address';
export const MESSAGE_URL_NOT_VALID = 'Please enter a valid url address';
export const MESSAGE_MUST_BIGGER_OR_EQUAL =
  'Value must be greater or equal than {fieldName}';
export const MESSAGE_MUST_LOWER_OR_EQUAL =
  'Value must be lower or equal than {fieldName}';

const validator = new Validator();

export const compose = (validators: any[]) => (value?: string) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const required = (message?: string) => {
  return (value?: string) => {
    return value && value.toString().trim()
      ? null
      : message || MESSAGE_REQUAIRED;
  };
};

export const minLength = (minLength: number, errorText?: string) => {
  return (value?: string) => {
    const trimedValue = value && value.trim();
    if (trimedValue && trimedValue.length < minLength) {
      return format(errorText || MESSAGE_MIN_LENGTH, { minLength });
    }
    return undefined;
  };
};

export const maxLength = (
  maxValue: number = DEFAULT_MAX_LENGTH,
  message?: string
) => {
  return (value?: string) => {
    if (value && value.length > maxValue) {
      return format(message || MESSAGE_MAX_LENGTH, { maxValue });
    }
    return undefined;
  };
};

export const validateEmail = (mail: string) => {
  return validator.isEmail(mail);
};

export const validateURL = (url: string) => {
  return validator.isURL(url);
};

export const email = () => {
  return (value?: string) => {
    const valueTrimmed = (value || '').trim();
    if (valueTrimmed && valueTrimmed.length > 0) {
      const isValid = validateEmail(valueTrimmed);
      return isValid ? undefined : MESSAGE_EMAIL_NOT_VALID;
    }
    return undefined;
  };
};

export const url = () => {
  return (value?: string) => {
    const valueTrimmed = (value || '').trim();
    if (valueTrimmed && valueTrimmed.length > 0) {
      const isValid = validateURL(valueTrimmed);
      return isValid ? undefined : MESSAGE_URL_NOT_VALID;
    }
    return undefined;
  };
};

export const biggerOrEqualThan = (b: number, fieldName: string) => {
  return (value?: string | IOption) => {
    if (value) {
      if (typeof b !== 'undefined') {
        const a: number =
          typeof value === 'object' && 'value' in value
            ? Number(value.value)
            : Number(value);

        return a >= b
          ? undefined
          : format(MESSAGE_MUST_BIGGER_OR_EQUAL, { fieldName: fieldName || b });
      } else {
        return format(MESSAGE_MUST_BIGGER_OR_EQUAL, { fieldName });
      }
    }
  };
};

export const lowerOrEqualThan = (b: number, fieldName: string) => {
  return (value?: string | IOption) => {
    if (value) {
      if (b) {
        const a: number =
          typeof value === 'object' && 'value' in value
            ? Number(value.value)
            : Number(value);

        return a <= b
          ? undefined
          : format(MESSAGE_MUST_LOWER_OR_EQUAL, { fieldName: fieldName || b });
      } else {
        return format(MESSAGE_MUST_LOWER_OR_EQUAL, { fieldName });
      }
    }
  };
};
