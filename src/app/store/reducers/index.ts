export * from './app.reducers';
export * from './case.reducers';

import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';
import * as fromCases from './case.reducers';

export const appGlobalReducers: ActionReducerMap<any> = {
  case: fromCases.caseReducer
};

export const selectCaseState = createFeatureSelector<fromCases.CaseState>(
  'cases'
);

export const { selectAll: selectAllCases } = fromCases.caseAdapter.getSelectors(
  selectCaseState
);
