import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import auth from 'src/app/services/firebase/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, MessageService],
})
export class LoginComponent implements OnInit {
  errorFlag: boolean;
  displayModal: boolean;
  recoverEmail: string;
  email: string;
  password: string;

  constructor(
    private _userService: UserService,
    private _messageService: MessageService,
    private _spinner: NgxSpinnerService,
    private _router: Router,
  ) {
    this.errorFlag = false;
    this.displayModal = false;
    this.recoverEmail = '';
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {}

  showModalDialog() {
    this.displayModal = true;
  }

  sendEmailRecoverPassword() {
    this._spinner.show();
    if (this.recoverEmail != '') {
      auth
        .sendPasswordResetEmail(this.recoverEmail)
        .then(() => {
          this._messageService.add({
            severity: 'success',
            summary: 'E-mail enviado',
            detail:
              'Verifique sua caixa de e-mail pelo link de recuperação de senha.',
          });
        })
        .catch((error: any) => {
          if (error.code == 'auth/user-not-found') {
            this._messageService.add({
              severity: 'error',
              summary: 'Usuário não encontrado',
              detail:
                'Verifique se digitou seu e-mail certo ou realize um novo cadastro.',
            });
          }
        })
        .finally(() => {
          this.displayModal = false;
          this.recoverEmail = '';
          this._spinner.hide();
        });
    }
  }

  onSubmit() {
    this._spinner.show();

    if (this.email != '' && this.password != '') {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((response: any) => {
          let info = {
            uid: response.user.uid,
            email: response.user.email,
          };
          localStorage.setItem('identity', JSON.stringify(info));
          this._spinner.hide();
          this._router.navigate(['/space-joy']);
        })
        .catch((error) => {
          if (error.code == 'auth/wrong-password') {
            this._messageService.add({
              severity: 'error',
              summary: 'Senha incorreta',
              detail: 'Verifique se preencheu corretamente.',
            });
          }
          this._spinner.hide();
        });
    }
  }
}
