import React from 'react';
import Error from './_error';
import axios from 'axios';

import '../styles/channel.scss';

import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import PodcastList from '../components/PodcastList';

const channel = (props) => {
    const { channel, channelAudios, childChannels, status } = props;

    if (status !== 200) {
        return <Error statusCode={status} />;
    }

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

export async function getServerSideProps({ query, res }) {
    const { id: channelId } = query;

    try {
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

        return {
            props: { channel, channelAudios, childChannels, status: 200 }
        };
    } catch (error) {
        const { response } = error;

        if (response) {
            if (response.status >= 400) {
                res.statusCode = response.status;
                return {
                    props: {
                        channel: null,
                        channelAudios: null,
                        childChannels: null,
                        status: response.status
                    }
                };
            }
        }

        res.statusCode = 503;
        return {
            props: {
                channel: null,
                channelAudios: null,
                childChannels: null,
                status: 503
            }
        };
    }
}

export default channel;
