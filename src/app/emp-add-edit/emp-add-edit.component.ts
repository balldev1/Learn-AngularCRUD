import {Component, Inject, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "../services/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../core/core.service";

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit{

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
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _coreService: CoreService
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

  ngOnInit(): void{
    // กำหนดค่าเริ่มต้นให้กับฟอร์มโดยใช้ข้อมูลที่ถูกส่งผ่านมาใน Dialog
    this.empForm.patchValue(this.data)
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
        this._coreService.openSnackBar("Please fill in all required fields");
      } // ถ้ามีข้อมูลฐานข้อมูลอยู่แล้ว
      else if(this.data) {
        this._empService.updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
          next:(val: any)=>{
            this._coreService.openSnackBar("Employee detail updated!");
            this._dialogRef.close(true);
            window.location.reload();
          },
          error:(err: any)=>{
            console.error(err);
          }
        });
      } // ถ้าไม่มีข้อมู,ในฐานข้อมูล
      else {
        this._empService.addEmployee(this.empForm.value)
          .subscribe({
          next:(val: any)=>{
            this._coreService.openSnackBar("Employee added successfully");
            this._dialogRef.close(true);
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
