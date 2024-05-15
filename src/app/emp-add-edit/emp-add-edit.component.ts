import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../services/employee.service";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent {

  // formGroup
  empForm: FormGroup ;

  // ส่งออกตัวแปร education[string]
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ];

  constructor(
    private _fb: FormBuilder,
    // ข้อมูลที่รับเข้ามา
    private _empService: EmployeeService,
    // model dialog
    private _dialogRef: DialogRef<EmpAddEditComponent>
    ) {
    this.empForm = this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
    });
  }

  onFormSubmit(){
    // มีข้อมูลเข้ามา
    if(this.empForm.valid){
      // ข้อมูลเป็นค่าว่าง ''
      if (this.empForm.value.firstName === "" ||
        this.empForm.value.lastName === "" ||
        this.empForm.value.email === "" ||
        this.empForm.value.dob === "" ||
        this.empForm.value.gender === "" ||
        this.empForm.value.education === "" ||
        this.empForm.value.company === "" ||
        this.empForm.value.experience === "" ||
        this.empForm.value.package === "")
      {
        alert("Please fill in all required fields.");
      } else {
        // ข้อมูลไม่เป็นค่าว่าง ''
        this._empService.addEmployee(this.empForm.value).subscribe({
          next:(val: any)=>{
            alert("Employee added successfully");
            this._dialogRef.close()
            window.location.reload();
          },
          error:(err: any)=>{
            console.error(err);
          }
        });
      }
    } else {
      alert("Please fill in all required fields.");
    }
  }


}
