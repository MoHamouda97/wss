import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
    imports: [
        CommonModule,
        NzFormModule,
        NzIconModule,
        NzInputModule,
        NzButtonModule,
        NzTableModule,
        NzSelectModule
    ],
    exports: [
        NzFormModule,
        NzIconModule,
        NzInputModule,
        NzButtonModule,
        NzTableModule,
        NzSelectModule
    ],
})

export class AntModue {}