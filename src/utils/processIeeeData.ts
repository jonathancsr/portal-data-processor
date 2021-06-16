import {IPapers} from '../types/IPapers'

interface IAuthors {
    affiliation: string;
    "full_name": string;
    "author_order": number;
}


export const processIeeeData = (articles: any[], acronym: string): IPapers[] => {
    return articles.map(data => {
        const {ieee_terms, author_terms, controlled_terms, non_controlled_terms} = data.index_terms;

        return {
            title: data.title,
            authors: getAuthorsString(data.authors.authors),
            affiliations: '',
            publication: data.publication_title,
            year: data.publication_year,
            paper_type: '',
            citation: data.citing_paper_count.toString(),
            download: '',
            keywords_ieee: ieee_terms ? getKeywordsString(ieee_terms.terms) : '',
            keywords_author: author_terms ? getKeywordsString(author_terms.terms) : '',
            keywords_controlled: controlled_terms ? getKeywordsString(controlled_terms.terms) : '',
            keywords_non_controlled: non_controlled_terms ? getKeywordsString(non_controlled_terms.terms) : '',
            url: data.html_url,
            acronym: acronym,
            result_research: '',
            doi: data.doi
        }
    });
}


const getAuthorsString = (authors: IAuthors[]): string => {
    let strAuthors = '';

    authors.forEach((author, index) => {
        const pipe = authors.length === index + 1 ? '' : '|';
        strAuthors += `${author.full_name}${pipe}`
    })
    return strAuthors;
}


const getKeywordsString = (terms: string[]): string => {
    let strKeywords = '';

    terms.forEach((keyword, index) => {
        const pipe = terms.length === index + 1 ? '' : '|';
        strKeywords += `${keyword}${pipe}`
    })
    return strKeywords;
}