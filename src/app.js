const path =require('path')
const express=require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

const app= express() //The app returned by express() is in fact a JavaScript Function, designed to be passed to
                     // Node’s HTTP servers as a callback to handle requests
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))

//define the path for express config
const PublicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views') // customize the path of default location (which was views folder)
const partialsPath = path.join(__dirname,'../templates/partials')

// set up handllebars engine and views location
app.set('view engine', 'hbs')//for 'view engine' use 'hbs' templete engine  live in spacific folder, in this project it is views(current its name templates )

app.set('views',viewPath)//the directory where the template files are located. Eg: app.set('views', './views'). 
hbs.registerPartials(partialsPath)
//set up static directory to server
 app.use(express.static(PublicDirectoryPath))//static content for the app from the “public” directory in the application directory

app.get('',(req,res)=>{
    // res.send('hellow express!')
    res.render('index',{ // render ('route of particular view no need to write file extension','pass value like as object in this route of view  ')
     // default location that express expects is views to live in  
    title: 'weather App',
    name:'Abu Sayeed'
    })
}
)//When you make a request to the home page, the index.hbs file will be rendered as HTML.

app.get('/help',(req,res)=>{
    // res.send('Help page')
    res.render('help',{
        title: 'help',
        info: 'For basic learning, you have to go through other things also',
        name:'Abu Sayeed'
    })
})
// app.get('/help',(req,res)=>{
//     res.send('Help page')
// })
//app.com
//app.com/help
//app.com/about
// app.get('/about',(req,res)=>{
//     res.send('About our page')
// })
app.get('/about',(req,res)=>{
    // res.send('<h1>About our page</h1>')
    res.render('about',{    // Hbs file er name likhte hy jeta access korte chai
        title:'About Us',
        myself:' i am Abu sayeed and i am learning NodeJs',
        name:'Abu Sayeed'
    })
})
// app.get('/weather',(req,res)=>{
//     res.send('View we page')
// })
app.get('/weather',(req,res)=>{
  
    if(!req.query.address){
       return  res.send({ // return use korle command line e error message dekhae na cz eta return e theme jay
        error: 'You must provide address term!'
    })
}
geocode(req.query.address,(error,{latitude, longitude, location}={})=>{

 if (error){
    return res.send({error})
    }
               forecast(latitude,longitude,(error,forecastData)=>{
                   if(error){
                     return res.send({error})
                     }
                    console.log(req.query.address)
                    res.send({forecast:forecastData,
                             location,
                             address: req.query.address
                   })  
                })

           })

 

})
app.get('/products',(req,res)=>{
     if(!req.query.search){
       return  res.send({ // return use korle command line e error message dekhae na cz eta return e theme jay
             error: 'You must provide search term!'
         })
     }
    // console.log(req.query)
    console.log(req.query.search) 
    res.send({  // ekhane res.send 2 ta ase ei jnne comand line e error hoy.cz requst & response 1 bar e kora jay 
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    // res.send('Help article not found!!!')
    res.render('404',{
        title: '404',
        name: 'Abu Sayeed',
        errorMessage:'Help article not found!'
    })
})

app.get('*',(req,res)=>{
    // res.send(' My 404 Page!!!')
    res.render('404',{
        title: '404',
        name: 'Abu Sayeed',
        errorMessage:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000!')
})
