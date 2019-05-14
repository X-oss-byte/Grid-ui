import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Identicon } from 'ethereum-react-components'
import RequestInfo from './RequestInfo'
import RequestActions from './RequestActions'

const styles = () => ({})

class ApproveListing extends Component {
  static propTypes = {
    request: PropTypes.object,
    send: PropTypes.func
  }

  constructor(props) {
    super(props)
    const { request } = this.props
    const { accounts } = request.params[0]
    accounts.forEach(account => {
      account.checked = true // eslint-disable-line
    })
    this.state = {
      accounts
    }
  }

  handleChange = account => event => {
    const { accounts: oldAccounts } = this.state
    const accounts = [...oldAccounts]
    accounts.find(a => a.address === account.address).checked =
      event.target.checked
    this.setState({ accounts })
  }

  approve() {
    const { request, send } = this.props
    const { accounts } = this.state
    const { id } = request
    const enabledAccounts = []
    accounts.forEach(account => {
      if (account.checked) {
        // Remove `checked` property
        const clone = Object.assign({}, account)
        delete clone.checked
        enabledAccounts.push(clone)
      }
    })
    const result = { accounts: enabledAccounts }
    send(null, [], id, result)
  }

  reject() {
    const { request, send } = this.props
    const { id } = request
    const result = { accounts: [] }
    send(null, [], id, result)
  }

  renderAccounts() {
    const { accounts } = this.state
    const renderAccounts = []
    accounts.forEach(account => {
      const thisRender = (
        <FormControlLabel
          key={account.address}
          control={
            <Checkbox
              color="primary"
              checked={account.checked}
              onChange={this.handleChange(account)}
              value={account.address}
            />
          }
          label=<div>
            <Identicon address={account.address} /> {account.address}
          </div>
        />
      )
      renderAccounts.push(thisRender)
    })
    return <FormGroup>{renderAccounts}</FormGroup>
  }

  render() {
    const { request } = this.props
    return (
      <div>
        <Typography variant="h2">Approve Account Listing</Typography>
        <RequestInfo request={request} />
        {this.renderAccounts()}
        <RequestActions
          approve={() => this.approve()}
          reject={() => this.reject()}
        />
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

export default connect(mapStateToProps)(withStyles(styles)(ApproveListing))