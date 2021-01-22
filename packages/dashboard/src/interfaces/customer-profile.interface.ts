import { IPageInfo } from './page-info.interface';

export interface ICustomerProfile {
    id: number;

    first_name: string;

    last_name: string;

    email: string;

    gender: string;

    company: string;

    city: string;

    title: string;

    lat?: number;

    long?: number;
}

export interface ICustomerProfileList {
    items: ICustomerProfile[];
    pageInfo: IPageInfo;
}
