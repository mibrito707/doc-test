import { Injectable } from '@angular/core';
import { CaseData, ClientDomain } from '../models';
import * as uuid from 'uuid/v1';
import { NoteDataFakerService } from './note-data-faker.service';
import { CaseState } from '../store/reducers';
import { Store } from '@ngrx/store';
import { LoadCases, LoadCasesSuccess } from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class NoteDataService {
  clientData: CaseData[] = [];

  constructor(
    private noteGenerator: NoteDataFakerService,
    private store: Store<CaseState>
  ) {
    this.getClientData();
  }

  private getClientData() {
    for (let index = 0; index < 7; index++) {
      this.clientData.push(this.noteGenerator.generateCustomerData());
    }
    // this.store.dispatch(new LoadCasesSuccess(this.clientData));
  }

  getClientList() {
    return this.clientData.reduce((acc, current) => {
      acc.push(current.case);
      return acc;
    }, []);
  }

  getCaseDomains(clientId): ClientDomain[] {
    const idx = this.clientData.findIndex(c => c.case === clientId);
    return this.clientData[idx].domains;
  }
}
