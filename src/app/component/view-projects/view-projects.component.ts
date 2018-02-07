import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ITdDataTableColumn, TdMediaService} from '@covalent/core';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {Project} from '../../model/project.model';
import {ElasticsearchService} from '../../service/elasticsearch.service';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css']
})

export class ViewProjectsComponent {

  deleteInProgress: boolean;
  exec: boolean;
  projectDeleting: string;
  projectsData: ITdDataTableColumn[] = [
    {name: 'id', label: 'Id', width: 100},
    {name: 'name', label: 'Name'},
    {name: 'options', label: 'Options', width: 150}
  ];
  projectsRowData: any[] = [];

  constructor(private elasticsearchService: ElasticsearchService, public media: TdMediaService, private router: Router,
              private activatedRoute: ActivatedRoute, private breadcrumbs: BreadcrumbsService) {
    this.deleteInProgress = false;
    this.exec = false;
    this.projectDeleting = '';
    this.reloadTable();
  }

  delete(project: Project) {
    this.deleteInProgress = true;
    this.projectDeleting = project.name;
    this.elasticsearchService.deleteProject(project.id).subscribe(response => {
      this.reloadTable();
      this.deleteInProgress = false;
      this.projectDeleting = '';
    });
  }

  goTo(project: string) {
    this.router.navigate(['./', project], {relativeTo: this.activatedRoute});
  }

  ngOnInit() {
    this.breadcrumbs.store([{label: 'Home', url: '/', params: []}]);
  }

  reloadTable() {
    this.exec = true;
    this.elasticsearchService.getProjects().subscribe(response => {
      this.projectsRowData = [];
      for (let i = 0; i < response.length; i++) {
        this.projectsRowData[i] = {
          'id': response[i].id,
          'name': response[i].name
        };
      }
    });
    this.exec = false;
  }

  viewProject(event: any) {
    this.router.navigateByUrl('/' + event.row.name);
  }
}
