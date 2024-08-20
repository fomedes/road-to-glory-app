export class PlayerHistoricDTO {
  player_id: string = '';
  gamesPlayed: number = 0;
  goals: number = 0;
  assists: number = 0;
  yellowCards: number = 0;
  redCards: number = 0;
}

export class HistoricDTO {
  won: number = 0;
  tied: number = 0;
  lost: number = 0;
}

export class TeamDTO {
  constructor(
    public teamId: string = '',
    public clubId: string = '',
    public clubName: string = '',
    public clubCrest: string = '',
    public communityId: string = '',
    public communityName: string = '',
    public userId: string = '',
    public budget: number = 0,
    public players: string[] = [],
    public trophies: string[] = [],
    public historic: HistoricDTO = new HistoricDTO(),
    public playerHistoric: PlayerHistoricDTO[] = []
  ) {}
}
