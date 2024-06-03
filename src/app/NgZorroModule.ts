import{  NgModule} from "@angular/core";
// ng zorro imports 
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageModule } from 'ng-zorro-antd/message';


@NgModule({
    exports:[
         //ng zorro imports
    NzLayoutModule,
    NzFormModule,
    NzInputModule,
    NzSpinModule,
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule,
    NzNotificationModule,
    NzTableModule,
    NzMessageModule
    
    
    ]
})
export class NgZorroModule{}