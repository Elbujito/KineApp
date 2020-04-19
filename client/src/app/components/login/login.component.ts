import { Router, ActivatedRoute, NavigationEnd, Event as NavigationEvent} from '@angular/router';
import { OnInit, Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
invalidLogin = false
loginStarted: Boolean;
form: FormGroup = new FormGroup({
     username: new FormControl(''),
     password: new FormControl(''),
})

constructor(private authService: AuthenticationService, private usersService: UsersService) {}

@Input() error: string | null;

ngOnInit()
{
  this.loginStarted = false;
}

@Output() token = new EventEmitter<string>();

submit() {
    if (this.form.valid) {
      this.loginStarted = true;
      this.error = "";
      let data = {'username': this.form.get('username').value, 'password': this.form.get('password').value};
      this.authService.authenticate(data).subscribe(response => {
          this.authService.setToken(response.token);
          this.usersService.getSelf().subscribe(user => {
            this.authService.setUser(user);
            this.token.emit('');
          });
        }, error => {
          this.loginStarted = false;
          this.error = "Incorrect username or password";
        }
      );
    }
    else
    {
      this.error = "Specify username and password";
    }
}
}
