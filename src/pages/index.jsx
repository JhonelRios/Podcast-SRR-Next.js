import React from 'react';
import Link from 'next/link';
import axios from 'axios';

import Layout from '../components/Layout';

import '../styles/index.scss';

const index = (props) => {
    const { channels } = props;

    return (
        <Layout title="Podcast">
            <div className="channels">
                {channels.map((channel) => (
                    <Link key={channel.id} href={`/channel?id=${channel.id}`}>
                        <a className="channel">
                            <img src={channel.urls.logo_image.original} alt=""/>
                            <h2>{channel.title}</h2>
                        </a>
                    </Link>
                ))}
            </div>
        </Layout>
    );
};

export async function getServerSideProps() {
    const { data } = await axios({
        url: 'https://api.audioboom.com/channels/recommended',
        method: 'get',
    });

    const { body: channels } = data;

    return { props: { channels } };
}

export default index;
