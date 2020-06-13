import React from 'react'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import { Dialog, DialogTitle, Typography, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

type Styles = {
  root: any
  closeButton: any
}

const styles = (theme : any): Styles => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

type DialogProps = {
  onClose: () => void
  open: boolean
  classes: Styles
}

const AboutDialog =  withStyles(styles)((props: React.PropsWithChildren<{}> & DialogProps) => {
  const { onClose, open, classes, children} = props

  return (
    <Dialog className={classes.root} open={open} onClose={onClose}>
      {children}
    </Dialog>
  );
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

type CustomDialogProps = {
  open: boolean
  handleClose: () => void
}
export const CustomizedDialogs = (props: CustomDialogProps) => {
  const {handleClose, open} = props
  return (
      <AboutDialog aria-labelledby="customized-dialog-title" open={open}  onClose={handleClose}>
        <DialogTitle id="customized-dialog-title">
          About Task Board App
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            This app was created using React.js, TypeScript, Material-ui for styling and the amazing react-dnd for drag and drop functionality.
          </Typography>
          <Typography gutterBottom>
            This application was deployed using the Amazon Web Services Amplify service.
          </Typography>
          <Typography gutterBottom>
            If you like what I do and want to work together just toss me a line, you can find more information about me at hernan-rossi.com.
            Thank you for visiting <span role='img' aria-label='Smiley boy'>😄</span>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </AboutDialog>
  )
}