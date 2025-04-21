import { FieldComparer } from '../../presentation/protocols/field-comparer';

export class FieldComparerImpl implements FieldComparer {
  constructor(
    private readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  compare(data: any): boolean {
    return data[this.field] === data[this.fieldToCompare];
  }
}
