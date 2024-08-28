import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronDown,
  faChevronRight,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import { GetKeysPipe } from '../../../pipes/get-keys.pipe';
import { ToCurrencyPipe } from '../../../pipes/to-currency.pipe';
import { CommunityService } from '../../../services/community.service';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-community-page',
  standalone: true,
  imports: [CommonModule, GetKeysPipe, ToCurrencyPipe,FontAwesomeModule, RouterModule],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss',
})
export class CommunityPageComponent implements OnInit {
  faRightChevron = faChevronRight;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  communityId: string = '';
  communityTeams: any[] = [];
  isMenuOpened: boolean = false;

  reversedNews: any[] = [];
  lastNews: any = {};
  freeAgent: any = {
    freeAgentId: '66c76ea075bb6f00380323af',
    freeAgentName: 'Free Agent',
    freeAgentCrest: 'assets/images/others/free_agent_crest.png',
  }

  constructor(
    private communityService: CommunityService,
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.communityId = params.get('communityId') ?? '';
      this.getLastNews();
      this.getCommunityTeams();
    });
  }

  getLastNews(): void {
    this.newsService.getNews(this.communityId).subscribe((news: any) => {
      this.reversedNews = news.slice(-15).reverse();

      this.lastNews = this.reversedNews.reduce(
        (acc: { [key: string]: any[] }, item: any) => {
          const date = new Date(item.createdAt).toLocaleDateString();
          acc[date] = acc[date] || [];
          acc[date].push(item);
          return acc;
        },
        {}
      );
    });
  }

  getCommunityTeams(): void {
    this.communityService.getCommunityTeams(this.communityId).subscribe((teams) => {
      this.communityTeams = teams;
      console.log(this.communityTeams);
    });
  }

  getRouterLink(teamId: string): string[] | null {
    return teamId === this.freeAgent.freeAgentId ? null : ['/club', teamId];
  }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
