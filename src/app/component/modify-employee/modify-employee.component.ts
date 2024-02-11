import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  standalone: true,
  selector: 'app-modify-employee',
  templateUrl: './modify-employee.component.html',
  styleUrls: ['./modify-employee.component.scss'],
  imports: [FormsModule]
})
export class ModifyEmployeeComponent  implements OnInit {

  @Input() employee!: Employee;
  @Input() employees!: Employee[];
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() refreshEmployees: EventEmitter<void> = new EventEmitter();

  num: number = 0;
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  age: number = 0;
  validated: boolean = false; 

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    if (this.employee.id != 0) {
      this.num = this.employee.num || 0;
      this.firstname = this.employee.first_name || '';
      this.lastname = this.employee.last_name || '';
      this.email = this.employee.email || '';
      this.age = this.employee.age || 0;
      this.validated = this.employee.validation || false;
    } 
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employee']) {
      this.num = this.employee.num || 0;
      this.firstname = this.employee.first_name || '';
      this.lastname = this.employee.last_name || '';
      this.email = this.employee.email || '';
      this.age = this.employee.age || 0;
      this.validated = this.employee.validation || false;
    }
  }

  onSubmit() {
    if (this.firstname == '' && this.lastname == '') {
      alert('You cannot have an empty first and last name!');
    } else if (this.age < 0 || this.age > 100) {
      alert('The age must be between 0 and 100 !');
    } else if (this.email == ''){
      alert('The email cannot be empty !');
    } else if (this.email !== this.employee.email && this.employees.filter(e => e.email == this.email).length > 0) {
      alert('The email already exists in the database !');
    } else if (!this.isEmailFormat(this.email)) {
      alert('The email is not valid !');
    } else {
      this.resetEmployee();
      this.employeeService.updateEmployee(this.employee).subscribe(
        (data) => {
          this.close();
          console.log("data",data);
          this.refreshEmployees.emit();

        },
        (error) => {
          console.log(error);
        }
      );
      }

  }

  isEmailFormat(input: string): boolean {
    // Expression régulière pour vérifier le format de l'adresse e-mail
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Vérifie si la chaîne correspond à l'expression régulière
    return emailRegex.test(input);
  }

  close() {
    this.closeModal.emit();
  }

  resetEmployee() {
    this.employee.num = this.num;
    this.employee.first_name = this.firstname;
    this.employee.last_name = this.lastname;
    this.employee.email = this.email;
    this.employee.age = this.age;
    this.employee.validation = this.validated;
  }

}
