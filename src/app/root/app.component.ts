import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../notification.service';

@Component({
               selector: 'app-root',
               templateUrl: './app.component.html',
               styleUrls: ['./app.component.css'],
           })
export class AppComponent implements OnInit {
    title = 'app works!';

    form: FormGroup;
    name: string;

    constructor(
        private formBuilder: FormBuilder,
        notificationService: NotificationService,
    ) {
        notificationService.success('test');
    }

    ngOnInit() {
        this.form = this.formBuilder
            .group({
                       name: ['', Validators.required],
                       value: '',
                   });
        this.name = this.form.get('name').value;
        this.name = this.form['name'].value;
    }
}
