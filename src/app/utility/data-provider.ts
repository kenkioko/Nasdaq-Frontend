import { Papa } from 'ngx-papaparse';

import { environment } from 'src/environments/environment';


export class DataProvider {
    private metadata_file = '/assets/BSE_metadata.csv';
    private database_code = 'BSE';

    private async companyCSV(callback?: Function, error_callback?: Function) {
        const papa = new Papa();

        return new Promise(resolve => {
            papa.parse(this.metadata_file, {
                complete: (results: any, file: any) => {
                    resolve(results.data);

                    if (callback) {
                        callback(results, file);
                    }
                },
                error: (error: any, file: any) => {
                    if (error_callback) {
                        error_callback(error, file)
                    }
                },

                // other options
                header: true,
                download: true,
                skipEmptyLines: true,
            });
        });
    }

    async companyList(dataset_code?: string | null, max?: number) {
        let listing: any = await this.companyCSV();
        listing = listing.hasOwnProperty('data')
            ? listing['data']
            : listing;

        // filter by dataset code
        if (dataset_code) {
            listing = listing.find((company: any) => (
                company.code === dataset_code
            ));
        }

        // get max rows
        if (max) {
            listing = listing.slice(0, max);
        }

        return listing;
    }

    async companyData(dataset_code: string, filter: any = {}) {
        const endpoint = `${environment.api.endpoint}/${this.database_code}/${dataset_code}.json`;
        const url = new URL(endpoint, environment.api.base_url);

        if (environment.api.key) {
            url.searchParams.set('api_key', environment.api.key);
        }

        const params = [
            { key: 'start_date', default: null },
            { key: 'end_date', default: null },
            { key: 'column_index', default: null },
            { key: 'limit', default: '50' }
        ];

        const filter_data = (col: any, val: string | null) => {
            if (val && filter.hasOwnProperty(col.key)) {
                url.searchParams.set(col.key, val);
            }

            // set default
            if (!val && col.default) {
                url.searchParams.set(col.key, col.default);
            }
        }

        params.forEach(col => {
            filter_data(col, filter[col.key]);
        });

        return this.getData(url);
    }

    private async getData(url: URL) {
        const headers = {
            "Accept": "application/json"
        };

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        });

        let data = null;
        if (response.ok) {
            data = response.json();
        }

        return data;
    }
}
