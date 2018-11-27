import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardgameEditModalComponent } from './boardgame-edit-modal.component';

describe('BoardgameEditModalComponent', () => {
  let component: BoardgameEditModalComponent;
  let fixture: ComponentFixture<BoardgameEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardgameEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardgameEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
