import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import '../styles/components/Layout.scss';

const Layout = (props) => {
    const { title, children } = props;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>

            <header>
                <Link href="/">
                    <a>Podcast</a>
                </Link>
            </header>

            {children}
        </>
    );
};

export default Layout;
