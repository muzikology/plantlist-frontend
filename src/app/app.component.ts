
import {Component, OnInit, ChangeDetectorRef,ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { PlantListService } from './plant-list-service.service';
import {PlantModel } from './plant-model.model';
import {DatePipe} from '@angular/common';

import { AdvGrowlService } from 'primeng-advanced-growl';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
        styles: [`
          .dark-modal .modal-content {
            background-color: #292b2c;
            color: white;
          }
          .dark-modal .close {
            color: white;
          }
          .light-blue-backdrop {
            background-color: #5cb3fd;
          }
        `],
        providers: [DatePipe]
})
export class AppComponent implements OnInit {

  plantListForm: FormGroup;

  progressBarPopup: NgbModalRef;
  resourceForm: FormGroup;
  submitted = false;
  modalRef: NgbModalRef;
  dataTable:any;
  plantList: Array<any>;
 
  

  plant_type_dummy_input: any[]=["Shrub", "Tree", "Perenial", "Grass"];
  bloom_type_dummy_data:any[]=["Summer", "Winter", "Spring", "Autumn"];


  constructor(private plantModel : PlantModel, private plantService: PlantListService, private router : Router, private modalService: NgbModal,
    private advGrowlService: AdvGrowlService, 
    private fb: FormBuilder,private changeDetectorRefs: ChangeDetectorRef, private datePipe: DatePipe ) {
       this.createForm();
}

ngOnInit() {
this.createForm();
this.getAllPlants();
}

createForm(){
/** PlantList FormControls */

this.plantListForm = this.fb.group({
common_name:['', [Validators.required, Validators.maxLength(25)]],
plant_type:['',[Validators.required]],
flower_color:['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
bloom_time:['',[Validators.required]],
soil_type:['',[Validators.required]],
habitat_int:['',[Validators.required]]  
});
}

createPlant(commom_name, plant_type, flower_color, bloom_time, soil_type,habitat_int){

  this.submitted = true;
this.plantModel.commom_name = commom_name;
this.plantModel.plant_type = plant_type;
this.plantModel.flower_color = flower_color;
this.plantModel.bloom_time = bloom_time;
this.plantModel.soil_type = soil_type;
this.plantModel.habitat_int = habitat_int;

this.plantService.createNewPlant(this.plantModel)
.subscribe(value =>{
this.modalRef.close();
}, error => {
alert('Failed to create the Plant Entry  ');
this.showRecordCreateErrorAlert();
},() =>{
alert('Successfully created Plant Entry  ');
this.showRecordCreateAlert();
this.modalRef.close();
this.getAllPlants();
});

}

addPlant(content){
// Opens The Modal Form to add new Plant
this.modalRef  = this.modalService.open(content, { size: 'lg' });
}

get f(){
  return this.plantListForm.controls;
}

getAllPlants(){

this.plantService.getAllplantList().subscribe(data =>{
console.log(data);
this.plantList = data;
this.changeDetectorRefs.detectChanges();
const table: any = $('#plantTable');
});
}

clearForm(){
  this.plantListForm.reset();
}

public showRecordCreateAlert(): void {
this.advGrowlService.createInfoMessage('', 'Info');
this.advGrowlService.createInfoMessage('', 'Info');
this.advGrowlService.createSuccessMessage('Plant succesfully created.', 'Success');
}

public showRecordCreateErrorAlert(): void {
this.advGrowlService.createInfoMessage('', 'Info');
this.advGrowlService.createInfoMessage('', 'Info');
this.advGrowlService.createErrorMessage('Plant create failed.', 'Error');

}

  
  
  }
