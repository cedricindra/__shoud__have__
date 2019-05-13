require('dotenv').config()

const play = require('play')
const ding = () => {
	play.sound('./sounds/ding.wav', () => {
		if (err) throw err
		else console.log('sound played')
	})
}

const opn = require('opn')
const Snoowrap = require('snoowrap')
const Snoostorm = require('snoostorm')


// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
	userAgent: 'reddit-bot-should-of-to-should-have',
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	username: process.env.REDDIT_USER,
	password: process.env.REDDIT_PASS
})

const client = new Snoostorm(r)

// Configure options for stream: subreddit & results per query
const streamOpts = {
	subreddit: 'all',
	results: 20,
}

let replyTo = [],
	commentObj = {},
	timetoopen = 15 //seconds


// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts)

// On comment, perform whatever logic you want to do
comments.on('comment', (comment, err) => {
	if (err) throw err
	else {
		let
			body = comment.body,
			author = comment.author.name,
			subreddit = comment.subreddit_name_prefixed,
			commentlink = 'www.reddit.com' + comment.permalink

		let reply,
			display

		if (body.toLowerCase().includes(' should of ') && !body.toLowerCase().includes('should of course')) {

			console.log(author)
			console.log(commentlink)
			console.log(body)

			//reply online
			setTimeout(() => {
				reply = `Hi u/${author}, "should of" is actually spelled "should have" or "should've".

I am a bot, hate me.`

				comment.reply(reply)
			}, 0)

			ding() // play sound
			setTimeout(() => opn('https://' + commentlink), timetoopen * 1000) // open browser



			// commentObj = {
			// 	comment: comment,
			// 	author: author,
			// 	commentlink: commentlink,
			// 	body: body
			// }

			// replyTo.push(commentObj)

		}

		if (body.toLowerCase().includes('cms') && body.toLowerCase().includes('content management system')) {
			console.log('CMS !!!!')
			console.log(author)
			console.log(commentlink)
			console.log(body)
			ding()
		}

	}

})

console.log('\nReddit should of bot running\n')
let count = 1
setInterval(() => {
	console.log('running : ' + count++ + ' minutes')
}, 60000)