import { Papa } from 'ngx-papaparse';
import { environment } from 'src/environments/environment';


export class DataProvider {
    private metadata_file = '/assets/BSE_metadata.csv';
    private database_code = 'BSE';
    // const endpoint = 'https://data.nasdaq.com/api/v3/datasets/HKEX/40819?api_key=6soAgnD15ThwLQ3SomsZ';

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

    async companyList(dataset_code?: string) {
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

        return listing;
    }

    companyData(dataset_code: string, filter: any = {}) {
        const endpoint = `${environment.api.endpoint}/${this.database_code}/${dataset_code}`;
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

        let company_data = null;
        this.getData(url)
            .then(data => {
                console.log('company data', data);
                company_data = data;
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        return company_data;
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
