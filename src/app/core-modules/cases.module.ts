import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { caseReducer } from '../store/reducers';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('cases', caseReducer)],
  declarations: []
})
export class CasesModule {}
