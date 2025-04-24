
// User related types
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'barat' | 'timur';
}

// Goat related types
export type GoatGender = 'male' | 'female';
export type GoatStatus = 'healthy' | 'sick' | 'dead';
export type BarnType = 'barat' | 'timur';

export interface Goat {
  id: string;
  tag: string;
  weight: number;
  age: number;
  gender: GoatGender;
  status: GoatStatus;
  barn: BarnType;
}

export interface GoatStats {
  total: number;
  barat: number;
  timur: number;
}

// Feeding log related types
export interface FeedingLog {
  id: string;
  date: string;
  feed_time: string;
  barn: BarnType;
  note: string;
  user_id: string;
}

export interface FeedingLogForDate {
  id: string;
  feed_time: string;
  barn: BarnType;
  note: string;
}

// Form related types
export interface GoatFormData {
  tag: string;
  weight: number | '';
  age: number | '';
  gender: GoatGender;
  status: GoatStatus;
  barn: BarnType;
}

export interface FeedingLogFormData {
  date: string;
  feed_time: string;
  barn: BarnType;
  note: string;
}
