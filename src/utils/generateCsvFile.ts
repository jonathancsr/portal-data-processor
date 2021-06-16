import ObjectsToCsv from "objects-to-csv"
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
        const csv = new ObjectsToCsv(res)
        await csv.toDisk('./dist/list.csv')
    });

