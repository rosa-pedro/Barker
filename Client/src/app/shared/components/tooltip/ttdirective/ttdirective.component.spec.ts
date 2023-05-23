import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtdirectiveComponent } from './ttdirective.component';

describe('TtdirectiveComponent', () => {
  let component: TtdirectiveComponent;
  let fixture: ComponentFixture<TtdirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtdirectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtdirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
