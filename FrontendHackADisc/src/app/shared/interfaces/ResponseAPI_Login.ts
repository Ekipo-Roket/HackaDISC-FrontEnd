export interface ResponseLOGIN {
  user:          User;
  authorization: Authorization;
}

export interface Authorization {
  token: string;
  type:  string;
}

export interface User {
  id:         number;
  user_name:  string;
  role_id:    number;
  role_name?: string;
  email:      string;
  post_id:    number;
  company_id: number;
  area_id:    number;
  created_at: Date;
  updated_at: Date;
  area_name?: string;

}
