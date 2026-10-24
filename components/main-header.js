"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function MainHeader() {
        const pathName = usePathname();
    return (
        <header id="main-header">
            <div id="logo">
                <Link href="/">NextNews</Link>
            </div>
            <nav>
                <ul>
                    <li >
                        <Link className={pathName.startsWith('/news') ?  'active' : undefined} href="/news">News</Link>
                    </li>
                    <li>
                        <Link className={pathName.startsWith('/archive') ?  'active' : undefined} href="/archive">Archive</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}