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
      keepLogin: [null, Validators.compose([])],
    });
  }

  onSubmit() {
    // console.log(this.form.value);
    this.sessionService.signin(this.form.value).subscribe(res => {
      // if(res.success) {
      //   document.cookie = 'vietnamfishery=vietnamfishery%' + res.token;
      //   this.router.navigate( ['/'] );
      // } else {
      //   this.form.reset();
      // }
    });
    // this.sessionService.getfail().subscribe(data => {
    //   console.log(data);
    // });
    // this.router.navigate ( [ '/dashboard' ] );
  }

}
