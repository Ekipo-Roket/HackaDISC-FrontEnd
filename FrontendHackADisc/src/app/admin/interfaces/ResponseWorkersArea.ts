export interface ResponseWorkersArea {
  id:      number;
  company_id:   number;
  area_id:      number;
  area_name:    string;
  post_id:      number;
  post_name:    string;
  role:         string;
  user_name:    string;
  company_name: string;
  created_at:   Date;
  updated_at:   Date;
  evaluations:  Evaluation[];
  subcompany_name: string;

}

export interface Evaluation {
  user_id:                number;
  adaptability_to_change: number;
  safe_conduct:           number;
  dynamsim_energy:        number;
  personal_effectiveness: number;
  initiative:             number;
  working_under_pressure: number;
  date:                   Date;
  created_at:             Date;
  updated_at:             Date;
}
