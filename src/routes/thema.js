const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

newsRouter.get('', async (req, res) => {
    res.render('index', {
        articles: null
    })
})


newsRouter.get('/home', async (req, res) => {
    try {
        const newsAPI = await axios.get(`http://173.255.119.18:4000/fronts/brands/igreen/brandType/eyeglasses`)
        console.log("data.............." + newsAPI.data.Data[0].SAP_model_code)

        if (newsAPI.data.Success == 1) {
            res.render('home', {
                articles: newsAPI.data.Data
            })
            console.log(newsAPI.Data)
        } else {
            //res.render('home', { articles: null })
            // console.log(err.requiest)
        }

    } catch (err) {
        if (err.response) {
            res.render('home', {
                articles: null
            })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.request) {
            res.render('home', {
                articles: null
            })
            console.log(err.requiest)
        } else {
            res.render('home', {
                articles: null
            })
            console.error('Error', err.message)
        }
    }
    // res.render('home', { articles: null })

})

newsRouter.get('/o-six', async (req, res) => {
    // try {
    //     const newsAPI = await axios.get(`http://localhost:4000/users/get`)
    //     res.render('home', { articles: newsAPI.data.data})
    //     console.log(newsAPI.data.data)
    // } catch (err) {
    //     if (err.response) {
    //         res.render('home', { articles: null })
    //         console.log(err.response.data)
    //         console.log(err.response.status)
    //         console.log(err.response.headers)
    //     } else if (err.request) {
    //         res.render('home', { articles: null })
    //         console.log(err.requiest)
    //     } else {
    //         res.render('home', { articles: null })
    //         console.error('Error', err.message)
    //     }
    // }
    res.render('o-six', {
        articles: null
    })
})

newsRouter.get('/giorgio', async (req, res) => {
    // try {
    //     const newsAPI = await axios.get(`http://localhost:4000/users/get`)
    //     res.render('home', { articles: newsAPI.data.data})
    //     console.log(newsAPI.data.data)
    // } catch (err) {
    //     if (err.response) {
    //         res.render('home', { articles: null })
    //         console.log(err.response.data)
    //         console.log(err.response.status)
    //         console.log(err.response.headers)
    //     } else if (err.request) {
    //         res.render('home', { articles: null })
    //         console.log(err.requiest)
    //     } else {
    //         res.render('home', { articles: null })
    //         console.error('Error', err.message)
    //     }
    // }
    res.render('giorgio', {
        articles: null
    })
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