import React from 'react';
import Error from './_error';
import axios from 'axios';

import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';

import '../styles/index.scss';

const index = (props) => {
    const { channels, status } = props;

    if (status !== 200) {
        return <Error statusCode={status} />
    }

    return (
        <Layout title="Podcast">
            <ChannelGrid channels={channels} />
        </Layout>
    );
};

export async function getServerSideProps({ res }) {
    try {
        const { data, status } = await axios({
            url: 'https://api.audioboom.com/channels/recommended',
            method: 'get'
        });
    
        const { body: channels } = data;
    
        return { props: { channels, status } };
    } catch (error) {
        res.statusCode = 503;
        return { props: { channels: null, status: 503 }}
    }
}

export default index;
