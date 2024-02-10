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
    this.authService.disconnect();
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
