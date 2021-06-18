// import ObjectsToCsv from "objects-to-csv"
import {GoogleSpreadsheet } from "google-spreadsheet"
import {getArticlesByParameters} from '../api/ieeeSearch'


interface Props {
    conference: string;
    endYear: string;
    startYear: string;
}

export const generateCsvFile = ({conference, endYear, startYear}: Props) =>
    getArticlesByParameters({
        queryText: conference, endYear, startYear
    }).then(async (res) => {

        const doc = new GoogleSpreadsheet('<1da4A1azoJR77nWFRRzbIqIWsalTW5WbMPIolbGsEKZw>');
        await doc.useServiceAccountAuth({
            client_email: 'portal@portalengenharia-317100.iam.gserviceaccount.com',
            private_key: '112262390513472470328',
        });

        await doc.loadInfo(); // loads document properties and worksheets
        console.log(doc.title);


        // const csv = new ObjectsToCsv(res)

        // await csv.toDisk('./dist/list.csv')
        // return await csv.toString();
    });

