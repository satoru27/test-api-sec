import express from 'express'

const app = express()
const PORT = 443 
app.listen(PORT, () => console.log('API running on port ' + PORT))

app.get('/', (req,res) => res.json('My API is running :O'))

app.get('/v2/license/security/authorizeToken', (req,res,next) => {
	let data = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><AuthorizeTokenResultVO><authenticateUserID>kfzd5kaklc</authenticateUserID><authorizeCode>LIC_2101</authorizeCode><authorizeDesc>SUCCESS</authorizeDesc><remainExpireTimeSec>65048</remainExpireTimeSec></AuthorizeTokenResultVO>'

	res.header("Content-Type", "application/xml")
	res.status(200).send(data)
})