import React, { ChangeEvent, useState } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FlexContainer from '../../common/FlexContainer';

type Props = {
  getFeed: any;
};

const SearchForm = (props: Props) => {
  const { getFeed } = props;
  const [disabled, setDisabled] = useState(true);
  const [feeds, setFeeds] = useState<any[]>([]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    if (value === '') return setDisabled(true);

    setDisabled(false);
    setFeeds([...feeds, value]);
  };

  return (
    <form style={{ marginBottom: '1rem', flex: 2 }} onSubmit={getFeed}>
      <FlexContainer justifyContent="center">
        <Input
          placeholder="Enter your RSS Feed here..."
          type="text"
          name="feed_url"
          onChange={handleSearchChange}
          style={{
            padding: '0.5rem 0',
            color: 'white',
          }}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={disabled}
          style={{ margin: '20px 0', width: '150px' }}
        >
          Feed me
        </Button>
      </FlexContainer>
    </form>
  );
};

export default SearchForm;
