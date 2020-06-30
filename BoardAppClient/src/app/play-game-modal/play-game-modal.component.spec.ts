import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayGameModalComponent } from './play-game-modal.component';

describe('PlayGameModalComponent', () => {
  let component: PlayGameModalComponent;
  let fixture: ComponentFixture<PlayGameModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayGameModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
