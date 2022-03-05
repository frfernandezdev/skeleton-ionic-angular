import type { Operator } from 'src/app/shared/domain/criteria/FilterOperator';
import type { Filter } from 'src/app/shared/domain/criteria/Filter';
import { HttpParams } from '@angular/common/http';
import { Query, Type } from '@angular/core';

export enum TypeQueryEnum {
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
    >({});
  }

  private parseValueToString(operator, value) {
    return [operator, value].join(':');
  }

	private parseValueToRange(operator, value) {
		return [operator, []]
	}

  private equalQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return { field: field.value, value: value.value };
  }

  private notEqualQuery(filter: Filter): QueryObject {
    const { field, value } = filter;
    return { field: field.value, value: `!${value.value}` };
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
