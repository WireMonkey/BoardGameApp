import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoardGameModalComponent } from './add-board-game-modal.component';

describe('AddBoardGameModalComponent', () => {
  let component: AddBoardGameModalComponent;
  let fixture: ComponentFixture<AddBoardGameModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBoardGameModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoardGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
