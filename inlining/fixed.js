#!/usr/bin/env NSOLID_HUB=4001 NSOLID_APPNAME=inlining-fixed node --nouse_inlining
'use strict'

setInterval(a, 100)

function a () { for (let i=0; i<5; i++) { b() } }
function b () { for (let i=0; i<5; i++) { c() } }
function c () { for (let i=0; i<5; i++) { d() } }
function d () { for (let i=0; i<5; i++) { e() } }
function e () { for (let i=0; i<5; i++) { f() } }

function f() {
  console.log('doing f stuff')
}
