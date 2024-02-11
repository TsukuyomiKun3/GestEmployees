import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormsModule } from '@angular/forms';
import { Employee } from 'src/app/model/employee.model';

@Component({
  standalone: true,
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  imports: [FormsModule]
})
export class AddEmployeeComponent  implements OnInit {

  @Input() employees!: Employee[];
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() refreshEmployees: EventEmitter<void> = new EventEmitter();

  firstname: string = "";
  lastname: string = "";
  email: string = "";


  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {}

  onSubmit() {
    if (this.firstname == '' && this.lastname == '') {
      alert('You cannot have an empty first and last name!');
    } else if (this.email == ''){
      alert('The email cannot be empty !');
    } else if (this.employees.filter(e => e.email == this.email).length > 0) {
      alert('The email already exists in the database !');
    } else if (!this.isEmailFormat(this.email)) {
      alert('The email is not valid !');
    } else {
      this.employeeService.addEmployee(this.firstname, this.lastname, this.email).subscribe(
        (data) => {
          console.log("OK", data);
          this.refreshEmployees.emit();
          this.closeModal.emit();

          this.firstname = "";
          this.lastname = "";
          this.email = "";
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

}
