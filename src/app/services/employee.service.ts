import { HttpClient } from "@angular/common/http";
import { UtilsService } from "./utils.service";
import { Injectable } from "@angular/core";
import { Employee } from "../model/employee.model";


@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private http: HttpClient, private utilsService: UtilsService){}

    getEmployees() {
        let url = `${this.utilsService.getEndPoint().apiUrl}/employees`;

        return this.http.get<Employee[]>(url);
    }

    addEmployee(first_name: string, last_name: string, email: string) {
        let url = `${this.utilsService.getEndPoint().apiUrl}/employees`;

        let body = {
            first_name: first_name,
            last_name: last_name,
            email: email
        };

        return this.http.post(url, body);
    }

    deleteEmployee(id: number) {
        let url = `${this.utilsService.getEndPoint().apiUrl}/employees/${id}`;

        return this.http.delete(url);
    }

    updateEmployee(employee: Employee) {
        let url = `${this.utilsService.getEndPoint().apiUrl}/employees/${employee.id}`;

        return this.http.put(url, employee);
    }
}
