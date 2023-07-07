import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'loggedIn';
  constructor() { }

  setLogin() {
    localStorage.setItem(this.AUTH_KEY, '1')
  }

  isLoggedIn() {
    return localStorage.getItem(this.AUTH_KEY) === '1';
  }

  logout() {
    localStorage.removeItem(this.AUTH_KEY);

  }

}
