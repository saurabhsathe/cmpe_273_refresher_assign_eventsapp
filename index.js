'use strict';

function add_loc_details(x){
    switch(x){
    case 1:
        sessionStorage.setItem("add_choice", 1);
        document.querySelector("#addr_opt1").style.display="block"
        document.querySelector("#addr_opt2").style.display="None"
        document.querySelector("#addr_opt3_para").style.display="None"
        break;
    case 2:
        sessionStorage.setItem("add_choice", 2);
        document.querySelector("#addr_opt1").style.display="None"
        document.querySelector("#addr_opt2").style.display="block"
        document.querySelector("#addr_opt3_para").style.display="None"
        break;
    
    case 3:
        sessionStorage.setItem("add_choice", 3);
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
            console.log("here")
            sessionStorage.setItem("addr_choice",1)
            console.log("here2")
            break;
        case 2:
            document.querySelector("#addr_opt1").style.display="None"
            document.querySelector("#addr_opt2").style.display="block"
            document.querySelector("#addr_opt3_para").style.display="None"
            sessionStorage.setItem("addr_choice",2)
            break;
        
        case 3:
            document.querySelector("#addr_opt1").style.display="None"
            document.querySelector("#addr_opt2").style.display="None"
            document.querySelector("#addr_opt3_para").style.display="block"
            sessionStorage.setItem("addr_choice",3)
            getloc()
    
            break;
    
    
        }
}



//var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
function get_today(){
    let today = new Date();
    alert("I am on date")
    let d = String(today.getDate()).padStart(2, '0');
    let m = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let y = today.getFullYear();
    
    today = d+m+y;
    
    return today
}

/*
const add_event=async (url,events_str,event_name)=>{
    const repsonse_obj=await axios.get(url,{
        params: {
      event_name:event_name,      
      events_str:events_str 
    }
    

    })
    return repsonse_obj
    
    
    
    }
  */  
 function add_event(url,events_str,event_name) {
    
    axios.get(url,{
        params: {
            event_name:event_name,      
            events_str:events_str 
    }


    }).then(
        (response) => {
            const result = response.data;
            const {response_txt}=result
            alert("in the response")
            alert(response_txt)
            return data
        },
        (error) => {
            alert("in the error")

            alert(error);
        }
    );
}


function eventadd_function() {
    //organizer details
    const name=document.getElementById("Name").value
    const email=document.getElementById("email").value
    
    
    //event details
    const ename=document.getElementById("ename").value
    const econtact=document.getElementById("econtact").value
    const eloc_opt=sessionStorage.getItem("addr_choice");
    const edate=document.getElementById("edate").value
    const etime=document.getElementById("etime").value
    
    //dead person details
    const dname=document.getElementById("death_name").value
    const dreason=document.getElementById("death_reason").value
    let eaddr;

    switch(eloc_opt){

        case "1":
            eaddr=document.getElementById("addr_opt1").value
            break;
        case "2":
            eaddr=document.getElementById("addr_opt2").value
            break;
        case "3":
            eaddr=document.getElementById("addr_opt3").innerHTML
            break;

    }
    
    sessionStorage.clear()
    const today_date=get_today()
    const event_name=`funeral_event_of_${dname}_${today_date}`
    const event_details={event_name:{event_type:"funeral",oname:name,oemail:email,event_name:ename,event_contact:econtact,event_loc:eaddr,event_date:edate,event_time:etime,death_name:dname,death_reason:dreason}}
    const event_details_str=JSON.stringify(event_details)
    console.log(event_details)
    
    const res=add_event("http://127.0.0.1:4444/addEvent",event_details_str, event_name)
    
  


}


