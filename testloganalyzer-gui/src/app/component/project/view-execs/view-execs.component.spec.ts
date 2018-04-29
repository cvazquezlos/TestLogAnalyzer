import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ViewExecsComponent} from './view-execs.component';

describe('Component: View Executions', () => {
  let component: ViewExecsComponent;
  let fixture: ComponentFixture<ViewExecsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewExecsComponent]
    });
    fixture = TestBed.createComponent(ViewExecsComponent);
    component = fixture.componentInstance;
  });

  it('Should create the component', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
