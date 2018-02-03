import {
  Component,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../model/project.model';
import {ElasticsearchService} from '../../service/elasticsearch.service';
import {ITdDataTableColumn} from "@covalent/core";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit{

  project: Project;
  execs: any;
  execsData: ITdDataTableColumn[] = [
    {name: 'id', label: 'Id', width: 300},
    {name: 'timestamp', label: 'Timestamp'},
    {name: 'entries', label: 'Entries'},
    {name: 'status', label: 'Status'},
    {name: 'DEBUG', label: 'DEBUG'},
    {name: 'INFO', label: 'INFO'},
    {name: 'WARNING', label: 'WARNING'},
    {name: 'ERROR', label: 'ERROR'},
    {name: 'options', label: 'Options'}
  ];
  execsRowData: any[] = [];

  constructor(private activatedRoute: ActivatedRoute, private elasticsearchService: ElasticsearchService) {
    const name = this.activatedRoute.snapshot.params['project'];
    this.elasticsearchService.getProjectByName(name).subscribe(
      response => {
        this.project = response;
      }
    );
    this.elasticsearchService.loadExecutionsByProject(name).subscribe(
      response => {console.log(response)}
    );
  }

  ngOnInit() {
    console.log(name);
  }

}
