
export interface CreateUserInput {
    email: string;
    username: string;
    password: string;
    firstName: string;
  }
  
  export type ResponseOfCreate = {
        success: true;
        id: number;
      }
    | {
        success: false;
        error: string;
      };