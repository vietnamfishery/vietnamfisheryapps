export interface Users {
    userUUId?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    password?: string;
    birthday?: Date;
    email?: string;
    phone?: string;
    address?: string;
    town?: string;
    lat?: number;
    long?: number;
    district?: string;
    province?: string;
    roles?: Roles[];
    role?: Roles;
    status?: number;
    images?: string;
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
    isDeleted?: number
}

export interface Roles {
    rolesId?: number,
    bossId?: number,
    userId?: number,
    roles?: number,
    createdDate?: Date,
    updatedBy?: string,
    isDeleted?: number
}