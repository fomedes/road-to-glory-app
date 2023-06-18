export class PlayerDTO {
  id: number;
  photo: string;
  short_name: string;
  age: number;
  height: number;
  weight: number;
  pref_position: string;
  country: string;
  overall: number;
  potential: number;
  crossing: number;
  finishing: number;
  heading_accuracy: number;
  short_passing: number;
  volleys: number;
  dribbling: number;
  curve: number;
  free_kick: number;
  long_passing: number;
  ball_control: number;
  acceleration: number;
  sprint: number;
  agility: number;
  reactions: number;
  balance: number;
  shot_power: number;
  jumping: number;
  stamina: number;
  strength: number;
  long_shot: number;
  aggression: number;
  interceptions: number;
  positioning: number;
  vision: number;
  penalties: number;
  composure: number;
  defense_awareness: number;
  standing_tackle: number;
  sliding_tackle: number;
  gk_diving: number;
  gk_handling: number;
  gk_kicking: number;
  gk_positioning: number;
  gk_reflexes: number;
  traits: string;
  preferred_foot: string;
  weak_foot: number;
  skill_moves: number;
  attacking_WR: string;
  defensive_WR: string;
  body_type: string;
  real_face: boolean;
  current_club: string;
  isFreeAgent: boolean;

  constructor(
    id: number,
    photo: string,
    short_name: string,
    age: number,
    height: number,
    weight: number,
    pref_position: string,
    country: string,
    overall: number,
    potential: number,
    crossing: number,
    finishing: number,
    heading_accuracy: number,
    short_passing: number,
    volleys: number,
    dribbling: number,
    curve: number,
    free_kick: number,
    long_passing: number,
    ball_control: number,
    acceleration: number,
    sprint: number,
    agility: number,
    reactions: number,
    balance: number,
    shot_power: number,
    jumping: number,
    stamina: number,
    strength: number,
    long_shot: number,
    aggression: number,
    interceptions: number,
    positioning: number,
    vision: number,
    penalties: number,
    composure: number,
    defense_awareness: number,
    standing_tackle: number,
    sliding_tackle: number,
    gk_diving: number,
    gk_handling: number,
    gk_kicking: number,
    gk_positioning: number,
    gk_reflexes: number,
    traits: string,
    preferred_foot: string,
    weak_foot: number,
    skill_moves: number,
    attacking_WR: string,
    defensive_WR: string,
    body_type: string,
    real_face: boolean,
    current_club: string,
    isFreeAgent: boolean
  ) {
    this.id = id;
    this.photo = photo;
    this.short_name = short_name;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.pref_position = pref_position;
    this.country = country;
    this.overall = overall;
    this.potential = potential;
    this.crossing = crossing;
    this.finishing = finishing;
    this.heading_accuracy = heading_accuracy;
    this.short_passing = short_passing;
    this.volleys = volleys;
    this.dribbling = dribbling;
    this.curve = curve;
    this.free_kick = free_kick;
    this.long_passing = long_passing;
    this.ball_control = ball_control;
    this.acceleration = acceleration;
    this.sprint = sprint;
    this.agility = agility;
    this.reactions = reactions;
    this.balance = balance;
    this.shot_power = shot_power;
    this.jumping = jumping;
    this.stamina = stamina;
    this.strength = strength;
    this.long_shot = long_shot;
    this.aggression = aggression;
    this.interceptions = interceptions;
    this.positioning = positioning;
    this.vision = vision;
    this.penalties = penalties;
    this.composure = composure;
    this.defense_awareness = defense_awareness;
    this.standing_tackle = standing_tackle;
    this.sliding_tackle = sliding_tackle;
    this.gk_diving = gk_diving;
    this.gk_handling = gk_handling;
    this.gk_kicking = gk_kicking;
    this.gk_positioning = gk_positioning;
    this.gk_reflexes = gk_reflexes;
    this.traits = traits;
    this.preferred_foot = preferred_foot;
    this.weak_foot = weak_foot;
    this.skill_moves = skill_moves;
    this.attacking_WR = attacking_WR;
    this.defensive_WR = defensive_WR;
    this.body_type = body_type;
    this.real_face = real_face;
    this.current_club = current_club;
    this.isFreeAgent = isFreeAgent;
  }
}
