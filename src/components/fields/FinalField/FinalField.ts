import { Field } from 'react-final-form';
import { FieldSubscription } from 'final-form';

// default final Field props
interface FieldOwnProps<T> {
  allowNull?: boolean;
  format?: ((value: any, name: string) => any) | null;
  formatOnBlur?: boolean;
  parse?: ((value: any, name: string) => any) | null;
  name: string;
  isEqual?: (a: any, b: any) => boolean;
  subscription?: FieldSubscription;
  validate?: (value: any, allValues: object) => any;
  value?: any;
  children?: ((props: T) => React.ReactNode) | React.ReactNode;
  component?: React.ComponentType<T> | string;
  render?: (props: T) => React.ReactNode;
}

export type FieldProps<T> = FieldOwnProps<T> & Partial<T>;

export function FinalField<T>(): React.ComponentType<FieldProps<T>> {
  return Field as any;
}
