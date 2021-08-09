import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamComponent } from './add-team.component';

describe('AddDepartComponent', () => {
  let component: AddTeamComponent;
  let fixture: ComponentFixture<AddTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});