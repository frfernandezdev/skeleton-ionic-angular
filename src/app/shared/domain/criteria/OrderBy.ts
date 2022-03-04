import { StringValueObject } from '../value-object/StringValueObject';

export class OrderBy extends StringValueObject {
	public constructor(value: string) {
		super(value);
	}
}
