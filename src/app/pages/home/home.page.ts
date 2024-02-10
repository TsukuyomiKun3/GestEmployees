import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from 'src/app/model/employee.model';
import { User } from 'src/app/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  employees: Employee[] = [];
  filteredEmployees: Employee[] = []; // Liste des employés filtrés

  employeeToModify: Employee = new Employee(0, 0, '', '', '', 0, false, '', []);
  employeeToDelete: number = 0;
  employeeToFind: string = '';

  showModalAdd: boolean = false;
  showModalModify: boolean = false;
  showModalDelete: boolean = false;



  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.refreshEmployees();
  }

  ngOnInit() {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
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
        if(this.filterEmployees.length==0) {
          this.filteredEmployees = [...this.employees];
        }
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

  filterEmployees() {
    if (this.employeeToFind) {
        this.filteredEmployees = this.employees.filter(
            (employee) =>
                employee.first_name
                    .toLowerCase()
                    .includes(this.employeeToFind.toLowerCase()) ||
                employee.last_name
                    .toLowerCase()
                    .includes(this.employeeToFind.toLowerCase())
        );
        console.log(this.filteredEmployees);
    } else {
        this.filteredEmployees = [...this.employees];
    }
}

  disconnect() {
    this.authService.disconnect();
  }
}
