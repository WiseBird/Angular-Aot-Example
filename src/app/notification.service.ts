import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class NotificationService {

    constructor(
        private toastrService: ToastrService,
    ) { }


    success(message: string) {
        this.toastrService.success(message);
    }
}
