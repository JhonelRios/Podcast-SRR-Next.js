import React from 'react';
import Link from 'next/link';

import '../styles/components/PodcastList.scss';

const PodcastList = (props) => {
    const { channelAudios } = props;

    return (
        <>
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
        </>
    )
}

export default PodcastList;