import { HttpClient } from "@angular/common/http";
import { UtilsService } from "./utils.service";
import { Injectable } from "@angular/core";
import { User } from "../model/user.model";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private utilsService: UtilsService){}

    login(username: string, password: string) {
        let url = `${this.utilsService.getEndPoint().apiUrl}/users`;

        let user = {username, password};

        return this.http.post<User>(url, user);
    }
}
