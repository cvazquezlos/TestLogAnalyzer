import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ViewProjectsComponent} from './view-projects.component';

describe('Component: View Projects', () => {
  let component: ViewProjectsComponent;
  let fixture: ComponentFixture<ViewProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProjectsComponent]
    });
    fixture = TestBed.createComponent(ViewProjectsComponent);
    component = fixture.componentInstance;
  });

  it('Should create the component', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
