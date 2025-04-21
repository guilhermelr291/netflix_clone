export interface FieldComparer {
  field: string;
  fieldToCompare: string;
  compare(data: any): boolean;
}
