import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { MatSnackBarRef, SimpleSnackBar, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {

   }

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

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['',
      Validators.compose(
        [Validators.required, Validators.minLength(3)]
      )
      ],
      firstname: ['',
      Validators.compose(
        [Validators.required, Validators.minLength(2)]
      )
      ],
      lastname: ['',
      Validators.compose(
        [Validators.required, Validators.minLength(2)]
      )
      ],
      mail: ['',
      Validators.compose(
        [Validators.required, Validators.minLength(5)]
      )
      ],
      password: ['',
      Validators.compose(
        [Validators.required, Validators.minLength(5)]
      )
      ],
    });
  }

  onSubmit() {
    this.registerForm.reset();
    const snack: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(
      'You are now registered ;-)',
      null,
      {
        duration: 2000
      }
    );
    //TODO sent data to back
  }

}
