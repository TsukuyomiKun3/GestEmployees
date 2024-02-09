import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { HomePageRoutingModule } from './home-routing.module';
import { AddEmployeeComponent } from 'src/app/component/add-employee/add-employee.component';
import { ModifyEmployeeComponent } from "../../component/modify-employee/modify-employee.component";


@NgModule({
    declarations: [HomePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        HttpClientModule,
        AddEmployeeComponent,
        ModifyEmployeeComponent
    ]
})
export class HomePageModule {}
