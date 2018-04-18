import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {Project} from '../../../model/project.model';
import {ElasticsearchService} from '../../../service/elasticsearch.service';

@Component({
  selector: 'app-add-exec',
  templateUrl: './add-exec.component.html',
  styleUrls: ['./add-exec.component.css']
})

export class AddExecComponent implements OnInit {

  code: number;
  currentTab = 0;
  fileSelected: boolean;
  filesTxt: File[];
  filesXml: File[];
  isFile: boolean;
  project: Project = new Project();
  tabs: string[] = ['test'];
  targetTab: string;
  urlTxt: string;
  urlXml: string;

  constructor(private router: Router, private elasticsearchService: ElasticsearchService,
              private activatedRoute: ActivatedRoute, private breadcrumbs: BreadcrumbsService) {
    this.code = 0;
    this.fileSelected = true;
    this.filesTxt = null;
    this.filesXml = null;
    this.isFile = true;
    this.urlTxt = '';
    this.urlXml = '';
  }

  cancel() {
    this.urlTxt = '';
    this.urlXml = '';
  }

  ngOnInit() {
    const name = this.activatedRoute.snapshot.parent.params['project'];
    this.elasticsearchService.getProjectByName(name).subscribe(
      response => {
        this.project = response;
        this.updateTabs();
      },
      error => console.log(error)
    );
    this.breadcrumbs.store([{label: 'Home', url: '/', params: []},
      {label: name, url: '/projects/' + name, params: []},
      {label: 'Add exec', url: '/projects/' + name + '/add', params: []}]);
  }

  async save() {
    this.code = 1;
    await this.elasticsearchService.postFileProject(this.project.name);
    await this.elasticsearchService.postFileTab(this.targetTab);
    switch (this.currentTab) {
      case 0:
        this.code = 2;
        for (let i = 0; i < this.filesTxt.length; i++) {
          await this.elasticsearchService.postFileByUpload(this.filesTxt[i]);
          await this.elasticsearchService.postFileByUpload(this.filesXml[i]);
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

  private async updateTabs() {
    const response = await this.elasticsearchService.getTabsByProjectAsync(this.project.name);
    this.tabs = [];
    for (let i = 0; i < response.length; i++) {
      this.tabs[i] = response[i].tab;
    }
    this.targetTab = this.tabs[0];
  }
}
