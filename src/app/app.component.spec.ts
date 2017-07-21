import {async, TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {RedComponentComponent} from './red-component/red-component.component';
import {AgGridModule} from 'ag-grid-angular';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AgGridModule.withComponents(
                    [RedComponentComponent]
                )
            ],
            declarations: [
                AppComponent, RedComponentComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
