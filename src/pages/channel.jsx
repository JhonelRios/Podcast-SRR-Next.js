import React from 'react';
import Link from 'next/link';
import axios from 'axios';

import '../styles/channel.scss';

const channel = (props) => {
    const { channel, channelAudios, childChannels } = props;

    return (
        <>
            <header>Podcast</header>

            <div
                className="banner"
                style={{
                    backgroundImage: `url(${channel.urls.banner_image.original})`
                }}
            />

            <h1>{channel.title}</h1>

            <h2>Últimos Podcast</h2>
            {channelAudios.map((audio) => (
                <Link href={`/podcast?id=${audio.id}`} key={audio.id}>
                    <a className="podcast">
                        <h3>{audio.title}</h3>
                        <div className="meta">
                            {Math.ceil(audio.duration / 60)} minutes
                        </div>
                    </a>
                </Link>
            ))}

            {childChannels.length > 0 && (
                <div>
                    <h2>Series</h2>
                    <div className="channels">
                        {childChannels.map((childChannel) => (
                            <Link
                                key={childChannel.id}
                                href={`/channel?id=${childChannel.id}`}>
                                <a className="channel">
                                    <img
                                        src={
                                            childChannel.urls.logo_image
                                                .original
                                        }
                                        alt=""
                                    />
                                    <h2>{childChannel.title}</h2>
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
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
