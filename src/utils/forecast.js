const request =require('request')


const forecast =(x,y, callback)=>{
    const url= 'https://api.openweathermap.org/data/2.5/onecall?lat='+x+'&lon='+y+'&units=imperial&appid=c2a48920ccf52baeb803e52f8429a27a'
    // request ({url:url,json:true}, (error, response)=> {
        request ({url,json:true}, (error, {body}={})=> { // destructuring & Shorthand property
        if(error){
            callback('Unable to connect the weather service!',undefined)
        // }else if(response.body.message){
        }else if(body.message){
                  callback('Unable to find location',undefined)
        }else{
        //  callback(undefined, response.body.current.weather[0].description+" It's current temperature is "+response.body.current.temp + " There is "+response.body.current.clouds+"% chance of cloud")
        callback(undefined, body.current.weather[0].description+" It's current temperature is "+body.current.temp + " There is "+body.current.clouds+"% chance of cloud")//destructuring
         }
    })
}
module.exports= forecast

 

