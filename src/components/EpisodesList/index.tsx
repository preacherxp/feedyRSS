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
};

function EpisodeList(props: Props): ReactElement {
  const { title, description, image, episodes } = props;

  const [keyWord, setKeyWord] = useState('');
  const [open, setOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const [playing, setPlaying] = useState(false);

  const filteredEpisodes = useMemo(() => {
    return keyWord.length
      ? episodes.map((episode) => {
          return {
            ...episode,
            display: episode.title.toLowerCase().includes(keyWord.toLowerCase())
              ? 'block'
              : 'none',
          };
        })
      : episodes;
  }, [keyWord, episodes]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyWord(value);
  };

  const handleSetOpen = (state: boolean, idx: number) => {
    if (playing) {
      alert('Stop episode first!');
    } else {
      setOpen(state);
      setOpenIdx(idx);
    }
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
          className={styles.episodesListSearch}
          fullWidth
        />
      </div>
      <div className={styles.episodesList}>
        {filteredEpisodes.map((episode, idx) => (
          <div
            style={{
              display: (openIdx === idx && 'block') || (episode as any).display,
            }}
          >
            <Episode
              open={openIdx === idx && open}
              setOpen={(state: any) => handleSetOpen(state, idx)}
              key={idx}
              playing={playing}
              setPlaying={setPlaying}
              title={episode.title}
              link={episode.enclosure ? episode.enclosure.url : episode.link}
              description={episode.contentSnippet}
              media={!!episode.enclosure}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EpisodeList;
