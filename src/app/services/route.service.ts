import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  getRouteParam(param: string): string | null {
    return this.route.snapshot.paramMap.get(param);
  }

  getAllRouteParams(): { [key: string]: string } {
    return this.route.snapshot.paramMap.keys.reduce((params, key) => {
      params[key] = this.route.snapshot.paramMap.get(key) as string;
      return params;
    }, {} as { [key: string]: string });
  }

  getRouteSegments(): string[] {
    return this.router.url.split('/').filter((segment) => segment.length > 0);
  }
}
