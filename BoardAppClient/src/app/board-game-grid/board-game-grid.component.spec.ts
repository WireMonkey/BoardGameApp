import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGameGridComponent } from './board-game-grid.component';

describe('BoardGameGridComponent', () => {
  let component: BoardGameGridComponent;
  let fixture: ComponentFixture<BoardGameGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardGameGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardGameGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
