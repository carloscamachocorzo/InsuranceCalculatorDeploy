import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSimulatorComponent } from './view-simulator.component';

describe('ViewSimulatorComponent', () => {
  let component: ViewSimulatorComponent;
  let fixture: ComponentFixture<ViewSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSimulatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
