export interface ResponseLOGIN {
  user:          User;
  authorization: Authorization;
}

export interface Authorization {
  token: string;
  type:  string;
}

export interface User {
  user_id:    string;
  user_name:  string;
  role:       string;
  email:      string;
  company_id: string;
  area_id:    string;
  post_id:    string;
}
