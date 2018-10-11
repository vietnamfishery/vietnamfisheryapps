import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      keepLogin: [false, Validators.compose([])]
    });
  }

  onSubmit() {
    this.sessionService.signin(this.form.value).subscribe(res => {
      if (res.success) {
        if (this.form.value.keepLogin) {
          this.setCookie('vietnamfishery=vietnamfishery%', res.token, 365);
        } else {
          document.cookie = 'vietnamfishery=vietnamfishery%' + res.token;
        }
        this.router.navigate(['/']);
      } else {
        this.form.reset();
      }
    });
    // this.sessionService.getfail().subscribe(data => {
    //   console.log(data);
    // });
    // this.router.navigate ( [ '/dashboard' ] );
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

}
