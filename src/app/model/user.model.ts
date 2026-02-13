export interface User{
    id:number;
    image:string;
    fullName:string;
    email:string;
    password:string;
    phone:string;
    role:'customer' | 'owner' | 'agent' | 'admin';
    createdDate:Date
}
