import React from 'react';
import Link from 'next/link';
import axios from 'axios';

import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';

import '../styles/index.scss';

const index = (props) => {
    const { channels } = props;

    return (
        <Layout title="Podcast">
            <ChannelGrid channels={channels} />
        </Layout>
    );
};

export async function getServerSideProps() {
    const { data } = await axios({
        url: 'https://api.audioboom.com/channels/recommended',
        method: 'get'
    });

    const { body: channels } = data;

    return { props: { channels } };
}

export default index;
