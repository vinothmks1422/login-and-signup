import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormArrayName } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {


  constructor(private _apiservices: ApiservicesService, private route: Router) { }

  isPasswordMachingError = false;
  // Value: string = ''
  // viewValue: string = ""
  // Gender: string = ""

  tittles: any[] = [
    { Value: 'Mr.' },
    { Value: 'Mrs.' },
    { Value: 'Ms.' },
  ];

  data = new FormGroup(
    {
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      cnfpass: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      tittle: new FormControl('', [Validators.required]),
      mobile: new FormArray([
        new FormGroup({
          mobiles: new FormControl(''),
          email: new FormControl(''),
        })
      ])
    }
  )

  show = false;
  password: string | undefined;

  // @ViewChild('passInput') passwordInput!: ElementRef
  // @ViewChild('cnfpassInput') cnfPasswordInput!: ElementRef



  togglePasswordVisibility(e: HTMLInputElement) {
    // const e = document.getElementById('eye') as HTMLInputElement;
    // const e = this.passwordInput.nativeElement;
    if (e) {
      e.type = e.type === "password" ? "text" : "password"
    }
  }

  addMobile() {
    console.log(this.getMobiles().get("0"))
    this.getMobiles().push(new FormGroup({
      mobiles: new FormControl(''),
      email: new FormControl(''),
    }))
  }

  removeMobile(i: number) {
    if (this.getMobiles().length > 1) {
      this.getMobiles().removeAt(i);
    }
  }

  getMobiles() {
    return this.data.get('mobile') as FormArray;
  }

  ngOnInit(): void {
    this.data.get('cnfpass')?.valueChanges.subscribe((v) => {
      // console.log(v)
      this.isPasswordMachingError = v !== this.data.value.password;
    })

    this.data.get('password')?.valueChanges.subscribe((v) => {
      // console.log(v)
      if (v !== this.data.value.cnfpass) {
        this.isPasswordMachingError = true;
      } else {
        this.isPasswordMachingError = false;
      }
    })


    this.data.get('tittle')?.valueChanges.subscribe((v) => {
      // console.log(v);
      if (v == 'Mr') {
        this.data.get('gender')?.setValue('Male')
      }
      if (v == 'Ms' || v == 'Mrs') {
        this.data.get('gender')?.setValue('Female')
      }
    })
    // console.log(this.Value);


  }

  // tittle() {
  //   console.log(this.Value);

  //   if (this.Value == "Mr.") {
  //     this.Gender = 'Male'
  //   }
  //   if (this.Value == "Ms." || this.Value == "Mrs.") {
  //     this.Gender = "Female"
  //   }
  // }

  async submitForm() {
    await this._apiservices.createUser(this.data.value);
    this.route.navigate(['/list']);
    // console.log(this.data.value);
  }
}
