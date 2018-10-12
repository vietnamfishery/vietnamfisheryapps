import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS_DATE } from '../../constants/format-date';


const passwordhistory = new FormControl('', Validators.required);
const passwordchange = new FormControl('', Validators.required);
const confirmPasswordchange = new FormControl('', CustomValidators.equalTo(passwordchange));

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_DATE },
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN'}
  ],
})
export class ProfileEditComponent implements OnInit {

  public form: FormGroup;
  public form_Pass: FormGroup;
  private selectedFile: Promise<string> | null = null;

  minDate = new Date(1940, 0, 1);
  maxDate = new Date();

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private adapter: DateAdapter<any>
  ) { }

  ngOnInit() {
    this.form = this.fb.group( {
      lastname: [null, Validators.compose([Validators.required])],
      firstname: [null, Validators.compose([Validators.required])],
      birthday: [null, Validators.compose([Validators.required])],
      username: [null, Validators.compose([])],
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      phone: [null, Validators.compose([Validators.required])],
      province: [null, Validators.compose([Validators.required])],
      district: [null, Validators.compose([Validators.required])],
      town: [null, Validators.compose([Validators.required])],
      image: [null, Validators.compose([])],
      files: [null, Validators.required],
      passwordhistory: passwordhistory,
      passwordchange: passwordchange,
      confirmPasswordchange: confirmPasswordchange
    } );
    this.form_Pass = this.fb.group( {
      passwordhistory: passwordhistory,
      passwordchange: passwordchange,
      confirmPasswordchange: confirmPasswordchange
    } );
  }

  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.form.patchValue({
          files: reader.result
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
    this.selectedFile = new Promise((resolve, reject) => {
      resolve(this.form.value.image.split('\\')[this.form.value.image.split('\\').length -1].toString())
    });
  }

  vietnamese() {
    this.adapter.setLocale('vi');
  }

}
