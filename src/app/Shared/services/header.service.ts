import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Header } from '../models/header.dto';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  headerManagement: BehaviorSubject<Header> = new BehaviorSubject<Header>({
    showAuthSection: false,
    showNoAuthSection: true,
  });
}
