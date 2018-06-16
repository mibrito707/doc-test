import { TestBed, inject } from '@angular/core/testing';

import { NoteDataService } from './note-data.service';

describe('NoteDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteDataService]
    });
  });

  it('should be created', inject([NoteDataService], (service: NoteDataService) => {
    expect(service).toBeTruthy();
  }));
});
