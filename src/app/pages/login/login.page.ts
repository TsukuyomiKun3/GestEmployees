import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username = '';
  password = '';
  private router: Router;

  constructor(router: Router, private authService: AuthService) {
    this.router = router;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (user) => {
        this.router.navigate(['/home'], {queryParams: {user: JSON.stringify(user)}});
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
