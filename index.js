'use strict';

function add_details(x){
    switch(x){
    case 1:
        document.querySelector("#addr_opt1").style.display="block"
        document.querySelector("#addr_opt2").style.display="None"
        document.querySelector("#addr_opt3_para").style.display="None"
        break;
    case 2:
        document.querySelector("#addr_opt1").style.display="None"
        document.querySelector("#addr_opt2").style.display="block"
        document.querySelector("#addr_opt3_para").style.display="None"
        break;
    
    case 3:
        document.querySelector("#addr_opt1").style.display="None"
        document.querySelector("#addr_opt2").style.display="None"
        document.querySelector("#addr_opt3_para").style.display="block"
        getloc()

        break;


    }   
}

function makeGetRequest(path,lat_lon_str) {
    axios.get(path,{
        params: {
      latitude_longitude: lat_lon_str 
    }


    }).then(
        (response) => {
            const result = response.data;
            const {data}=result
            let place1
            place1=data[0]
            console.log(place1)
            const {name,region,postal_code}=place1
            document.querySelector("#addr_opt3_para").innerHTML=`<b>Street Name</b>:   ${name}</br>\
            <b>Region</b>:    ${region}</br>\
            <b>Postal Code</b>:    ${postal_code}</br>`
        },
        (error) => {
            console.log(error);
        }
    );
}




function getloc(){
    const successcallback =(pos)=>{
        var lat=pos.coords.latitude
        let lon=pos.coords.longitude
        const coords_str=lat+","+lon;
        makeGetRequest('http://127.0.0.1:4444/test',coords_str);
    }
    const errorcallback =(error)=>{
        
        console.log(error)
    }
    
        navigator.geolocation.getCurrentPosition(successcallback,errorcallback)
    }
    


function render_menu_option(x){
    switch(x){
        case 1:
            document.querySelector("#addr_opt1").style.display="block"
            document.querySelector("#addr_opt2").style.display="None"
            document.querySelector("#addr_opt3_para").style.display="None"
            break;
        case 2:
            document.querySelector("#addr_opt1").style.display="None"
            document.querySelector("#addr_opt2").style.display="block"
            document.querySelector("#addr_opt3_para").style.display="None"
            break;
        
        case 3:
            document.querySelector("#addr_opt1").style.display="None"
            document.querySelector("#addr_opt2").style.display="None"
            document.querySelector("#addr_opt3_para").style.display="block"
            getloc()
    
            break;
    
    
        }
}