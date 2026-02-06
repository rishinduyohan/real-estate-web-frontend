import { UserRole } from "../service/auth.service";

export interface User{
    id:number;
    fullName:string;
    email:string;
    password:string;
    phone:string;
    role:UserRole;
    createdDate:Date
}