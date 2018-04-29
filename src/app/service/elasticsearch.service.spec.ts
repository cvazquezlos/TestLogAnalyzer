import {getTestBed, inject, TestBed} from '@angular/core/testing';
import {ElasticsearchService} from './elasticsearch.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Project} from '../model/project.model';

describe('Service: Elasticsearch', () => {
  let httpMock: HttpTestingController;
  let injector: TestBed;
  let service: ElasticsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ElasticsearchService]
    });
    injector = getTestBed();
    service = injector.get(ElasticsearchService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should create the service', inject([ElasticsearchService], (s: ElasticsearchService) => {
    expect(s).toBeTruthy();
  }));

  it('Should return the number of the projects', () => {
    service.getCountOfProjects().subscribe(
      response => {
        expect(typeof response).toEqual('number');
      }
    );
  });

  it('Should return all the projects', () => {
    service.getProjectsAll().subscribe(
      response => {
        expect(response.length).toBeGreaterThan(-1);
      }
    );
  });

  it('Should return an error when calling a no existing project', () => {
    service.getProjectByName('JasmineTestingName').subscribe(
      () => {
      },
      error => {
        expect(error).toBe('No project found with the given name.')
      }
    )
  });

  it('Should create a project and then delete it', async () => {
    const project = new Project();
    expect(project.assigned_ids.length).toBe(0);
    expect(project.name).toBe('');
    project.name = 'JasmineTestingProject';
    expect(project.name).toBe('JasmineTestingProject');
    project.id = 99999999;
    const response = await service.postProject(project);
    expect(response).toBe(99999999);
    service.deleteProjectById(99999999).subscribe(
      r => {
        expect(r).toBe(project);
      }
    );
  });

  it('Should return a diff', async () => {
    const text1 = 'This is a demo text';
    const text2 = 'Thise are a demou test';
    const response = await service.postDiff(text1, text2);
    expect(response.length).toBeGreaterThanOrEqual(0);
  });
});
