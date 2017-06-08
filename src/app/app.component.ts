import { Observable } from 'rxjs/Observable';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { StorageProvider, AuthProvider } from '../providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  isMenuEnabled$: Observable<boolean>;
  rootPage: any = 'HomePage';

  constructor(
    public platform: Platform,
    public storageProvider: StorageProvider,
    public authProvider: AuthProvider,
  ) {
    this.isMenuEnabled$ = this.authProvider.isAuthenticated$();

    this.platform.ready().then(() => {
      this.storageProvider.run();
      this.authProvider.run();
      const isAuthenticated = this.authProvider.isAuthenticated()
      console.log('isAuthenticated', isAuthenticated)
      if (!isAuthenticated) this.nav.setRoot('LoginPage')
    });
  }
}
