import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AddExecComponent} from './add-exec.component';

describe('Component: Add Execution', () => {
  let component: AddExecComponent;
  let fixture: ComponentFixture<AddExecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExecComponent]
    });
    fixture = TestBed.createComponent(AddExecComponent);
    component = fixture.componentInstance;
  });

  it('Should create the component', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
