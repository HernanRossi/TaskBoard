import React, { useState } from 'react';
import { useStyles } from "../styles/material-ui-styles"
import { CssBaseline, AppBar, Toolbar, Drawer, Divider, List, ListItem, ListItemText, ListItemIcon, TextField, createMuiTheme, MuiThemeProvider} from "@material-ui/core"
import AmpStoriesIcon from '@material-ui/icons/AmpStories'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import InfoIcon from '@material-ui/icons/Info'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import { useAppState } from '../context/AppStateContext'
import { DrawerFooter } from '../styles/styles'
import { CustomizedDialogs } from './AboutDialog'

type IconMapping = {
  scrum_board: JSX.Element
  about: JSX.Element
  contact: JSX.Element
  github: JSX.Element
  linkedin: JSX.Element
}
type ColorMapping = {
  scrum_board: string
  about: string
  contact: string
  github: string
  linkedin: string
}

const colorMapping = {
  scrum_board: '#000000',
  about: '#271900',
  contact: '#df691a',
  github: '#000000',
  linkedin: '#0072b1',
}
type UrlMapping = {
  github: string
  linkedin: string
}

const urlMapping = {
  github: 'https://github.com/HernanRossi/IssueBoard',
  linkedin: 'https://www.linkedin.com/in/hernanfrossi/',
  contact: 'https://www.hernan-rossi.com/',
}

const iconMapping: IconMapping = {
  scrum_board: <AmpStoriesIcon />,
  about: <InfoIcon />,
  contact: <QuestionAnswerIcon />,
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
}

type SectionLabels = {
  scrum_board: string
  about: string
  contact: string
  github: string
  linkedin: string
}

const sectionLabels: SectionLabels = {
  scrum_board: 'Scrum Board',
  about: 'About',
  contact: 'Contact',
  github: 'GitHub',
  linkedin: 'LinkedIn'
}

// const styles = {
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center'
//   },
// 

const theme = createMuiTheme({
  palette: {
    primary: { main: '#df691a' },
    secondary: { main: '#ffffff' },
  },
  overrides: {
    MuiInput: {
      root: {
        color: '#ffffff'
      },
      underline: {
        '&:before': { // underline color when textfield is inactive
          borderBottomColor: '#df691a',
          backgroundColor: '#df691a',
          height: '1px',
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid #ffffff`,
        },
        '&:hover:not($disabled):after': { // underline color when hovered
          borderBottomColor: '#ffffff',
          backgroundColor: '#ffffff',
          height: '1px',
        },
        '&:after': {
          borderBottomColor: '#df691a',
          backgroundColor: '#df691a',
          height: '1px',
        },
      },

    },
  }
})

export const PermanentDrawerLeft = ({ children }: React.PropsWithChildren<{}>) => {
  const classes = useStyles();
  const { state, dispatch } = useAppState()
  const [text, setText] = useState("")

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getCustomListItem(label: string): JSX.Element {
    const color = colorMapping[label as keyof ColorMapping]
    const icon = iconMapping[label as keyof IconMapping]
    const sectionLabel = sectionLabels[label as keyof SectionLabels]
    const itemUrl = urlMapping[label as keyof UrlMapping] || null
    let attributes = {}
    if (label === 'about') {
      attributes = { onClick: () => handleClickOpen() }
    } else {
      attributes = itemUrl ? { component: 'a', href: itemUrl, target: '_blank' } : {}
    }
    return (
      <ListItem button {...attributes} key={label} >
        <ListItemIcon style={{ color, marginRight: '-20px' }} >{icon}</ListItemIcon>
        <ListItemText style={{ color }} primary={sectionLabel} />
      </ListItem>
    )
  }

  const updateDesc = (text: string) => {
    setText(text)
    dispatch({ type: "UPDATE_BOARD", payload: { title: text } })
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <MuiThemeProvider theme={theme}>
            <TextField
              id="new-item"
              autoComplete='off'
              type='text'
              size="medium"
              value={state.board.title}
              onChange={e => updateDesc(e.target.value)}
              placeholder={'Add Board Title'}
              InputProps={{ style: { fontSize: 20, textAlign: 'center', marginLeft: '200px', } }}
            />
          </MuiThemeProvider>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <CustomizedDialogs handleClose={handleClose} open={open} />

        <Divider />
        <List>
          {['scrum_board'].map((label: string, index) => (<div key={index}>{getCustomListItem(label)} </div>))}
        </List>
        <Divider />
        <List>
          {['about', 'contact', 'github', 'linkedin'].map((label: string, index) => (<div key={index}>{getCustomListItem(label)} </div>))}
        </List>
        <DrawerFooter >
          Created with love by HernanRossi
      </DrawerFooter>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}

      </main>

    </div>
  )
}
