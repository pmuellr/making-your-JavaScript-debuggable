#!/usr/bin/env NSOLID_HUB=4001 NSOLID_APPNAME=anon-broken node
'use strict'

const fs = require('fs')

setInterval(function() {
  fs.readdir('.', function(err, files){
    files.forEach(function(file) {
      fs.stat(file, function(err, stats){
        if (!stats.isFile()) return
        fs.readFile(file, 'utf8', function(err, data){
          console.log(file, data.length)
        })
      })
    })
  })
}, 10)
