import {ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from 'home/home.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@Component({
    template: `
        <app-home
            [title]="title"
        >
        </app-home>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class HomeHostComponent {
    title: string;
}

export class HomeComponentBuilder {
    comp: HomeHostComponent;
    fixture: ComponentFixture<HomeHostComponent>;

    constructor() {
        this.createObjects();
    }
    private createObjects() {
        TestBed.configureTestingModule(
            {
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    BsDropdownModule.forRoot(),
                ],
                declarations: [
                    HomeHostComponent,
                    HomeComponent,
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            },
        );

        this.fixture = TestBed.createComponent(HomeHostComponent);
        this.comp = this.fixture.componentInstance;
    }
}

describe('UI kit. Dropdown', () => {
    let builder: HomeComponentBuilder;

    beforeEach(() => {
        builder = new HomeComponentBuilder();
    });

    it('should pass items via input', () => {
        let {comp, fixture} = builder;


        fixture.detectChanges();


        expect(comp).not.toBeNull();
    });
});