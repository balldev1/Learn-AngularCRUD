import {Component, OnInit,ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EmpAddEditComponent} from "./emp-add-edit/emp-add-edit.component";
import {EmployeeService} from "./services/employee.service";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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
  ];
  //table.data
  dataSource!: MatTableDataSource<any>;
  //table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // method
  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService
  ) {}

  // เรียก ข้อมูลพนักงานทุกครั้งที่โหลดหน้าเว็บ
  ngOnInit() {
    this.getEmployeeList();
  }

  openAddEditEmpForm(){
    this._dialog.open(EmpAddEditComponent);
  }

  getEmployeeList(){
    this._empService.getEmployee().subscribe({
      next: (res)=>{
        // อัพเดทข้อมูลใหม่ที่ได้จาก res
        this.dataSource = new MatTableDataSource(res);
        //เรียงข้อมูลจาก 0 => 1
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator;
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
