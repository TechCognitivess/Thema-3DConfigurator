const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

newsRouter.get('', async (req, res) => {
    try {
        const newsAPI = await axios.get(`http://localhost:4000/users/get`)
        res.render('home', { articles: newsAPI.data.data})
        console.log(newsAPI.data.data)
    } catch (err) {
        if (err.response) {
            res.render('home', { articles: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.request) {
            res.render('home', { articles: null })
            console.log(err.requiest)
        } else {
            res.render('home', { articles: null })
            console.error('Error', err.message)
        }
    }
    //res.render('home', { articles: null })
})

// newsRouter.get('/:id', async (req, res) => {
//     let articleID = req.params.id

//     try {
//         const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts/${articleID}`)
//         res.render('newsSingle', { article: newsAPI.data })
//     } catch (err) {
//         if (err.response) {
//             res.render('newsSingle', { article: null })
//             console.log(err.response.data)
//             console.log(err.response.status)
//             console.log(err.response.headers)
//         } else if (err.requiest) {
//             res.render('newsSingle', { article: null })
//             console.log(err.requiest)
//         } else {
//             res.render('newsSingle', { article: null })
//             console.error('Error', err.message)
//         }
//     }
// })


// newsRouter.post('', async (req, res) => {
//     let search = req.body.search
//     try {
//         const newsAPI = await axios.get(`https://raddy.dev/wp-json/wp/v2/posts?search=${search}`)
//         res.render('newsSearch', { articles: newsAPI.data })
//     } catch (err) {
//         if (err.response) {
//             res.render('newsSearch', { articles: null })
//             console.log(err.response.data)
//             console.log(err.response.status)
//             console.log(err.response.headers)
//         } else if (err.requiest) {
//             res.render('newsSearch', { articles: null })
//             console.log(err.requiest)
//         } else {
//             res.render('newsSearch', { articles: null })
//             console.error('Error', err.message)
//         }
//     }
// })


module.exports = newsRouter 