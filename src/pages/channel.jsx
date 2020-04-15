import React from 'react';
import Link from 'next/link';
import axios from 'axios';

import '../styles/channel.scss';

import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import PodcastList from '../components/PodcastList';

const channel = (props) => {
    const { channel, channelAudios, childChannels } = props;

    return (
        <Layout title={channel.title}>
            <div
                className="banner"
                style={{
                    backgroundImage: `url(${channel.urls.banner_image.original})`
                }}
            />

            <h1>{channel.title}</h1>

            <h2>Últimos Podcast</h2>
            <PodcastList channelAudios={channelAudios} />

            {childChannels.length > 0 && (
                <div>
                    <h2>Series</h2>
                    <ChannelGrid channels={childChannels} />
                </div>
            )}
        </Layout>
    );
};

export async function getServerSideProps({ query }) {
    const { id: channelId } = query;

    const [
        { data: channelData },
        { data: audioData },
        { data: childChannelsData }
    ] = await Promise.all([
        axios({
            url: `https://api.audioboom.com/channels/${channelId}`,
            method: 'get'
        }),
        axios({
            url: `https://api.audioboom.com/channels/${channelId}/audio_clips`,
            method: 'get'
        }),
        axios({
            url: `https://api.audioboom.com/channels/${channelId}/child_channels`,
            method: 'get'
        })
    ]);

    const {
        body: { channel }
    } = channelData;
    const {
        body: { audio_clips: channelAudios }
    } = audioData;
    const {
        body: { channels: childChannels }
    } = childChannelsData;

    return { props: { channel, channelAudios, childChannels } };
}

export default channel;
