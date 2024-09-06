import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faGear, faPersonWalkingArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { GetKeysPipe } from '../../../pipes/get-keys.pipe';
import { ToCurrencyPipe } from '../../../pipes/to-currency.pipe';
import { CommunityService } from '../../../services/community.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-community-page',
  standalone: true,
  imports: [CommonModule, GetKeysPipe, ToCurrencyPipe, FontAwesomeModule, RouterModule],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss',
})
export class CommunityPageComponent implements OnInit {
  faPersonWalking = faPersonWalkingArrowRight;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faGear = faGear;
  communityId: string = '';
  communityData: any = {};
  communityAdmins: any[] = [];  
  communityTeams: any[] = [];
  isTeamsMenu: boolean = false;
  isNewsMenu: boolean = true;
  isUserAdmin: boolean = false;

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
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.communityId = params.get('communityId') ?? '';
      this.getcommunityData();
      this.getLastNews();
      this.getCommunityTeams();  
    });
  }

  getcommunityData(): void {
    this.communityService.getCommunityData(this.communityId).subscribe((community) => {
      this.communityData = community;
      console.log(this.communityData);
      this.getCommunityAdmins();
    });
  }

  getCommunityAdmins(): void {
    this.communityAdmins = this.communityData.admins
    this.checkIsUserAdmin();
  }

  checkIsUserAdmin(): void {
    this.isUserAdmin = this.communityData.admins.some(
      (admin: string) => {
        const currentUser = this.localStorageService.getItem('user');
        if (currentUser) {
          return admin === currentUser.userId
        }
        return false
      });
  }
  
  getLastNews(): void {
    this.newsService.getNews(this.communityId).subscribe((news: any) => {
      this.reversedNews = news.slice(-20).reverse();

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
    });
  }

  getRouterLink(teamId: string): string[] | null {
    return teamId === this.freeAgent.freeAgentId ? null : ['/club', teamId];
  }

  toggleMenu(menuKey: string): void {
    (this as any)[menuKey] = !(this as any)[menuKey];
  }}
