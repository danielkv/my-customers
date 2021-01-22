import { IPageInfo } from './page-info.interface';

export interface ICity {
    city: string;
    customers_total: number;
}

export interface ICityList {
    items: ICity[];
    pageInfo: IPageInfo;
}
