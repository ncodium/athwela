import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { RouterExtensions } from "nativescript-angular/router";

// class used for keeping user data
import { User } from "../shared/user.model";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  processing = false;
  @ViewChild("password", { static: false }) password: ElementRef;

  constructor(private page: Page, private routerExtensions: RouterExtensions) {
    this.page.actionBarHidden = true;
    this.user = new User();
    this.user.email = "user@nativescript.org";
    this.user.password = "password";
  }

  ngOnInit() { }

  submit() {
    if (!this.user.email || !this.user.password) {
      this.alert("Please provide both an email address and password.");
      return;
    }

    this.processing = true;
    this.login()
  }

  login() {
    /* this.userService.login(this.user)
      .then(() => {
        this.processing = false;
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
      })
      .catch(() => {
        this.processing = false;
        this.alert("Unfortunately we could not find your account.");
      }); */
  }

  forgotPassword() {
    prompt({
      title: "Forgot Password",
      message: "Enter the email address you used to register for APP NAME to reset your password.",
      inputType: "email",
      defaultText: "",
      okButtonText: "Ok",
      cancelButtonText: "Cancel"
    }).then((data) => {
      if (data.result) {
        /* this.userService.resetPassword(data.text.trim())
          .then(() => {
            this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
          }).catch(() => {
            this.alert("Unfortunately, an error occurred resetting your password.");
          }); */
      }
    });
  }

  focusPassword() {
    this.password.nativeElement.focus();
  }

  alert(message: string) {
    return alert({
      title: "Athwela",
      okButtonText: "OK",
      message: message
    });
  }

}
