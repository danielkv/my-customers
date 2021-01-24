import { initDataSource } from '../init-data-source';
import { ICustomer } from '../customer/customer.interface';
import customerData from '../customers.json';

export async function initialSetup() {
    const dataSource: ICustomer[] = customerData;
    await initDataSource.execute(dataSource);
}
