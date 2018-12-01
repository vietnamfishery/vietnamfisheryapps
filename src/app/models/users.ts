export interface Users {
    userId?: number;
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
    wards?: string;
    lat?: number;
    long?: number;
    district?: string;
    districts?: string;
    province?: string;
    provinces?: string;
    roles?: Roles[];
    role?: Roles;
    status?: number;
    images?: string;
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
    isDeleted?: number;
    pondsBy?: any[];
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