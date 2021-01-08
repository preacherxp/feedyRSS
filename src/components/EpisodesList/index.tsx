import { Input } from '@material-ui/core';
import React, { ChangeEvent, ReactElement, useMemo, useState } from 'react';
import { IEpisode } from '../../types';
import Episode from '../Episode';
import styles from './EpisodesList.module.scss';

type Props = {
  title: string;
  description: string;
  image: string;
  episodes: IEpisode[];
  setLink: any;
};

function EpisodeList(props: Props): ReactElement {
  const { title, description, image, episodes, setLink } = props;

  const [keyWord, setKeyWord] = useState('');
  const [open, setOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filteredEpisodes = useMemo(() => {
    return keyWord.length
      ? episodes.filter((episode) => {
          return episode.title.toLowerCase().includes(keyWord.toLowerCase());
        })
      : episodes;
  }, [keyWord, episodes]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyWord(value);
  };

  const handleSetOpen = (state: boolean, idx: number) => {
    setOpen(state);
    setOpenIdx(idx);
  };

  return (
    <div className={styles.episodesListWrapper}>
      <div className={styles.podcastInfo}>
        <img src={image} className={styles.podcastImage} alt={title} />

        <div className={styles.podcastTitle}>
          <h2 className="">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="">
        <Input
          placeholder="Search for keywords..."
          type="text"
          onChange={handleSearchChange}
          style={{
            padding: '0.5rem 0',
            margin: '1rem 0',
            color: 'white',
          }}
          fullWidth
        />
      </div>
      <div className={styles.episodesList}>
        {filteredEpisodes.map((episode, idx) => (
          <Episode
            open={openIdx === idx && open}
            setOpen={(state: any) => handleSetOpen(state, idx)}
            key={idx}
            title={episode.title}
            link={episode.enclosure ? episode.enclosure.url : episode.link}
            description={episode.contentSnippet}
            media={!!episode.enclosure}
            setLink={setLink}
          />
        ))}
      </div>
    </div>
  );
}

export default EpisodeList;
