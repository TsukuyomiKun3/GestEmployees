import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from 'src/app/model/employee.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  employees: Employee[] = [];
  employeeToModify: Employee = new Employee(0, 0, '', '', '', 0, false, '', []);
  showModalAdd: boolean = false;
  showModalModify: boolean = false;

  constructor(private employeeService: EmployeeService) {
    this.refreshEmployees();
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
  }
}
