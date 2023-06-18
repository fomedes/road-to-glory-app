export class selectedPlayerDTO {
  player_id: number;
  bidding_club: string | null;
  bidding_amount: number;
  bidding_date: Date | null;

  constructor(
    player_id: number,
    biding_club: string | null,
    biding_amount: number,
    biding_date: Date | null
  ) {
    this.player_id = player_id;
    this.bidding_club = biding_club;
    this.bidding_amount = biding_amount;
    this.bidding_date = biding_date;
  }
}
