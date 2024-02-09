import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  imports: [FormsModule]
})
export class AddEmployeeComponent  implements OnInit {

  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() refreshEmployees: EventEmitter<void> = new EventEmitter();

  firstname: string = "";
  lastname: string = "";
  email: string = "";


  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {}

  onSubmit() {
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

  close() {
    this.closeModal.emit();
  }

}
