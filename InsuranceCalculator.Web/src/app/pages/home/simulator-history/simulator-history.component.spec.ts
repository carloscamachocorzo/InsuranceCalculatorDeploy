import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorHistoryComponent } from './simulator-history.component';

describe('SimulatorHistoryComponent', () => {
  let component: SimulatorHistoryComponent;
  let fixture: ComponentFixture<SimulatorHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulatorHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatorHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
