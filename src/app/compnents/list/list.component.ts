import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private _apiservices: ApiservicesService, private route: Router, private _authservices: AuthService) { }

  userList: any[] = [];
  loggedIn = this._authservices.isLoggedIn();

  async ngOnInit() {
    this.userList = await this._apiservices.getUser() as any[]
  }

  logout() {
    
  }

  async deleteUser(id: string, i: number) {
    await this._apiservices.deleteUser(id)
    this.userList.splice(i, 1)
  }

}
