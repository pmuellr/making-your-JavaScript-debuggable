#!/usr/bin/env NSOLID_HUB=4001 NSOLID_APPNAME=anon-fixed node
'use strict'

const fs = require('fs')

setInterval(onInterval, 10)

function onInterval () {
  fs.readdir('.', readDir)
}

function readDir (err, files) {
  files.forEach(eachFile)
}

function eachFile (file) {
  fs.stat(file, gotStats)

  function gotStats (err, stats) {
    if (!stats.isFile()) return
    fs.readFile(file, 'utf8', readFile)
  }

  function readFile (err, data){
    console.log(file, data.length)
  }
}
