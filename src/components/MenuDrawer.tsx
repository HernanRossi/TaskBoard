import React from 'react';
import { useStyles } from "../styles/material-ui-styles"
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline, AppBar, Toolbar, Drawer, Typography, Divider, List, ListItem, ListItemText, ListItemIcon, SvgIconTypeMap, SvgIcon } from "@material-ui/core"
import AmpStoriesIcon from '@material-ui/icons/AmpStories'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import InfoIcon from '@material-ui/icons/Info'

type IconMapping = {
  scrum_board: JSX.Element
  about: JSX.Element
  contact: JSX.Element
  github: JSX.Element
  linkedin: JSX.Element
}

const iconMapping: IconMapping = {
  scrum_board: <AmpStoriesIcon/>,
  about: <InfoIcon/>,
  contact: <QuestionAnswerIcon/>,
  github: <GitHubIcon/>,
  linkedin: <LinkedInIcon/>,
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
          {['scrum_board'].map((label, index) => (
            <ListItem button key={label}>
              <ListItemIcon>{iconMapping[label as keyof IconMapping]}</ListItemIcon>
              <ListItemText primary={sectionLabels[label as keyof SectionLabels]} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['about', 'contact', 'github', 'linkedin'].map((label, index) => (
            <ListItem button key={label}>
               <ListItemIcon>{iconMapping[label as keyof IconMapping]}</ListItemIcon>
              <ListItemText primary={sectionLabels[label as keyof SectionLabels]} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}


