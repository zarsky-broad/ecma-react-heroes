import _ from 'underscore'
import {
  HashRouter as rrHashRouter,
  Link as rrLink,
  Redirect as rrRedirect,
  Route as rrRoute,
} from 'react-router-dom'
import { Fragment } from 'react'
import { h } from 'react-hyperscript-helpers'

const routes = []

const addNavRoute = function (props) {
  routes.push(h(rrRoute, props))
}

const Link = (props, children) => h(rrLink, props, children)

const HashRouter = function (children) {
  return h(rrHashRouter, {}, h(Fragment, [routes, children]))
}

const Redirect = (props) => h(rrRedirect, props)


export { addNavRoute, HashRouter, Link, Redirect }

let allPathHandlers = []

const defPath = function (k, handler) {
  console.assert(_.has(handler, 'regex'))
  console.assert(_.has(handler, 'component'))
  console.assert(_.has(handler, 'makeProps'))
  console.assert(_.has(handler, 'makePath'))

  console.assert(!_.has(allPathHandlers, k), `Key ${k} is already defined`)

  allPathHandlers[k] = handler
}

let allRedirects = []

const defRedirect = function (handler) {
  console.assert(_.has(handler, 'regex'))
  console.assert(_.has(handler, 'makePath'))

  allRedirects.push(handler)
}

const clearPaths = function () {
  allPathHandlers = {}
  allRedirects = []
}

const findMatches = function (windowHash, checkingRedirects) {
  const workingHash = windowHash || ''
  const cleaned = decodeURI(workingHash.substring(1))

  _.filter(
    _.map(checkingRedirects ?
      allRedirects :
      allPathHandlers,
      function (value) {

      })
    , _.isObject)
}
