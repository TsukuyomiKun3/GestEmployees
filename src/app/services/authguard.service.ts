import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const loggedInUser = JSON.parse(route.queryParams['user']);

    if (!loggedInUser) {
      // Si loggedInUser est vide, redirigez vers la page de connexion et retournez false
      this.router.navigate(['/login']);
      return false;
    }

    // Si loggedInUser n'est pas vide, retournez true
    return true;
  }
}