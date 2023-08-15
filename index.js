import express from 'express'

const app = express()
const PORT = 443 
app.listen(PORT, () => console.log('API running on port ' + PORT))

app.get('/', (req,res) => res.json('My API is running :O'))

app.get('/v2/license/security/authorizeToken', (req,res,next) => {
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
})