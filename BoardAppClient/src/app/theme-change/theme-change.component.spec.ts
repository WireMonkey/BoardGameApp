import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeChangeComponent } from './theme-change.component';

describe('ThemeChangeComponent', () => {
  let component: ThemeChangeComponent;
  let fixture: ComponentFixture<ThemeChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
