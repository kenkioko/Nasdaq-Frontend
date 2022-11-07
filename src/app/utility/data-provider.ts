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

    async companyList(dataset_code?: string|null, max?: number) {
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
        url.searchParams.set('api_key', environment.api.key);

        // filter by start date
        if (filter.hasOwnProperty('start_date')) {
            url.searchParams.set('start_date', filter.start_date)
        }

        // filter by end date
        if (filter.hasOwnProperty('end_date')) {
            url.searchParams.set('end_date', filter.start_date)
        }

        // filter by limit
        var limit: number = 50;
        if (filter.hasOwnProperty('limit')) {
            limit = filter.limit
        }
        url.searchParams.set('limit', limit.toString());

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
