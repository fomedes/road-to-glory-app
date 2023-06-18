export class MarketSettingsDTO {
  community: number;
  minimum_overall: number;
  maximum_overall: number;
  market_duration: number;
  start_date: Date;
  end_date: Date;
  constructor(
    community: number,
    minimum_overall: number,
    maximum_overall: number,
    market_duration: number,
    start_date: Date,
    end_date: Date
  ) {
    this.community = community;
    this.minimum_overall = minimum_overall;
    this.maximum_overall = maximum_overall;
    this.market_duration = market_duration;
    this.start_date = start_date;
    this.end_date = end_date;
  }
}
