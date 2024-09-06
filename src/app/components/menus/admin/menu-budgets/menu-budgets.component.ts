import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToCurrencyPipe } from '../../../../pipes/to-currency.pipe';
import { ReturnButtonComponent } from '../../../shared/return-button/return-button.component';

@Component({
  selector: 'app-menu-budgets',
  standalone: true,
  imports: [ReturnButtonComponent, RouterModule, ToCurrencyPipe],
  templateUrl: './menu-budgets.component.html',
  styleUrl: './menu-budgets.component.scss'
})
export class MenuBudgetsComponent {
  communityId: string = '';
  communityData: any = {};

  constructor ( private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.communityData = navigation.extras.state['communityData'];
    }
  }


}
