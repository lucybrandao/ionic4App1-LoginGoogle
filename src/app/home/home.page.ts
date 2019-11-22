import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user:any = {};

  constructor(private googlePlus: GooglePlus, private http: HttpClient) {

  }

  loginGoogle() {
    this.googlePlus.login({})
      .then(res => {
        this.user = res;
        this.getData();
        console.log(res);
      })
      .catch(err => console.error(err));
  }

  getData() {
    this.http.get('https://www.googleapis.com/plus/v1/people/me?access_token=' + this.user.accessToken)
      .subscribe( (data:any) => {
        this.user.name = data.displayName;
        this.user.image = data.image.url;
      })
  }

}
