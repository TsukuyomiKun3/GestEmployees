import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from 'src/app/model/employee.model';
import { User } from 'src/app/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  employees: Employee[] = [];

  employeeToModify: Employee = new Employee(0, 0, '', '', '', 0, false, '', []);
  employeeToDelete: number = 0;
  showModalAdd: boolean = false;
  showModalModify: boolean = false;
  loggedInUser!: User;
  showModalDelete: boolean = false;

  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.refreshEmployees();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.loggedInUser = JSON.parse(params['user']);
    });
  }


  toggleModalAdd() {
    this.showModalAdd = !this.showModalAdd;
  }

  setEmployeeToModify(employee: Employee) {
    this.employeeToModify = JSON.parse(JSON.stringify(employee));
    this.toggleModalModify();
  }

  toggleModalModify() {
    this.showModalModify = !this.showModalModify;
  }

  setEmployeeToDelete(id: number) {
    this.employeeToDelete = id;
    this.toggleModalDelete();
  }

  toggleModalDelete() {
    this.showModalDelete = !this.showModalDelete;
  }

  refreshEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
        console.log(this.employees);
     },
      (error) => {
        console.log(error)
      }
    );
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      (data) => {
        this.refreshEmployees();
      },
      (error) => {
        console.log(error);
      }
    );

    if(this.showModalDelete==true) {
      this.toggleModalDelete();
    }
  }
}
