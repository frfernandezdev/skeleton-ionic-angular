import type { Filters } from './Filters';
import type { Order } from './Order';

export class Criteria {
	public readonly filters: Filters;

	public readonly order: Order;

	public readonly limit?: number;

	public readonly offset?: number;

	public constructor(
		filters: Filters,
		order?: Order,
		limit?: number,
		offset?: number
	) {
		this.filters = filters;
		this.order = order;
		this.offset = offset || 0;
		this.limit = limit || 100;
	}

	public hasFilters(): boolean {
		return this.filters.filters.length > 0;
	}

	public hasOrder(): boolean {
		return this.order ? this.order.hasOrder() : false;
	}
}
