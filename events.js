'use strict';

var myevent = class myevent{
    constructor(eventType,eventcode){
        this.event_type=eventType
        this.event_code=eventcode
    }



    generate_event_details(){
        
        return `<h1>Enter the details for ${this.event_type}</h1><h2><b>Organizer details</b></h2><hr/>
        <form class="form" id="myform" action="#" onsubmit="eventadd_function(${this.event_code})">
      <div>  
        <label for="Name">Full Name</label>
        <input type="text" class="form-control" name="Name" id="Name" placeholder="Firstname Lastname" required ><br>
        
      </div>

      <div>
          <label for="email">Email</label>
          <input type="email" class="form-control" name="email" id="email" placeholder="email address" required>
          
      </div>
        



      <br>
      <h3>Event Details</h3>
      
      <hr/>
      <div>
          <label for="ename">Event name</label>
          <input type="text" name="ename" class="form-control" id="ename" ><br>
          
        </div>
  
        <div>
            <label for="econtact">Contact details</label>
            <input type="tel" name="econtact" class="form-control" id="econtact" required><br>
            
          </div>
          
          <div>
              <label for="eaddr">Location Address</label><br>
              <!---<input type="text" name="eaddr" class="form-control" id="eaddr"><br>-->
              <label><input type="radio" name="eaddr" id="external" checked onchange="add_loc_details(1)"> External&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <label><input type="radio" name="eaddr" id="virtual" onchange="add_loc_details(2)"> Virtual/Remote &nbsp;&nbsp;&nbsp;&nbsp;</label>
              <label><input type="radio" name="eaddr" id="home" onchange="add_loc_details(3)"> Current location &nbsp;&nbsp;&nbsp;&nbsp;</label>
              
              
              
              <input type="text" class="form-control" style="display:block" id="addr_opt1" placeholder="Please enter the location address">
              <input type="url" id="addr_opt2" class="form-control" placeholder="Please enter the meeting link here" style="display:None" pattern="https://.*" size="30">
              
              <p style="display:None" id="addr_opt3_para"></p>
          </div>

            <div>
                <label for="edate">Date</label>
                <input type="date" name="edate" class="form-control" id="edate"><br>
                
              </div>
              
              <div>
                  <label for="etime">Time</label>
                  <input type="time" name="etime" class="form-control" id="etime"><br>
                  
                </div>
      
        `
    }

}

var funeral=class funeral extends myevent{
    constructor(){
        super("funeral",1)
    }
    generate_event_details=()=>{ 
    return '<h3>Death details</h3>\
    <hr/>\
    <div>\
            <label for="death_name">Deceased Name</label>\
            <input type="text" name="death_name" class="form-control" id="death_name" ><br>\
    </div>\
    <div>\
            <label for="death_reason">Death Reason</label>\
            <input type="text" name="death_reason" class="form-control" id="death_reason"><br>\
    </div>\
    <button class="btn btn-lg btn-primary">Submit</button></form>\
    '
    }
    add_funeral_details=()=>super.generate_event_details() + this.generate_event_details()
    

}


var marriage = class marriage extends myevent{
    constructor(){
        super("marriage",2)
    }
    generate_event_details=()=>{ 
    return '<h2><b>Bride Groom Details</b></h2>\
    <hr/>\
    <div>\
        <label for="bname">Bride Name</label>\
        <input type="text" name="death_name" class="form-control" id="bname" required><br>\
    </div>\
   <div>\
            <label for="gname">Groom Name</label>\
            <input type="text" name="death_reason" class="form-control" id="gname" required><br>\
    </div>\
    <div>\
            <label for="met_details">How they met?</label>\
            <input type="text" name="death_reason" class="form-control" id="met_details"><br>\
    </div>\
   </br>\
    <button class="btn btn-lg btn-primary" >Submit</button></form>\
    '
    }
    add_marriage_details=()=>super.generate_event_details() + this.generate_event_details()
    

}
function eventcreator(x){
    if (x==1){
        const fun = new funeral()
        return fun.add_funeral_details()
    }
    else{
        const marr = new marriage()
        return marr.add_marriage_details()
    }
}
function add_event_details(x){
    let event_form
    switch(x){
        // first case will be funeral and next one will be marriage
        case 1:
        event_form=eventcreator(1)
        document.querySelector("#eventform").style.display="block"
        document.querySelector("#eventform").innerHTML=event_form
        sessionStorage.setItem("addr_choice",1)
        break;

        case 2:
        event_form=eventcreator(2)
        document.querySelector("#eventform").style.display="block"
        document.querySelector("#eventform").innerHTML=event_form
        sessionStorage.setItem("addr_choice",1)
        break;
 
        
    }

}
const show_events_list=async (url="http://localhost:4444/getEvents")=>{
    let events_arr_response=await axios(url)
    const event_array_str=events_arr_response.data.event_arr
    const events_list_div=document.querySelector("#display_events")
    let hr_element=document.createElement("hr")
    let final_str
    let div_element=document.createElement("div")
    for(var i = 0; i < event_array_str.length; i++){ 
        let table_element = document.createElement("table")
        
        
        let props_list=Object.getOwnPropertyNames(event_array_str[i])
        final_str=""
        let temp_str
        let h3_element=document.createElement("h3")
        let {event_name}=event_array_str[i]
        h3_element.innerText=event_name
        let th_element=document.createElement("th")
        let td1_element=document.createElement("td")
        let td2_element=document.createElement("td")
        td1_element.innerText=""
        td2_element.appendChild(h3_element)
        th_element.appendChild(td1_element)
        th_element.appendChild(td2_element)
        table_element.appendChild(th_element)
        for (let j=0;j<props_list.length;j++ ){
           let row_element = document.createElement("tr") 
           let td1_element=document.createElement("td")
           let td2_element=document.createElement("td")
           td1_element.innerText=props_list[j]
           td2_element.innerText=event_array_str[i][props_list[j]]
           row_element.appendChild(td1_element)
           row_element.appendChild(td2_element)
           table_element.appendChild(row_element)
           div_element.appendChild(hr_element) 
        }
        div_element.appendChild(table_element)
            

    }
    events_list_div.appendChild(div_element)


    
}
function select_event(x){
    //first case will be the case when we need to create events and second will be when we want to display the events
    switch(x){


        //first option would be to select the event creation menu
        case 1:
        document.querySelector("#events_menu").style.display="block"
        document.querySelector("#display_events").style.display="None"
        document.querySelector("#display_events").innerHTML=""
        break;

        //case 2 will be to browse events
        case 2:
        document.querySelector("#events_menu").style.display="None"
        document.querySelector("#eventform").style.display="None"
        document.querySelector("#display_events").style.display="block"

        show_events_list()
        break;
        



    }
}




