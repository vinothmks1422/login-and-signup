import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private _apiservices: ApiservicesService, private route: Router, private _authservices: AuthService) { }

  userDetails: any[] = [];

  data = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    }
  )



  async submitForm() {

    this.userDetails = await this._apiservices.getUser();

    // console.log(this.userDetails);

    const user = this.userDetails.find((item) => {

      return item.email === this.data.value.email

    })
    // console.log(user);

    if (!user) {
      window.alert('Incorrect Email')
      return
    }

    if (this.data.value.password !== user.password) {
      window.alert('Incorrect Password')
      return
    }

    // localStorage.setItem('loggedIn', '1');
    this._authservices.setLogin();
    this.route.navigate(['/list'])

  }

}

