import axios from "axios";
import {processIeeeData} from '../utils/processIeeeData';

interface IGetArticlesByParameters {
    queryText: string;
    startYear: string;
    endYear: string;
}

export const getArticlesByParameters = async ({queryText, startYear, endYear}: IGetArticlesByParameters) => {
    const queryTextStr = startYear ? `&querytext=${queryText}` : '';
    const startYearStr = startYear ? `&start_year=${startYear}` : '';
    const endYearStr = startYear ? `&end_year=${endYear}` : '';
    const response = await axios.get(`http://ieeexploreapi.ieee.org/api/v1/search/articles?apikey=b5nnfvnct7m43cs63y6j8tdc&format=json&sort_order=asc${queryTextStr}${startYearStr}${endYearStr}&max_records=1000`);
    return processIeeeData(response.data.articles, 'ICSE');
}
