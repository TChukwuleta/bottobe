const config = require('./config')
const twit = require('twit')
 
const T = new twit(config)

const params = {
    q: '#tuesdayvibe',
    result_type: 'recent',
    count: 3
}

function retweet () {
    searchTweet(params)
}
setInterval(retweet, 4000)

function searchTweet(params) {
    T.get('search/tweets', params, (err, data, response) => {
        const tweets = data.statuses
        if (!err) {
            let tweetIDList = []
            for(let tweet of tweets){
                tweetIDList.push(tweet.id_str)
                //Check for duplicates
                postTweets(tweetIDList)
            }
        }
    })
}

function postTweets(tweetIDList){
    for(let tweetID of tweetIDList){
        T.post('statuses/retweet/:id', {id: tweetID}, (err, response) => {
            if (response){
                console.log('Retweeted successfully')
            }
            if (err) {
                console.log('Error occured... Mybe duplicates')
            }
        })
    }
}