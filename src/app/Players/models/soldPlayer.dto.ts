export class SoldPlayerDTO {
  player_id: number;
  selling_club: string | null;
  selling_amount: number;
  selling_date: Date | null;

  constructor(
    player_id: number,
    selling_club: string | null,
    selling_amount: number,
    selling_date: Date | null
  ) {
    this.player_id = player_id;
    this.selling_club = selling_club;
    this.selling_amount = selling_amount;
    this.selling_date = selling_date;
  }
}
