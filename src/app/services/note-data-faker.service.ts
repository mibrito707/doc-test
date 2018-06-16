import { Injectable } from '@angular/core';
import {
  ShortTermGoal,
  LongTermGoal,
  ClientProblem,
  ClientDomain,
  CaseData
} from '../models';
import * as uuid from 'uuid/v1';
import * as faker from 'faker';

@Injectable({
  providedIn: 'root'
})
export class NoteDataFakerService {
  constructor() {}

  generateShortTermGoal(): ShortTermGoal {
    return {
      id: uuid(),
      description: faker.lorem.sentence()
    };
  }
  generateLongTermGoal(): LongTermGoal {
    const stgoals: ShortTermGoal[] = [];
    for (let index = 0; index < 3; index++) {
      stgoals.push(this.generateShortTermGoal());
    }
    return {
      id: uuid(),
      description: faker.lorem.sentence(),
      stgoals
    };
  }
  generateClientProblem(): ClientProblem {
    return {
      id: uuid(),
      description: faker.lorem.sentence(),
      ltgoal: this.generateLongTermGoal()
    };
  }
  generateClientDomain(): ClientDomain {
    const problems: ClientProblem[] = [];
    for (let index = 0; index < 3; index++) {
      problems.push(this.generateClientProblem());
    }
    return {
      id: Math.floor(Math.random() * 100 + 1),
      description: faker.lorem.words(),
      problems
    };
  }

  // generateClientInfo(): ClientInfo {
  //   return {
  //     clientId: uuid(),
  //     tag: faker.name.firstName()
  //   };
  // }
  generateCustomerData(): CaseData {
    const domains: ClientDomain[] = [];
    for (let index = 0; index < 3; index++) {
      domains.push(this.generateClientDomain());
    }
    return {
      case: faker.finance.account(5),
      domains
    };
  }
}
