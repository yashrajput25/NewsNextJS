import React, { Suspense } from 'react'
import Link from 'next/link';
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from '@/news';
import NewsList from '@/components/news-list';

const FilteredNews = async ({ selectedYear, selectedMonth }) => {
    console.log("hey i am called")
    let news;

    if (selectedYear && !selectedMonth) {
        news = await getNewsForYear(selectedYear);
        console.log(JSON.stringify(news));
    } else if (selectedYear && selectedMonth) {
        news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
    }

    let newsContent = <p>No news for this time period</p>

    if (news && news.length > 0) {
        newsContent = <NewsList news={news} />
        console.log(newsContent);
    }

    return newsContent;
}

const FilteredHeaders = async ({ selectedYear, selectedMonth }) => {
    let links = await getAvailableNewsYears();
    if (selectedYear && !selectedMonth) {
        links = getAvailableNewsMonths(selectedYear);
    }
    if (selectedYear && selectedMonth) {
        links = [];
    }

    return <>
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
    </>
}


const FilteredNewsPage = async ({ params }) => {

    const filter = params.filter;
    console.log("Caught your params here! ", { filter })
    const selectedYear = filter?.[0];
    const selectedMonth = filter?.[1];
    console.log((selectedYear));
    console.log((selectedMonth));

    // console.log(links); // not actual link //


    const availableYears = await getAvailableNewsYears();
    if (selectedYear && !availableYears.includes(selectedYear) ||
        selectedMonth && !getAvailableNewsMonths(selectedYear).includes(selectedMonth)
    ) {
        throw new Error('Invalid Filter');
    }

    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <FilteredHeaders selectedYear={selectedYear} 
                selectedMonth={selectedMonth} />
                <FilteredNews
                    selectedYear={selectedYear}
                    selectedMonth={selectedMonth}
                />
            </Suspense>
        </>
    )
}

export default FilteredNewsPage
