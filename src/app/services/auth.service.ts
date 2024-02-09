import { HttpClient } from "@angular/common/http";
import { UtilsService } from "./utils.service";
import { Injectable } from "@angular/core";
import { User } from "../model/user.model";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private utilsService: UtilsService, private router: Router){}

    login(username: string, password: string) {
        let url = `${this.utilsService.getEndPoint().apiUrl}/users`;

        let user = {username, password};

        return this.http.post<User>(url, user);
    }

    disconnect() {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }
}
