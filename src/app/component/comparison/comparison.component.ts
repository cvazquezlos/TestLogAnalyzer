import {ChangeDetectionStrategy,
  Component} from '@angular/core';

import {ElasticsearchService} from '../../service/elasticsearch.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-comparison',
  templateUrl: './comparison.component.html'
})

export class ComparisonComponent {


  constructor(private elasticsearchService: ElasticsearchService) {
  }

}
