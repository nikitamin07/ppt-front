export interface Manufacturer {
  id: number;
  name: string;
  /** Root-relative (/storage/manufacturers/x.jpg) или null. */
  logo_url: string | null;
}
