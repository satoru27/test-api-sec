import express from 'express'
import fs from 'fs'
import http from 'http'
import https from 'https'
//import path from 'path';
//import { fileURLToPath } from 'url';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//const fs = require('fs');
//const http = require('http');
//const https = require('https');

const app = express()
const PORT = 443 

//app.use(express.static(__dirname, { dotfiles: 'allow' } ));

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/pentest.offsecsidi.cf/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/pentest.offsecsidi.cf/fullchain.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/pentest.offsecsidi.cf/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

//app.listen(80, () => {
//  console.log('HTTP server running on port 80');
//});

//app.listen(PORT, () => console.log('API running on port ' + PORT))

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

app.get('/', (req,res) => res.json('My API is running :O'))

app.get('/v2/license/security/authorizeToken', (req,res,next) => {

	console.log(req)

	let data = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><AuthorizeTokenResultVO><authenticateUserID>kfzd5kaklc</authenticateUserID><authorizeCode>LIC_2101</authorizeCode><authorizeDesc>SUCCESS</authorizeDesc><remainExpireTimeSec>65048</remainExpireTimeSec></AuthorizeTokenResultVO>'

	res.removeHeader('X-Powered-By');
    res.removeHeader('ETag');
    res.removeHeader('Keep-Alive');
    res.removeHeader('ETag');

    res.header("Content-Type", "text/xml")
    res.header("X-RateLimit-Remaining", "100000")
    res.header("X-RateLimit-Remaining-Quota", "300000000")
    res.header("X-RateLimit-Quota", "300000000")
    res.header("X-RateLimit-Reset", "300000")
    res.header("X-RateLimit-Limit", "100000")

	res.status(200).send(data)

	console.log('Answering with token confirmation...')
})