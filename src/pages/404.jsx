import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

import '../styles/error.scss';

const Custom404 = () => {
    return (
        <Layout title="Error 404">
            <div className="message">
                <h1>Esta página no existe</h1>
                <p><Link href="/"><a>Volver a la página de inicio</a></Link></p>
            </div>
        </Layout>
    );
};

export default Custom404;
