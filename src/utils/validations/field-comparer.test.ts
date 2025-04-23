import { describe, expect, test } from 'vitest';
import { FieldComparerImpl } from './field-comparer';

const makeSut = (): FieldComparerImpl => {
  return new FieldComparerImpl('field', 'fieldToCompare');
};

describe('FieldComparerImpl', () => {
  test('should return true if fields are equal', () => {
    const data = { field: 'same_value', fieldToCompare: 'same_value' };
    const sut = makeSut();

    const result = sut.compare(data);

    expect(result).toBe(true);
  });
  test('should return false if fields are different', () => {
    const data = { field: 'value', fieldToCompare: 'another_value' };
    const sut = makeSut();

    const result = sut.compare(data);

    expect(result).toBe(false);
  });
});
