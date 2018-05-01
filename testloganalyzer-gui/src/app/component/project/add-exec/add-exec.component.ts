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
      },
      error => console.log(error)
    );
    this.breadcrumbs.store([{label: 'Home', url: '/', params: []},
      {label: name, url: '/projects/' + name, params: []},
      {label: 'Add exec', url: '/projects/' + name + '/add', params: []}]);
  }

  async save() {
    this.code = 1;
    switch (this.currentTab) {
      case 0:
        this.code = 2;
        const files: File[] = [];
        for (let i = 0; i < this.filesTxt.length; i++) {
          files.push(this.filesTxt[i]);
        }
        for (let i = 0; i < this.filesXml.length; i++) {
          files.push(this.filesXml[i]);
        }
        await this.elasticsearchService.postFile(files, this.project.name);
        break;
      case 1:
        this.code = 2;
        const logs = await this.elasticsearchService.downloadResource(this.urlTxt);
        const l: File = new File([logs], "logs.txt", {
          type: 'text/plain'
        });
        const surefire = await this.elasticsearchService.downloadResource(this.urlXml);
        const s: File = new File([surefire], "surefire.xml", {
          type: 'text/plain'
        });
        const filesByUrl: File[] = [l, s];
        await this.elasticsearchService.postFile(files, this.project.name);
        break;
    }
  }

  update(files: File[]) {
    (files[0].name.includes('.txt')) ? (this.filesTxt = files) : (this.filesXml = files);
    this.urlTxt = 'Empty';
    this.urlXml = 'Empty';
  }
}
