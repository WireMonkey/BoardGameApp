import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpansionModalComponent } from './add-expansion-modal.component';

describe('AddExpansionModalComponent', () => {
  let component: AddExpansionModalComponent;
  let fixture: ComponentFixture<AddExpansionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExpansionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpansionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
