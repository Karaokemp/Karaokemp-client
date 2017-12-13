import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSongFormComponent } from './submit-song-form.component';

describe('SubmitSongFormComponent', () => {
  let component: SubmitSongFormComponent;
  let fixture: ComponentFixture<SubmitSongFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitSongFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitSongFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
