import { DUMMY_NEWS } from "@/dummy-news";
import { getNewsItem } from "@/news";
import Link from "next/link";
import { notFound } from "next/navigation";


export default async function NewsDetailPage({ params }) {
    const newsSlug = await params.slug
    const newsItem = await getNewsItem(newsSlug);
    console.log("Slug:", newsSlug);
    console.log("Found news item:", newsItem);
    if (!newsItem) {
        return notFound();
    }
    console.log("loaded")
    return (<>
        <article className="news-article">

            <header>
                <Link href={`/news/${newsItem.slug}/image`}>
                    <img src={`/images/news/${newsItem.image}`}
                        alt={newsItem.title} />
                </Link>

                <h1>
                    {newsItem.title}
                </h1>
                <time dateTime={newsItem.date}>
                    {newsItem.date}
                </time>
            </header>
            <p>
                {newsItem.content}
            </p>
        </article>
    </>);
}