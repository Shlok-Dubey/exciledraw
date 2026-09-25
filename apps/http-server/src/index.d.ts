import 'express-serve-static-core'
import { JwtPayload } from 'jsonwebtoken';
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

      declare global {
        namespace Express {
          interface Request {
            userId?: string | JwtPayload;
          }
        }
      }
      
      export {};  