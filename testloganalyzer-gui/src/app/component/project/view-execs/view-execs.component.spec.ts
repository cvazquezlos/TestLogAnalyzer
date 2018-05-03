import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ViewExecsComponent} from './view-execs.component';
import {RouterTestingModule} from '@angular/router/testing';
import {
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
  CovalentMessageModule
} from '@covalent/core';
import {BreadcrumbsModule} from 'ng2-breadcrumbs';
import {FormsModule} from '@angular/forms';
import {ElasticsearchService} from '../../../service/elasticsearch.service';

describe('Component: View Executions', () => {
  let component: ViewExecsComponent;
  let fixture: ComponentFixture<ViewExecsComponent>;
  let service: ElasticsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatIconModule, MatCardModule, MatFormFieldModule, MatTabsModule, CovalentMessageModule,
        CovalentLoadingModule, CovalentFileModule, MatStepperModule, MatListModule, FormsModule, HttpClientTestingModule,
        BreadcrumbsModule, CovalentDataTableModule, MatProgressSpinnerModule],
      declarations: [ViewExecsComponent],
      providers: [ElasticsearchService]
    });
    fixture = TestBed.createComponent(ViewExecsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ElasticsearchService);
  });

  it('Should create the component', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
