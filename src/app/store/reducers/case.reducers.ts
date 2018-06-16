import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { CaseData } from '../../models';
import {CaseActionsTypes, CasesActions} from '../actions';

export interface CaseState extends EntityState<CaseData> {}

export const caseAdapter: EntityAdapter<CaseData> = createEntityAdapter<CaseData>();

export const initialState: CaseState = caseAdapter.getInitialState();

export function caseReducer(
  state: CaseState = initialState,
  action: CasesActions
) {
  switch (action.type) {
    case CaseActionsTypes.LOAD_CASES_SUCCESS:
    console.log(action.payload);
      return caseAdapter.addAll(action.payload, state);
    default:
      return state;
  }
}
