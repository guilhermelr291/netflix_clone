import { FieldComparerImpl } from '../../../utils/validations/field-comparer';

export const makeFieldComparer = (): FieldComparerImpl => {
  return new FieldComparerImpl('password', 'passwordConfirmation');
};
