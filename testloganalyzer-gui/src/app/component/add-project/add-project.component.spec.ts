import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {AddProjectComponent} from './add-project.component';
import {RouterTestingModule} from '@angular/router/testing';
import {
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatListModule,
  MatStepperModule,
  MatTabsModule
} from '@angular/material';
import {CovalentFileModule, CovalentLoadingModule, CovalentMessageModule} from '@covalent/core';
import {FormsModule} from '@angular/forms';
import {ElasticsearchService} from '../../service/elasticsearch.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BreadcrumbsModule} from 'ng2-breadcrumbs';

describe('Component: Add Project', () => {
  let debugElement: DebugElement;
  let fixture: ComponentFixture<AddProjectComponent>;
  let service: ElasticsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatIconModule, MatCardModule, MatFormFieldModule, MatTabsModule, CovalentMessageModule,
        CovalentLoadingModule, CovalentFileModule, MatStepperModule, MatListModule, FormsModule, HttpClientTestingModule,
        BreadcrumbsModule],
      declarations: [AddProjectComponent],
      providers: [ElasticsearchService]
    });
    fixture = TestBed.createComponent(AddProjectComponent);
    debugElement = fixture.debugElement;
    service = TestBed.get(ElasticsearchService);
  });

  it('Should create the component', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
