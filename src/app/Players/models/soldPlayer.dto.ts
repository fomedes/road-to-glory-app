export class soldPlayerDTO {
  player_id: number;
  selling_club: string | null;
  selling_amount: number;
  selling_date: Date | null;

  constructor(
    player_id: number,
    biding_club: string | null,
    biding_amount: number,
    biding_date: Date | null
  ) {
    this.player_id = player_id;
    this.selling_club = biding_club;
    this.selling_amount = biding_amount;
    this.selling_date = biding_date;
  }
}
