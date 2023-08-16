import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = 443 

app.use(express.static(__dirname, { dotfiles: 'allow' } ));

app.listen(80, () => {
  console.log('HTTP server running on port 80');
});

app.listen(PORT, () => console.log('API running on port ' + PORT))

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