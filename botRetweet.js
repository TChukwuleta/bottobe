const config = require('./config')
const twit = require('twit')

const T = new twit(config)

function retweet() {
    let params = {
        q: '#pemi',
        result_type: 'recent',
        count: 20
    }

    T.get('search/tweets', params, (err, data, response) => {
        let tweets = data.statuses
        console.log(tweets)
        if (!err) {
            for (let dat of tweets){
                let retweetID = dat.id_str
                T.post('statuses/retweet/:id', {id: retweetID}, (err, response) => {
                    if(response) {
                        console.log('Retweeted!!! ', retweetID)
                    }
                    if(err){
                        console.log('Something went wrong while retweeting.. DUplicate maybe')
                    }
                })
            }
        }
    })
}
setInterval(retweet,15000)