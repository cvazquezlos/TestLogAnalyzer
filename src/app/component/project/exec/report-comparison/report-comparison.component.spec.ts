import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReportComparisonComponent} from './report-comparison.component';

describe('Component: Report Comparison', () => {
  let component: ReportComparisonComponent;
  let fixture: ComponentFixture<ReportComparisonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportComparisonComponent]
    });
    fixture = TestBed.createComponent(ReportComparisonComponent);
    component = fixture.componentInstance;
  });

  it('Should create the component', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
