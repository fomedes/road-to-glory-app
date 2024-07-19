export class PlayerPriceDTO {
  public ovr: number = 1;
  public price: number = 100;
}

export class MarketDTO {
  public randomPlayers: boolean = false;
  public minOvr: number = 1;
  public maxOvr: number = 100;
  public bidWindow: 'instant' | '24' | '48' | '72' = 'instant';
  public announceBid: 'none' | 'player' | 'amount' | 'both' = 'none';
  public playerPrices: PlayerPriceDTO[] = [];
}

export class CommunityDTO {
  constructor(
    // Community Bio
    public id: string = '',
    public name: string = '',
    public isPrivate: boolean = false,
    public password: string = '',
    public communityPlatforms: [] = [],
    public admins: string[] = [],
    public users: string[] = [],

    // Starting Conditions
    public startingTeam: string = '',
    public startingBudget: string = '',

    // Market Configuration
    public market: MarketDTO = new MarketDTO(),

    // Competition Activity
    public registeredClubs: [] = [],
    public registeredPlayers: [] = [],
    public tournaments: [] = [],
    public seasons: [] = [],
    public news: [] = []
  ) {}
}
