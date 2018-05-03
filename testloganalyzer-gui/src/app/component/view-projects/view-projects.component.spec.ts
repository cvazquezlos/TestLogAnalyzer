import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ViewProjectsComponent} from './view-projects.component';
import {ElasticsearchService} from '../../service/elasticsearch.service';
import {RouterTestingModule} from '@angular/router/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatTabsModule
} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {
  CovalentDataTableModule,
  CovalentFileModule,
  CovalentLoadingModule,
  CovalentMediaModule,
  CovalentMessageModule
} from '@covalent/core';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {BreadcrumbsModule} from 'ng2-breadcrumbs';
import {FormsModule} from '@angular/forms';

describe('Component: View Projects', () => {
  let component: ViewProjectsComponent;
  let fixture: ComponentFixture<ViewProjectsComponent>;
  let service: ElasticsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatIconModule, MatCardModule, MatFormFieldModule, MatTabsModule, CovalentMessageModule,
        CovalentLoadingModule, CovalentFileModule, MatStepperModule, MatListModule, FormsModule, HttpClientTestingModule,
        BreadcrumbsModule, MatButtonModule, NgbPopoverModule, MatProgressSpinnerModule, CovalentMediaModule, CovalentDataTableModule],
      declarations: [ViewProjectsComponent],
      providers: [ElasticsearchService]
    });
    fixture = TestBed.createComponent(ViewProjectsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ElasticsearchService);
  });

  it('Should create the component', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should display all projects', () => {
    expect(component.projectsRowData.length).toBeGreaterThan(-1);
  });
});
