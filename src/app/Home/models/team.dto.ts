export class TeamDTO {
  position: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;

  constructor(
    position: number,
    name: string,
    played: number,
    won: number,
    drawn: number,
    lost: number,
    points: number
  ) {
    this.position = position;
    this.name = name;
    this.played = played;
    this.won = won;
    this.drawn = drawn;
    this.lost = lost;
    this.points = points;
  }
}
