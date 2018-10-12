export interface IUsers {
    userUUId: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    birthday: Date;
    email: string;
    phone: string;
    address: string;
    town: string;
    lat: number;
    long: number;
    district: string;
    province: string;
    roles: number;
    status: number;
    images: string;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;
    isDeleted: number
}