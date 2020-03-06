import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { MatSnackBarRef, SimpleSnackBar, MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ComparePassword } from 'src/app/shared/validators/customvalidator.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) {}
  

 public get f() { return this.registerForm.controls; }

  public get username(): AbstractControl {
    return this.registerForm.controls.username;
  }
  public get firstname(): AbstractControl {
    return this.registerForm.controls.firstname;
  }
  public get lastname(): AbstractControl {
    return this.registerForm.controls.lastname;
  }
  public get mail(): AbstractControl {
    return this.registerForm.controls.mail;
  }
  public get password(): AbstractControl {
    return this.registerForm.controls.password;
  }
  public get confirmPassword(): AbstractControl {
    return this.registerForm.controls.password;
  }

  

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      username: ['',
        Validators.compose(
          [Validators.required]
        )
      ],
      firstname: ['',
        Validators.compose(
          [Validators.required]
        )
      ],
      lastname: ['',
        Validators.compose(
          [Validators.required]
        )
      ],
      mail: ['',
        Validators.compose(
          [Validators.required, Validators.email]
        )
      ],
      password: ['',
        Validators.compose(
          [Validators.required, Validators.minLength(5)]
        )
      ],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: ComparePassword( "confirmPassword","password")
    }
    );
    
  }

  onSubmit() {
    this.submitted = true;
    const snack: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(
      'You are now registered ;-)',
      null,
      {
        duration: 2000
      }
    );
    setTimeout(() => {
      this.onReset();  
    }, 2000);

    //TODO sent data to db
  }

  onReset(){
    this.registerForm.reset();
    this.submitted = false;
  }

}


