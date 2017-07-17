import {Component} from "@angular/core";

@Component({
    selector: 'app-red-component',
    templateUrl: './red-component.component.html'
})
export class RedComponentComponent {
    private params: any;

    agInit(params: any): void {
        this.params = params;
    }
}
