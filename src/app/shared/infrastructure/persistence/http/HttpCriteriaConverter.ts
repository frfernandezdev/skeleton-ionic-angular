import type { Filter } from 'src/app/shared/domain/criteria/Filter';
import { Operator } from 'src/app/shared/domain/criteria/FilterOperator';
import { HttpParams } from '@angular/common/http';
import { Criteria } from 'src/app/shared/domain/criteria/Criteria';
import { Filters } from 'src/app/shared/domain/criteria/Filters';

export enum TypeQueryEnum {
  EQUAL = '=',
  NOT_EQUAL = '!',
  GT = 'gt',
  LT = 'lt',
  GOET = 'gte',
  LOET = 'lte',
  CONTAINS = 'in',
  NOT_CONTAINS = '!in',
  LIKE = 'like',
  NOT_LIKE = '!like',
  ILIKE = 'ilike',
  NOT_ILIKE = 'not_like',
  BETWEEN = 'range',
  NOT_BETWEEN = '!range',
}

type QueryObject = {
  field: string;
  value: string;
};

interface TransformerFunction<T, K> {
  (value: T): K;
}

export class HttpCriteriaConverter {
  private queryTransformers: Map<
    Operator,
    TransformerFunction<Filter, QueryObject>
  >;

  public constructor() {
    this.queryTransformers = new Map<
      Operator,
      TransformerFunction<Filter, QueryObject>
    >([
      [Operator.EQUAL, this.equalQuery],
      [Operator.NOT_EQUAL, this.notEqualQuery],
      [Operator.GT, this.greaterThatQuery],
      [Operator.LT, this.lessThanQuery],
      [Operator.GOET, this.greaterOrEqualThanQuery],
      [Operator.LOET, this.lessOrEqualThanQuery],
      [Operator.CONTAINS, this.containsThanQuery],
      [Operator.NOT_CONTAINS, this.notContainsThatQuery],
      [Operator.LIKE, this.likeThanQuery],
      [Operator.NOT_LIKE, this.noLikeThanQuery],
      [Operator.ILIKE, this.ilkeThanQuery],
      [Operator.NOT_ILIKE, this.noILikeThanQuery],
      [Operator.BETWEEN, this.betweenThanQuery],
      [Operator.NOT_BETWEEN, this.notBetweenThanQuery],
    ]);
  }

  public convert(criteria: Criteria): HttpParams {
    const { filters, order, offset, limit } = criteria;
    const params = new HttpParams();

    if (criteria.hasOrder()) {
      const { orderBy, orderType } = order;
      params.set('orderBy', orderBy.value);
      params.set('orderType', orderType.value);
    }

    if (offset) {
      params.set('offset', offset);
    }

    params.set('limit', limit);
    params.set('offset', offset);

    if (criteria.hasFilters()) {
      this.generateQuery(params, filters);
    }

    return params;
  }

  protected generateQuery(params: HttpParams, filters: Filters): void {
    filters.filters.map((filter) => {
      const { field, value } = this.queryForFilter(filter);

      params.set(field, value);
    });
  }

  private queryForFilter(filter: Filter): QueryObject {
    const functionToApply = this.queryTransformers.get(filter.operator.value);

    if (!functionToApply) {
      throw Error(`Unexpected operator value ${filter.operator.value}`);
    }

    return functionToApply(filter);
  }

  private parseValueToString(operator: string, value: string): string {
    return [operator, value].join(':');
  }

  private equalQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return {
      field: field.value,
      value: value.value,
    };
  }

  private notEqualQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return {
      field: field.value,
      value: `!${value.value}`,
    };
  }

  private greaterThatQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return {
      field: field.value,
      value: this.parseValueToString(TypeQueryEnum.GT, value.value),
    };
  }

  private lessThanQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return {
      field: field.value,
      value: this.parseValueToString(TypeQueryEnum.LT, value.value),
    };
  }

  private greaterOrEqualThanQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return {
      field: field.value,
      value: this.parseValueToString(TypeQueryEnum.GOET, value.value),
    };
  }

  private lessOrEqualThanQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return {
      field: field.value,
      value: this.parseValueToString(TypeQueryEnum.GOET, value.value),
    };
  }

  private containsThanQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return {
      field: field.value,
      value: this.parseValueToString(TypeQueryEnum.CONTAINS, value.value),
    };
  }

  private notContainsThatQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return {
      field: field.value,
      value: this.parseValueToString(TypeQueryEnum.NOT_CONTAINS, value.value),
    };
  }

  private likeThanQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return {
      field: field.value,
      value: this.parseValueToString(TypeQueryEnum.LIKE, value.value),
    };
  }

  private noLikeThanQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return {
      field: field.value,
      value: this.parseValueToString(TypeQueryEnum.NOT_LIKE, value.value),
    };
  }

  private ilkeThanQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return {
      field: field.value,
      value: this.parseValueToString(TypeQueryEnum.ILIKE, value.value),
    };
  }

  private noILikeThanQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return {
      field: field.value,
      value: this.parseValueToString(TypeQueryEnum.NOT_ILIKE, value.value),
    };
  }

  private betweenThanQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return {
      field: field.value,
      value: this.parseValueToString(TypeQueryEnum.BETWEEN, value.value),
    };
  }

  private notBetweenThanQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return {
      field: field.value,
      value: this.parseValueToString(TypeQueryEnum.NOT_BETWEEN, value.value),
    };
  }
}
