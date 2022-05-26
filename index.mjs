#!/usr/bin/env node
import { request } from 'https';
import { webcrypto } from 'crypto';

const meetingId = Buffer.from(
  String.fromCharCode(...webcrypto.getRandomValues(new Uint8Array(32))),
  'binary'
)
  .toString('base64')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=/g, '');

const meetingUrl = `https://talk.brave.com/${meetingId}`;
const { hostname, pathname } = new URL(meetingUrl);

const req = request(
  {
    hostname,
    port: 443,
    path: `${pathname}?create_only=y`,
    method: 'GET'
  },
  (res) => {
    res.on('data', (d) => {
      console.log(meetingUrl);
    });
  }
);

req.on('error', (error) => {
  console.error(error);
});

req.end();
