
import { Action } from '@ngrx/store';

export enum AppActionsTypes {
  INIT_APP = 'Init App'
}

export class InitApp implements Action {
  readonly type = AppActionsTypes.INIT_APP;
  constructor() {}
}

export type AppActions = InitApp;

