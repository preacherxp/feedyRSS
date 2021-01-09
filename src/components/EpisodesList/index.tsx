import { Input } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import classNames from 'classnames';
import React, { ChangeEvent, ReactElement, useMemo, useState } from 'react';
import FlexContainer from '../../common/FlexContainer';
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
      <div
        className={classNames([
          styles.podcastInfo,
          open && styles.podcastInfoOpen,
        ])}
      >
        <img src={image} className={styles.podcastImage} alt={title} />

        <FlexContainer flexFlow="column" justifyContent="center">
          <div className={styles.podcastTitle}>
            <h2 className="">
              {open && openIdx ? episodes[openIdx].title : title}
            </h2>
            {!open && <p>{description}</p>}
          </div>
        </FlexContainer>
      </div>

      <div className={styles.episodesListSearchWrapper}>
        <Search />
        <Input
          placeholder="Search for keywords..."
          type="text"
          onChange={handleSearchChange}
          className={styles.episodesListSearch}
          fullWidth
          disableUnderline
        />
      </div>

      <div className={styles.episodesList}>
        {filteredEpisodes.map((episode, idx) => (
          <div
            key={idx}
            style={{
              display: (openIdx === idx && 'block') || (episode as any).display,
            }}
          >
            <Episode
              open={openIdx === idx && open}
              setOpen={(state: any) => handleSetOpen(state, idx)}
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
