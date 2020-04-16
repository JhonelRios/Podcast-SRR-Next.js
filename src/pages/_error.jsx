import Custom404 from './404';
import Layout from '../components/Layout';

import '../styles/error.scss';

function Error({ statusCode }) {
    return (
        <>
            {statusCode === 404 ? (
                <Custom404 />
            ) : (
                <Layout title={`Error ${statusCode}`}>
                    <div className="message">
                        <h1>Hubo un problema</h1>
                        <p>Inténtelo de nuevo más tarde</p>
                    </div>
                </Layout>
            )}
        </>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
