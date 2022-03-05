import { StringValueObject } from '../value-object/StringValueObject';

export class FilterValue extends StringValueObject {
  public constructor(value: string) {
    super(value);
  }

  public static fromArray(value: string[]): string {
    return value.join(',').toString();
  }
}
