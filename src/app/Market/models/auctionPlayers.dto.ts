export class auctionPlayersDTO {
  community: number;
  selected_players: SelectedPlayers[];

  constructor(community: number, selected_players: SelectedPlayers[]) {
    this.community = community;
    this.selected_players = selected_players;
  }
}

export class SelectedPlayers {
  player_id: number;
  biding_club: string;
  biding_amount: number;
  biding_date: null;

  constructor(
    player_id: number,
    biding_club: string,
    biding_amount: number,
    biding_date: null
  ) {
    this.player_id = player_id;
    this.biding_club = biding_club;
    this.biding_amount = biding_amount;
    this.biding_date = biding_date;
  }
}
