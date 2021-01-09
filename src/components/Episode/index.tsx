/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Button, Collapse, makeStyles, Modal } from '@material-ui/core';
import styles from './Episode.module.scss';
import FlexContainer from '../../common/FlexContainer';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const { shell } = require('electron');

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 700,
    backgroundColor: 'rgb(71,71,71)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: 'auto',
    height: '500px',
    display: 'flex',
    justifyContent: 'center',
  },
}));

type Props = {
  link: string;
  title: string;
  description: string;
  media: boolean;
  open: boolean;
  setOpen: any;
  playing: any;
  setPlaying: any;
};

function Episode(props: Props) {
  const { link, title, description, media, setOpen, open, setPlaying } = props;
  const audioPlayerRef = useRef<any | null>(null);

  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.episodeWrapper}>
      <FlexContainer justifyContent="space-between">
        <h3 style={{ fontSize: '18px', marginRight: '2rem' }}>{title}</h3>

        <FlexContainer alignItems="center">
          {open ? (
            <ExpandLess
              fontSize={'large'}
              style={{ cursor: 'pointer' }}
              onClick={() => setOpen(false)}
            />
          ) : (
            <ExpandMore
              fontSize={'large'}
              style={{ cursor: 'pointer' }}
              onClick={() => setOpen(true)}
            />
          )}
        </FlexContainer>
      </FlexContainer>
      <Collapse in={open}>
        <FlexContainer flexFlow="column">
          {media && open && (
            <ReactAudioPlayer
              ref={audioPlayerRef}
              className={styles.audioPlayerActive}
              src={link}
              controls
              autoPlay={false}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
          )}
          {media ? (
            <FlexContainer justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={handleOpen}
              >
                Description
              </Button>

              <Modal disableEnforceFocus open={modalOpen} onClose={handleClose}>
                <div style={modalStyle} className={classes.paper}>
                  {description}
                </div>
              </Modal>
            </FlexContainer>
          ) : (
            <div className="">
              <p>{description}</p>

              <FlexContainer justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => shell.openExternal(link)}
                >
                  Read Article
                </Button>
              </FlexContainer>
            </div>
          )}
        </FlexContainer>
      </Collapse>
    </div>
  );
}

export default Episode;
