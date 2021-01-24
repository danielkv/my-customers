import { initDataSource } from '../init-data-source';

export async function initialSetup() {
    await initDataSource.execute();
}
