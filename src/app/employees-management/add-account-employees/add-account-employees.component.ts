import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { IUsers } from '../../models/users';
import { EmployeesManagementService } from '../employees-management.service';
import { Router } from '@angular/router';


const password = new FormControl('', Validators.required);
const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-add-account-employees',
  templateUrl: './add-account-employees.component.html',
  styleUrls: ['./add-account-employees.component.scss']
})
export class AddAccountEmployeesComponent implements OnInit {

  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeesManagementService: EmployeesManagementService
  ) { }

  // select option
  rolesList: string[] = ['Toàn quyền', 'Quản lý ao nuôi', 'Quản lý kho'];
  

  ngOnInit() {
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
    const user: IUsers = this.form.value;
    user['action'] = 'register-employees';
    console.log(this.form.value);

    this.employeesManagementService.register_employees(user).subscribe(res => {
      if(res.username){
        this.form.reset();
        this.router.navigate( ['/session/signin'] );
      }else{
        console.log(res);
      }
    });

  }
} 
