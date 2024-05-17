import {Component, OnInit,ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EmpAddEditComponent} from "./emp-add-edit/emp-add-edit.component";
import {EmployeeService} from "./services/employee.service";
import {MatPaginator,} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CoreService} from "./core/core.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

// implements OnInit ให้ appcomponents นี้มีการเรียกใช้ oninitทุกครั้ง
export class AppComponent implements OnInit {
  title = 'testcrud';

  //table
  //table.head
  displayedColumns: string[] = [
    "id",
    "firstName",
    "lastName",
    "email",
    "dob",
    "gender",
    "education",
    "company",
    "experience",
    "package",
    "action"
  ];
  //table.data
  dataSource!: MatTableDataSource<any>;
  //table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // method
  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService
  ) {}

  // เรียก ข้อมูลพุกครั้งที่โหลดหน้าเว็บ
  ngOnInit() {
    this.getEmployeeList();
  }

  //mat-paginator แสดงข้อมูลตามที่ต้องการ
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    // if dialog ปิดแล้วมีค่า ให้ ใช้ getEmployeeList เพือ update ข้อมูล
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    });
  }

  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next: (res)=>{
        // อัพเดทข้อมูลใหม่ที่ได้จาก res
        this.dataSource = new MatTableDataSource(res);
        //เรียงข้อมูลจาก 0 => 1
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.data)
        this.dataSource.paginator = this.paginator;
      },
      error: console.log
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next: (res) =>{
        alert('Employee deleted!');
        this._coreService.openSnackBar("Employee deleted!");
        this.getEmployeeList();
      },
      error: console.log
    });
  }

  openEditForm(data:any){
    // รับData
    this._dialog.open(EmpAddEditComponent,{
      data,
    })
  }

}
