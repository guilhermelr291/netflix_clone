import { FieldComparer } from '../../presentation/protocols/field-comparer';

export class FieldComparerImpl implements FieldComparer {
  constructor(
    public readonly field: string,
    public readonly fieldToCompare: string
  ) {
    this.field = field;
    this.fieldToCompare = fieldToCompare;
  }

  compare(data: any): boolean {
    return data[this.field] === data[this.fieldToCompare];
  }
}
