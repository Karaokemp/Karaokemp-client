import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongSubmittedComponent } from './song-submitted.component';

describe('SongSubmittedComponent', () => {
  let component: SongSubmittedComponent;
  let fixture: ComponentFixture<SongSubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongSubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
