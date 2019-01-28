import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RoutesRecognized
} from '@angular/router';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading$: Observable<boolean>;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.loading$ = this.router.events
      .filter(event => event instanceof NavigationStart || event instanceof NavigationEnd ||
        event instanceof NavigationCancel || event instanceof RoutesRecognized ||
        event instanceof RouteConfigLoadStart || event instanceof RouteConfigLoadEnd)
      .map(event => event instanceof NavigationStart ||
        event instanceof RoutesRecognized)
  }

}
