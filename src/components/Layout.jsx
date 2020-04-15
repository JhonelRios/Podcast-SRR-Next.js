import React from 'react';
import Link from 'next/link';

import '../styles/components/Layout.scss';

const Layout = (props) => {
    const { title, children } = props;

    return (
        <>
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
