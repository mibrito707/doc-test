import { TestBed, inject } from '@angular/core/testing';

import { NoteDataFakerService } from './note-data-faker.service';

describe('NoteDataFakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteDataFakerService]
    });
  });

  it('should be created', inject([NoteDataFakerService], (service: NoteDataFakerService) => {
    expect(service).toBeTruthy();
  }));
});
