import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Parser from 'rss-parser';

import styles from './App.scss';
import EpisodeList from './components/EpisodesList';
import SearchForm from './components/SearchForm';
import LoadingStatus from './components/LoadingStatus';
import ErrorAlert from './components/ErrorAlert';
import SearchHistory from './components/SearchHistory';
import FlexContainer from './common/FlexContainer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

function Dash() {
  const [fetched, setFetched] = useState<any | null>(null);
  const [onFetching, setFetching] = useState(false);
  const [previousFeeds, setPreviousFeeds] = useState<any[]>([]);
  const [error, setError] = useState(false);

  const getFeed = async (event: any): Promise<void> => {
    setFetching((prevFetching) => !prevFetching);
    if (event.preventDefault != null) event.preventDefault();
    const feedUrl = event.target.elements.feed_url.value;
    const parser = new Parser();

    if (feedUrl) {
      try {
        const feed = await parser.parseURL(feedUrl);
        setFetched({
          episodes: feed.items,
          title: feed.title,
          image: feed.image?.url,
          description: feed.description,
        });
        setFetching((prev) => !prev);
        setPreviousFeeds([...new Set([...previousFeeds, feedUrl])]);

        setError(false);
      } catch (e) {
        setFetching(false);
        setError(true);
      }
    }
  };

  const theme = createMuiTheme({
    palette: {
      primary: { main: '#234523' },
      secondary: { main: '#232556' },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>
        <div className={styles.AppWrapper}>
          <FlexContainer flex={1} style={{ width: '100%' }}>
            <div className="">
              <FlexContainer alignItems="center" justifyContent="space-between">
                <h1>FeedyRSS</h1>
                {previousFeeds.length > 0 && (
                  <SearchHistory
                    getFeed={getFeed}
                    history={[...previousFeeds]}
                  />
                )}
              </FlexContainer>
              <div style={{ width: '100%' }}>
                <SearchForm getFeed={getFeed} />
              </div>
            </div>
          </FlexContainer>

          {error && (
            <ErrorAlert
              error={error}
              setError={setError}
              setFetching={setFetching}
            />
          )}

          {onFetching && <LoadingStatus />}

          {fetched && (
            <EpisodeList
              episodes={fetched.episodes}
              title={fetched.title}
              description={fetched.description}
              image={fetched.image}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Dash} />
      </Switch>
    </Router>
  );
}
