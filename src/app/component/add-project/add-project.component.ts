import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {Project} from '../../model/project.model';
import {ElasticsearchService} from '../../service/elasticsearch.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {

  code: number;
  currentTab = 0;
  fileSelected: boolean;
  filesTxt: File[];
  filesXml: File[];
  isFile: boolean;
  project: Project;
  targetTab = 'test';
  urlTxt: string;
  urlXml: string;

  constructor(private elasticsearchService: ElasticsearchService, private router: Router, private breadcrumbs: BreadcrumbsService) {
    this.code = 0;
    this.fileSelected = true;
    this.filesTxt = null;
    this.filesXml = null;
    this.isFile = true;
    this.urlTxt = '';
    this.urlXml = '';
    this.project = new Project();
    this.project.assigned_ids = [];
    this.project.name = '';
    this.elasticsearchService.getCountOfProjects().subscribe(response => this.project.id = response);
    this.project.num_execs = 0;
    this.project.recently_deleted = -1;
  }

  cancel() {
    this.urlTxt = '';
    this.urlXml = '';
  }

  ngOnInit() {
    this.breadcrumbs.store([{label: 'Home', url: '/', params: []},
      {label: 'Add project', url: '/projects/add', params: []}])
  }

  async save() {
    this.code = 1;
    await this.elasticsearchService.postProject(this.project);
    await this.elasticsearchService.postFileProject(this.project.name);
    await this.elasticsearchService.postFileTab(this.targetTab);
    switch (this.currentTab) {
      case 0:
        this.code = 2;
        for (const file of this.filesTxt) {
          await this.elasticsearchService.postFileByUpload(file);
        }
        for (const file of this.filesXml) {
          await this.elasticsearchService.postFileByUpload(file);
        }
        break;
      case 1:
        this.elasticsearchService.postFileByUrl(this.urlTxt).subscribe(
          a => {
            this.code = 2;
            this.elasticsearchService.postFileByUrl(this.urlXml).subscribe(
              b => b,
              error => console.log(error)
            );
          },
          error => console.log(error)
        );
        break;
    }
  }

  update(files: File[]) {
    (files[0].name.includes('.txt')) ? (this.filesTxt = files) : (this.filesXml = files);
    this.urlTxt = 'Empty';
    this.urlXml = 'Empty';
  }

  private returnHome() {
    this.router.navigateByUrl('/');
  }
}
