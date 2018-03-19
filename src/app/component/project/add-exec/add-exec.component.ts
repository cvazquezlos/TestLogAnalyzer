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
  fileSelected: boolean;
  fileTxt: File;
  fileXml: File;
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
    this.fileTxt = null;
    this.fileXml = null;
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

  save() {
    this.code = 1;
    this.elasticsearchService.postFileProject(this.project.name).subscribe(
      b => {
        this.elasticsearchService.postFileTab(this.targetTab).subscribe(
          c => {
            if (this.urlTxt !== 'Empty') {
              this.elasticsearchService.postFileByUrl(this.urlTxt).subscribe(
                d => {
                  this.code = 2;
                  if (this.urlXml !== 'Empty') {
                    this.elasticsearchService.postFileByUrl(this.urlXml).subscribe(
                      e => e,
                      error => console.log(error)
                    )
                  }
                },
                error => console.log(error)
              );
            } else {
              if (this.fileTxt !== null) {
                this.elasticsearchService.postFileByUpload(this.fileTxt).subscribe(
                  d => {
                    this.code = 2;
                    if (this.fileXml !== null) {
                      this.elasticsearchService.postFileByUpload(this.fileXml).subscribe(
                        e => e,
                        error => console.log(error)
                      )
                    }
                  },
                  error => console.log(error)
                );
              }
            }
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }

  update(file: File) {
    (file.name.includes('.txt')) ? (this.fileTxt = file) : (this.fileXml = file);
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
