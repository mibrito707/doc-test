import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientDomain, ClientProblem } from '../../../models';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-service-goals',
  templateUrl: './add-service-goals.component.html',
  styleUrls: ['./add-service-goals.component.scss']
})
export class AddServiceGoalsComponent implements OnInit {
  isLinear = true;
  domainFG: FormGroup;
  problemFG: FormGroup;
  ltgFG: FormGroup;
  stgFG: FormGroup;
  @Input() domain: Observable<ClientDomain[]>;
  noteServicesViewer: BehaviorSubject<ClientProblem>;

  constructor(private fb: FormBuilder) {
    this.domainFG = this.fb.group({
      domain: ['', Validators.required]
    });
    this.problemFG = this.fb.group({
      problem: ['', Validators.required]
    });
    this.ltgFG = this.fb.group({
      ltg: ['', Validators.required]
    });
    this.stgFG = this.fb.group({
      stg: this.fb.array([])
    });
  }

  ngOnInit() {
    this.domainFG.get('domain').valueChanges.subscribe();
  }
}
