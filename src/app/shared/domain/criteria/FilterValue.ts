import { StringValueObject } from '../value-object/StringValueObject';

export class FilterValue extends StringValueObject {
  public constructor(value: string) {
    super(value);
  }
}
