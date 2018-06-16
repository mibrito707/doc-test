import { Action } from '@ngrx/store';
import { CaseData } from '../../models';

export enum CaseActionsTypes {
  LOAD_CASES = 'Load cases',
  LOAD_CASES_SUCCESS = 'Load cases succedded'
}

export class LoadCases implements Action {
  readonly type = CaseActionsTypes.LOAD_CASES;
  constructor() {}
}
export class LoadCasesSuccess implements Action {
  readonly type = CaseActionsTypes.LOAD_CASES_SUCCESS;
  constructor(public payload: CaseData[] = []) {}
}

export type CasesActions = LoadCases | LoadCasesSuccess;
