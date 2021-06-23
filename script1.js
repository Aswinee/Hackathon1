var request = new XMLHttpRequest();
request.open('GET','https://restcountries.eu/rest/v2/all',true);
request.send();
request.onload = function(){
    var data = JSON.parse(this.response);
    for(var i in data)
    {
        try{
            var name = data[i].name;
            var lang = data[i].latlng;
            if(lang.length===0)throw new Error("Longitude is not found")
            displayTemp(name,...lang)

        }
        catch(x){
            console.log("some coordinates are invalid: "+name+":"+x.message);

        }
    
    }
}
function displayTemp(name,lat,lng){
    var request1 = new XMLHttpRequest();
    //console.log(lat,lng);
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&appid=dd4067d0eb0e8bc640ac7bacec936c6c';
    request1.open('GET',url,true);
    request1.send();
    request1.onload = function(){
        try{
            var data = JSON.parse(this.response);
            //console.log(`${name} :${data.main.temp}`);
            console.log(name+' : '+data.main.temp);
        }catch(x){
            console.log("undefined response"+name);

        }
        
}

}