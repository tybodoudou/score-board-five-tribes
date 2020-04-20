export interface PlayerInterface {
  name: string;
  coin: number;
  vizier: number; // yellow meeple
  craftman?: number; // purple meeple
  sage: number; // white meeple
  djinn: number;
  palmTree: number;
  palace: number;
  camel: number;
  object?: number;
  merchandise: number;
  score: number;
}
