import React from 'react';
import Link from 'next/link';

import '../styles/components/ChannelGrid.scss'

const ChannelGrid = (props) => {
    const { channels } = props;

    return (
        <div className="channels">
            {channels.map((channel) => (
                <Link key={channel.id} href={`/channel?id=${channel.id}`}>
                    <a className="channel">
                        <img src={channel.urls.logo_image.original} alt="" />
                        <h2>{channel.title}</h2>
                    </a>
                </Link>
            ))}
        </div>
    );
};

export default ChannelGrid;
