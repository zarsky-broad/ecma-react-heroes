import _ from 'underscore'
import { Component, Fragment } from 'react'
import { a, h, h1, nav } from 'react-hyperscript-helpers'
import * as Nav from '../nav'
import * as Style from '../style'

class Main extends Component {
  render() {
    const makeNavLink = function (props, label) {
      return Style.addHoverStyle(a,
        _.extend(
          {
            style: {
              display: 'inline-block',
              padding: '5px 10px', marginTop: 10, marginRight: 10,
              backgroundColor: '#eee', borderRadius: 4,
              textDecoration: 'none'
            },
            hoverStyle: {
              color: '#039be5', backgroundColor: Style.colors.lightBluish
            }
          },
          props),
        label)
    }
    return h(Fragment, [
      h1({ style: { fontSize: '1.2em', color: '#999', marginBottom: 0 } },
        this.props.title),
      nav({ style: { paddingTop: 10 } }, [
        makeNavLink({ href: '#dashboard' }, 'Dashboard'),
        makeNavLink({ href: '#list' }, 'Heroes')
      ]),
      Nav.HashRouter()])
  }
}

export default (props) => h(Main, props)
