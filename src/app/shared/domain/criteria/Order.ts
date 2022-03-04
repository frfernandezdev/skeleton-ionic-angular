import { OrderBy } from './OrderBy';
import { OrderType, OrderTypes } from './OrderType';

export class Order {
  public readonly orderBy: OrderBy;

  public readonly orderType: OrderType;

  public constructor(orderBy: OrderBy, orderType: OrderType) {
    this.orderBy = orderBy;
    this.orderType = orderType;
  }

  public static fromValues(orderBy?: string, orderType?: string): Order {
    if (!orderBy) {
      return Order.none();
    }

    return new Order(
      new OrderBy(orderBy),
      OrderType.fromValue(orderType || OrderTypes.ASC)
    );
  }

  public static none(): Order {
    return new Order(new OrderBy(''), new OrderType(OrderTypes.NONE));
  }

  public static desc(orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.DESC));
  }

  public static asc(orderBy: string): Order {
    return new Order(new OrderBy(orderBy), new OrderType(OrderTypes.ASC));
  }

  public hasOrder(): boolean {
    return !this.orderType.isNone();
  }
}
