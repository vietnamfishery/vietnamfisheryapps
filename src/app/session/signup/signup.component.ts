import { IUsers } from '../../models/users';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.form = this.fb.group( {
      // email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      lastname: [null, Validators.compose([Validators.required])],
      firstname: [null, Validators.compose([Validators.required])],
      username: [null, Validators.compose([Validators.required])],
      password: password,
      confirmPassword: confirmPassword
    } );
  }

  onSubmit() {
    delete this.form.value.confirmPassword;
    const user: IUsers = this.form.value;
    this.sessionService.register(user).subscribe(res => {
      if(res.username){
        this.form.reset();
        this.router.navigate( ['/session/signin'] );
      }else{
        console.log(res);
      }
    });
  }

}
