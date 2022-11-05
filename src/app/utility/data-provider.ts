import { Papa } from 'ngx-papaparse';
import { environment } from 'src/environments/environment';


export class DataProvider {
    private metadata_file = '/assets/BSE_metadata.csv';
    // const endpoint = 'https://data.nasdaq.com/api/v3/datasets/HKEX/40819?api_key=6soAgnD15ThwLQ3SomsZ';
    // const endpoint = process.env.API_ENDPOINT;

    async companyList(callback: Function, error?: Function) {
        // console.log(environment.api);

        const papa = new Papa();
        return await papa.parse(this.metadata_file, {
            complete: (results: any, file: any) => {
                return callback(results, file);
            },
            error: (error: any, file: any) => {
                return error(error, file)
            },

            // other options
            header: true,
            download: true,
            skipEmptyLines: true,
        });
    }

    async companyData(url: string) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        return response.json();
    }
}
