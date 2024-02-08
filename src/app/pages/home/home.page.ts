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
  showModalAdd: boolean = false;

  constructor(private employeeService: EmployeeService) {
    this.refreshEmployees();
  }

  toggleModalAdd() {
    this.showModalAdd = !this.showModalAdd;
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
}
