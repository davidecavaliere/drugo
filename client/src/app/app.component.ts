import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { Log } from '@microgamma/loggator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Log()
  private $l;

  @ViewChild('toolbar', { static: true })
  private toolbar: ToolbarComponent;
  public user$;

  constructor(private auth: AuthService, private router: Router) {

    this.$l.d('router config', router.config);

    this.user$ = auth.user$;

    auth.token$.subscribe((value) => {
      this.$l.d('got token from behavior subject', value);
    });

    auth.isAuthenticated.subscribe((value) => {
      this.$l.d('subscribed to isAuthenticated', value);
    });

    document.addEventListener('portlet:bootstrap', (ev) => {
      this.$l.d('a portlet is bootstrapping', ev);
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      this.toolbar.isLoading = event instanceof NavigationStart;
    });
  }

}

