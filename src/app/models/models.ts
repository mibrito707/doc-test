export interface ClientNote {
  id: string;
  services: ServiceNote[];
  noteDomain: NoteDomain[];
}

export interface ServiceNote {
  id: string;
  date: string;
  setting: string;
  serviceCode: string;
  onBehalf: boolean;
  start: string;
  end: string;
  minutes: string;
  units: string;
}

export interface NoteDomain {
  domain: ClientDomain;
  problem: ClientProblem;
  ltgoal: LongTermGoal;
  stgoals: ShortTermGoal[];
}

export interface ShortTermGoal {
  id: string;
  description: string;
}

export interface LongTermGoal {
  id: string;
  description: string;
  stgoals: ShortTermGoal[];
}

export interface ClientProblem {
  id: string;
  description: string;
  ltgoal: LongTermGoal;
}

export interface ClientDomain {
  id: number;
  description: string;
  problems: ClientProblem[];
}

// export interface ClientInfo {
//   clientId: string;
//   tag: string;
// }

export interface CaseData {
  case: string;
  domains: ClientDomain[];
}
