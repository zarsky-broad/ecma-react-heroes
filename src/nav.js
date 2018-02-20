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

let allPathHandlers = {}

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

  return _.filter(
    _.map(checkingRedirects ?
      allRedirects :
      _.pairs(allPathHandlers),
      function (x) {
        const { k, handler } = checkingRedirects ?
          [null, x] :
          x
        if (handler.regex.test(cleaned)) {
          handler.key = k
          handler.makeProps = () => handler.makeProps.apply(_.rest(cleaned.match(handler.regex)))
          return handler
        }
      }),
    (x) => (x !== false))
}

const findPathHandler = function (windowHash) {
  const matchingHandlers = findMatches(windowHash, false)
  console.assert(matchingHandlers.length <= 1, `Multiple handlers matched path: ${_.map(matchingHandlers, (x) => x.key)}`)
  return _.first(matchingHandlers)
}

const getPath = function (k, ...args) {
  const handler = allPathHandlers[k]
  console.assert(handler, `No handler found for key ${k}. Valid path keys are: ${_.allKeys(allPathHandlers)}`)
  return encodeURI(handler.makePath.apply(args))
}

const getLink = function (k, ...args) {
  return `#${getPath.apply([k].concat(args))}`
}

const goToPath = function (k, ...args) {
  window.location.hash = getPath.apply([k].concat(args))
}
