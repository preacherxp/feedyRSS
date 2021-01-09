import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';

type Props = {
  history: string[];
  getFeed: any;
};

export default function SearchHistory(props: Props) {
  const { history, getFeed } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    if (event.currentTarget.innerText !== '')
      getFeed({
        target: {
          elements: { feed_url: { value: event.currentTarget.innerText } },
        },
      });
    setAnchorEl(null);
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <Button
        variant="contained"
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="secondary"
        onClick={handleClick}
      >
        History
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {history &&
          history.map((historyElement: any, idx) => {
            return (
              <MenuItem key={idx} onClick={handleClose}>
                {historyElement}
              </MenuItem>
            );
          })}
      </Menu>
    </div>
  );
}
