import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import NodesTab from './Nodes'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  fullWidth: {
    width: '100%'
  }
})

const TabContainer = withStyles(styles)(props => {
  const { children, classes, style } = props
  return (
    <main className={classes.content} style={style}>
      <Typography component="div">{children}</Typography>
    </main>
  )
})

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object,
  style: PropTypes.object
}

class NavTabs extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  }

  state = {
    activeTab: 0
  }

  handleTabChange = (event, activeTab) => {
    this.setState({ activeTab })
  }

  render() {
    const { classes } = this.props
    const { activeTab } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Tabs
            value={activeTab}
            onChange={this.handleTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Nodes" />
            <Tab label="Network" disabled />
            <Tab label="Transactions" disabled />
            <Tab label="Tools" disabled />
          </Tabs>
        </AppBar>

        <Typography
          component="div"
          classes={{ root: classes.fullWidth }}
          style={{
            display: activeTab === 0 ? 'inherit' : 'none'
          }}
        >
          <NodesTab />
        </Typography>

        <TabContainer style={{ display: activeTab === 1 ? 'block' : 'none' }}>
          <Typography component="h6">Network</Typography>
        </TabContainer>

        <TabContainer style={{ display: activeTab === 2 ? 'block' : 'none' }}>
          <Typography component="h6">Transactions</Typography>
        </TabContainer>

        <TabContainer style={{ display: activeTab === 3 ? 'block' : 'none' }}>
          <Typography component="h6">Tools</Typography>
        </TabContainer>
      </div>
    )
  }
}

export default withStyles(styles)(NavTabs)