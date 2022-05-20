export interface Discount<Configuration> {
  title: string;
  startsAt: Date;
  endsAt?: Date;
  configuration: Configuration;
}
