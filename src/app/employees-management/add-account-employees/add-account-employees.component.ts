import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Users } from '../../models/users';
import { EmployeesManagementService } from '../employees-management.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AppService } from '../../app.service';
import { tokenName } from '../../../environments';


const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-add-account-employees',
  templateUrl: './add-account-employees.component.html',
  styleUrls: ['./add-account-employees.component.scss']
})
export class AddAccountEmployeesComponent implements OnInit {

  token: any;
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppService,
    public snackBar: MatSnackBar,
    private employeesManagementService: EmployeesManagementService
  ) { }

  // select option
  rolesList: any[] = [
    {
      value: 1,
      label: 'Quản lý ao nuôi'
    },
    {
      value: 2,
      label: 'Quản lý kho'
    }
  ];
  

  ngOnInit() {
    this.token = this.appService.getCookie(tokenName);
    this.form = this.fb.group({
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null, Validators.compose([Validators.required])],
      username: [null, Validators.compose([Validators.required])],
      password: password,
      confirmPassword: confirmPassword,
      roles: [null, Validators.compose([Validators.required])],
    });
  }

  
  onSubmit() {
    delete this.form.value.confirmPassword;
    const user: Users = this.form.value;
    this.employeesManagementService.register_employees(user, this.token).subscribe(res => {
      if(res.success){
        this.snackBar.open(res.message, 'Đóng', {
            duration: 3000,
            horizontalPosition: "right"
        });
        setTimeout(() => {
            this.form.reset();
        this.router.navigate( ['/quan-ly-phan-quyen'] );
        }, 500);
      }else{
        this.snackBar.open(res.message, 'Đóng', {
          duration: 2500,
          horizontalPosition: "right",
          verticalPosition: 'bottom'
        });
      }
    });
  }
} 
