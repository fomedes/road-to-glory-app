import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetKeysPipe } from '../../../pipes/get-keys.pipe';
import { CommunityService } from '../../../services/community.service';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-community-page',
  standalone: true,
  imports: [CommonModule, GetKeysPipe],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss',
})
export class CommunityPageComponent implements OnInit {
  communityId: string = '';
  reversedNews: any[] = [];
  lastNews: any = {};

  constructor(
    private communityService: CommunityService,
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.communityId = params.get('communityId') ?? '';
      this.getLastNews();
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
}
