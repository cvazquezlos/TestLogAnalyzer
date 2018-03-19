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
  fileSelected: boolean;
  fileTxt: File;
  fileXml: File;
  isFile: boolean;
  project: Project;
  urlTxt: string;
  urlXml: string;

  constructor(private elasticsearchService: ElasticsearchService, private router: Router, private breadcrumbs: BreadcrumbsService) {
    this.code = 0;
    this.fileSelected = true;
    this.fileTxt = null;
    this.fileXml = null;
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

  save() {
    this.code = 1;
    this.elasticsearchService.postProject(this.project).subscribe(
      a => {
        this.elasticsearchService.postFileProject(this.project.name).subscribe(
          b => {
            this.elasticsearchService.postFileTab('test').subscribe(
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
      },
      error => console.log(error)
    );
  }

  update(file: File) {
    (file.name.includes('.txt')) ? (this.fileTxt = file) : (this.fileXml = file);
    this.urlTxt = 'Empty';
    this.urlXml = 'Empty';
  }

  private returnHome() {
    this.router.navigateByUrl('/');
  }
}
