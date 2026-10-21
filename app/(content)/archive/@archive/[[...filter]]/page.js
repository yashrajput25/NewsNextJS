import React from 'react'
import Link from 'next/link';
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from '@/news';
import NewsList from '@/components/news-list';

const FilteredNewsPage = ({ params }) => {

    const filter = params.filter;
    let links = getAvailableNewsYears();
    console.log("Caught your params here! ", { filter })
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];
    let news;

    if (selectedYear && !selectedMonth) {
        news = getNewsForYear(selectedYear);
        links = getAvailableNewsMonths(selectedYear);
    }

    else if (selectedYear && selectedMonth) {
        news = getNewsForYearAndMonth(selectedYear, selectedMonth);
        links=[];
    }

    console.log(links); // not actual link //

    let newsContent = "No news for this time period";

    if (news && news.length > 0) {
        newsContent = <NewsList news={news} />
    }

    if(selectedYear && !getAvailableNewsYears().includes(+selectedYear) || 
        selectedMonth && !getAvailableNewsMonths(selectedYear).includes(+selectedMonth)
    ){
        throw new Error('Invalid Filter');
    }

    return (
        <div>
            <header className='archive-header'>
                <nav>
                    <ul>
                        {links.map((link) => {
                            const href = selectedYear ?
                                `/archive/${selectedYear}/${link}` :
                                `/archive/${link}`;
                            return (<li>
                                <Link href={href}>
                                    {link}
                                </Link>
                            </li>)
                        })}
                    </ul>
                </nav>
            </header>
            {newsContent}
        </div>
    )
}

export default FilteredNewsPage
