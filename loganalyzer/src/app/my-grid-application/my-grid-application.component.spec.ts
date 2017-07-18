import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AppComponent} from "../app.component";
import {MyGridApplicationComponent} from "./my-grid-application.component";
import {AgGridModule} from "ag-grid-angular";
import {RedComponentComponent} from "../red-component/red-component.component";

describe('MyGridApplicationComponent', () => {
    let component: MyGridApplicationComponent;
    let fixture: ComponentFixture<MyGridApplicationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AgGridModule.withComponents(
                    [RedComponentComponent]
                )
            ],
            declarations: [
                AppComponent, MyGridApplicationComponent, RedComponentComponent
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyGridApplicationComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should render title in a h1 tag', async(() => {
        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Simple ag-Grid Angular Example');
    }));

    it('grid API is not available until  `detectChanges`', () => {
        expect(component.gridOptions.api).not.toBeTruthy();
    });

    it('grid API is available after `detectChanges`', () => {
        fixture.detectChanges();
        expect(component.gridOptions.api).toBeTruthy();
    });

    it('select all button selects all rows', () => {
        fixture.detectChanges();
        component.selectAllRows();
        expect(component.gridOptions.api.getSelectedNodes().length).toEqual(3);
    });

});
