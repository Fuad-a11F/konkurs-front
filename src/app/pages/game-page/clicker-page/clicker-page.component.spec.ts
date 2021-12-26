import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickerPageComponent } from './clicker-page.component';

describe('ClickerPageComponent', () => {
  let component: ClickerPageComponent;
  let fixture: ComponentFixture<ClickerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
