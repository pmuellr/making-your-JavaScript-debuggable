#!/usr/bin/env NSOLID_HUB=4001 NSOLID_APPNAME=tagging-fixed node
'use strict'

const http = require('http')
const port = process.env.PORT || '8080'

const server = http.createServer(handleRequest)

server.listen(port, listening)

function listening () {
  console.log(`server listening on http://localhost:${port}/`)
  console.log(`try running "ab -n 100 -c 10 http://localhost:${port}/"`)
}

function handleRequest (req, res) {
  req.__tag = new TagRequest()
  res.__tag = new TagResponse()

  reqMap.set(req, true)
  res.end('not doing nuthin')
}

const reqMap = new Map()

class TagRequest {}
class TagResponse {}
