import React from 'react';
import { useStyles } from "../styles/material-ui-styles"
import { CssBaseline, AppBar, Toolbar, Drawer, Typography, Divider, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core"
import AmpStoriesIcon from '@material-ui/icons/AmpStories'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

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
}

const iconMapping: IconMapping = {
  scrum_board: <AmpStoriesIcon />,
  about: <div />,
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
export const PermanentDrawerLeft = ({ children }: React.PropsWithChildren<{}>) => {
  const classes: any = useStyles();

  function getCustomListItem(label: string): JSX.Element {
    const color = colorMapping[label as keyof ColorMapping]
    const icon = iconMapping[label as keyof IconMapping]
    const sectionLabel = sectionLabels[label as keyof SectionLabels]
    const itemUrl = urlMapping[label as keyof UrlMapping] || null
    const attributes = itemUrl ? {component: 'a', href: itemUrl, target: '_blank'} : {}
    return (
      <ListItem button {...attributes} >
        <ListItemIcon style={{ color, marginRight: '-20px' }} >{icon}</ListItemIcon>
        <ListItemText style={{ color }} primary={sectionLabel} />
      </ListItem>
    )
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Hernan Francisco Rossi
          </Typography>
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
        <Divider />
        <List>
          {['scrum_board'].map((label: string, index) => (<div key={index}>{getCustomListItem(label)} </div>))}
        </List>
        <Divider />
        <List>
          {['about', 'contact', 'github', 'linkedin'].map((label: string, index) => (<div key={index}>{getCustomListItem(label)} </div>))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}


