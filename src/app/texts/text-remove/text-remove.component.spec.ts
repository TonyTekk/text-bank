import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextRemoveComponent } from './text-remove.component';

describe('TextRemoveComponent', () => {
  let component: TextRemoveComponent;
  let fixture: ComponentFixture<TextRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
