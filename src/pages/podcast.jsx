import React from 'react';
import Link from 'next/link';
import axios from 'axios';

import '../styles/podcast.scss'

const podcast = (props) => {
    const { podcast } = props;

    return (
        <>
            <header>Podcast</header>

            <div className="modal">
                <div className="clip">
                    <nav>
                        <Link href={`/channel?id=${podcast.channel.id}`}>
                            <a className="close">&lt; Volver</a>
                        </Link>
                    </nav>

                    <picture>
                        <div
                            style={{
                                backgroundImage: `url(${
                                    podcast.urls.image ||
                                    podcast.channel.urls.logo_image.original
                                })`
                            }}
                        />
                    </picture>

                    <div className="player">
                        <h3>{podcast.title}</h3>
                        <h6>{podcast.channel.title}</h6>
                        <audio controls autoPlay={true}>
                            <source
                                src={podcast.urls.high_mp3}
                                type="audio/mpeg"
                            />
                        </audio>
                    </div>
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps({ query }) {
    const { id: podcastId } = query;

    const { data } = await axios({
        url: `https://api.audioboom.com/audio_clips/${podcastId}.mp3`,
        method: 'get'
    });

    const {
        body: { audio_clip: podcast }
    } = data;

    return { props: { podcast } };
}

export default podcast;
