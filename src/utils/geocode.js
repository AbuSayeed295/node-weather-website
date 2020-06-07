const request = require('request')

const geocode=(address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYWJ1LXNheWVlZDIzMSIsImEiOiJja2FxazR1bncwYnJiMnBwbGN5YjRybHAyIn0.IhRNPJLLj76XcgZ5pjSJEA&limit=1' 
// request({url: url , json:true},(error,response)=>{
    request({url,json:true},(error,{body}={})=>{// destructuring & shorthand property 
    if(error){
        callback('Unable to connect the weather service!', undefined)
    }
    //else if(response.body.features.length ===0) {
    else if(body.features.length ===0) { //destructuring
        callback('Unable to find location! Try another search!!', undefined)
    }
    else{
        callback(undefined,{
            // latitude : response.body.features[0].center[1],
            latitude : body.features[0].center[1],//destructuring
            //longitude : response.body.features[0].center[0],
            longitude : body.features[0].center[0],//destructuring
           // location: response.body.features[0].place_name
            location: body.features[0].place_name//destructuring

        })

    }
})

}

module.exports = geocode