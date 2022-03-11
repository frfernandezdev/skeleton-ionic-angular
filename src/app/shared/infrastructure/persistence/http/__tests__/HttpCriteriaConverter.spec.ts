import { HttpParams } from '@angular/common/http';
import { Criteria } from 'src/app/shared/domain/criteria/Criteria';
import { Filter } from 'src/app/shared/domain/criteria/Filter';
import { FilterField } from 'src/app/shared/domain/criteria/FilterField';
import {
  FilterOperator,
  Operator,
} from 'src/app/shared/domain/criteria/FilterOperator';
import { Filters } from 'src/app/shared/domain/criteria/Filters';
import { FilterValue } from 'src/app/shared/domain/criteria/FilterValue';
import { Order } from 'src/app/shared/domain/criteria/Order';
import { HttpCriteriaConverter } from '../HttpCriteriaConverter';

describe('HttpCriteriaConverter', () => {
  it('should make a criteria', () => {
    const filter = new Filter(
      new FilterField('name'),
      new FilterOperator(Operator.EQUAL),
      new FilterValue('john')
    );
    const filters = new Filters([filter]);
    const order = Order.fromValues('name', 'asc');
    const criteria = new Criteria(filters, order, 10, 0);
    const converter = new HttpCriteriaConverter();

    const httpParams: HttpParams = converter.convert(criteria);

    expect(httpParams.toString()).toContain('name=john');
    expect(httpParams.toString()).toContain('orderBy=name');
    expect(httpParams.toString()).toContain('orderType=name');
    expect(httpParams.toString()).toContain('limit=10');
    expect(httpParams.toString()).toContain('offset=0');
  });
});
