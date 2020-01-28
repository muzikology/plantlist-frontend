import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';

import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Http, HttpModule }    from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

import { AuthGuardService  } from './shared/services/AuthGuardService';

import { RoleGuardService } from './shared/services/RoleGuardService';
import { DataTableModule } from 'angular7-data-table';
import { PaginatorModule } from 'primeng/primeng';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService} from 'primeng/api';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { ProgressBarModalComponent} from './progressbar-modal.component';
import { UtcDatePipe } from './shared/pipes/utc-date-pipe.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AdvGrowlModule} from 'primeng-advanced-growl';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';


import { Routes, RouterModule } from '@angular/router';

import { PlantModel} from './plant-model.model';



const routes: Routes = [

];



@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        BrowserModule,
        AdvGrowlModule,

        FormsModule,
        TabViewModule,


        BootstrapModalModule.forRoot({container:document.body}),
        
        ConfirmDialogModule,
                DataTableModule.forRoot(), 
        BootstrapModalModule.forRoot({container:document.body}),
       
        PaginatorModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        
        RouterModule.forRoot(routes, { useHash: true }), 
        NgbModule.forRoot(),
       
        AppRoutingModule
    ],
    declarations: [AppComponent, ProgressBarModalComponent, UtcDatePipe],
    exports: [
 
       
       ],
    providers:  [
              
                AuthGuard,
                ConfirmationService,
                
                AuthGuardService,
                RoleGuardService,
                
                UtcDatePipe,
                PlantModel,

                { provide : LocationStrategy, useClass:HashLocationStrategy }
            ],
           
    bootstrap: [AppComponent],
    entryComponents:[ProgressBarModalComponent]
})
export class AppModule {}
