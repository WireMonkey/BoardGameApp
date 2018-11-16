import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGameGridItemComponent } from './board-game-grid-item.component';

describe('BoardGameGridItemComponent', () => {
  let component: BoardGameGridItemComponent;
  let fixture: ComponentFixture<BoardGameGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardGameGridItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardGameGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
