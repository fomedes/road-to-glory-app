export class MatchStatsDTO {
  constructor(
    public home: TeamStatsDTO = new TeamStatsDTO(),
    public away: TeamStatsDTO = new TeamStatsDTO()
  ) {}
}

export class TeamStatsDTO {
  constructor(
    public goals: number | null = null,
    public possession: number | null = null,
    public ballRecovery: number | null = null,
    public shots: number | null = null,
    public expectedGoals: number | null = null,
    public passes: number | null = null,
    public tackles: number | null = null,
    public tacklesWon: number | null = null,
    public interceptions: number | null = null,
    public saves: number | null = null,
    public foulsCommitted: number | null = null,
    public offsides: number | null = null,
    public corners: number | null = null,
    public freeKicks: number | null = null,
    public penaltyKicks: number | null = null,
    public yellowCards: number | null = null,
    public redCards: number | null = null,
    public injuries: number | null = null
  ) {}
}