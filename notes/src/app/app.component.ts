import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notes';
}



export class AppComponent implements OnInit {
  title = 'Notes';
  isAuthenticated: boolean;
  isCollapsed = true;

  ...

}
