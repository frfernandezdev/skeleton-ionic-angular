import { Filter } from './Filter';

export class Filters {
	public readonly filters: Filter[];

	public constructor(filters: Filter[]) {
		this.filters = filters;
	}

	public static fromValues(filters: Array<Map<string, string>>): Filters {
		return new Filters(filters.map(Filter.fromValues));
	}

	public static none(): Filters {
		return new Filters([]);
	}
}
