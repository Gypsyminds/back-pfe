import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-navbarlogout',
  templateUrl: './navbarlogout.component.html',
  styleUrls: ['./navbarlogout.component.css']
})
export class NavbarlogoutComponent {
constructor(public authService: AuthService){

}
}
