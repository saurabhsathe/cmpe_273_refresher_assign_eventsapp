'use strict';

class Events{
    constructor(eventType){
        this.event_type=eventType
    }



    generate_event_details(){
        
        return `<h1>Enter the details for ${this.event_type}</h1><h2><b>Organizer details</b></h2><hr/><label for="Name">Full Name</label>\
        <input type="text" class="form-control" name="Name" id="Name" placeholder="Firstname Lastname" required><br>\
      </div>\
      <div>\
          <label for="email">Email</label>\
          <input type="email" class="form-control" name="email" id="email" placeholder="email address" required>\
      </div><br>\
      <h2><b>Event details</b></h2><hr/>\
        <div>\
            <label for="ename">Event name</label>\
            <input type="text" name="ename" class="form-control" id="ename" required><br>\
            \
          </div>\
    \
          <div>\
              <label for="ename">Contact details</label>\
              <input type="tel" name="econtact" class="form-control" id="econtact" required><br>\
              \
            </div>\
            \
            <div>\
                <label for="eaddr">Location Address</label><br>\
                <!---<input type="text" name="eaddr" class="form-control" id="eaddr"><br>-->\
                <label><input type="radio" name="eaddr" id="external" checked onchange="add_details(1)"> External&nbsp;&nbsp;&nbsp;&nbsp;</label>\
                <label><input type="radio" name="eaddr" id="virtual" onchange="add_details(2)"> Virtual/Remote &nbsp;&nbsp;&nbsp;&nbsp;</label>\
                <label><input type="radio" name="eaddr" id="home" onchange="add_details(3)"> Current location &nbsp;&nbsp;&nbsp;&nbsp;</label>\
                <input type="text" class="form-control" style="display:None" id="addr_opt1" placeholder="Please enter the location address">\
                <input type="url" id="addr_opt2" class="form-control" placeholder="Please enter the meeting link here" style="display:None" pattern="https://.*" size="30">\
                \
                <p style="display:None" id="addr_opt3_para"></p>\
            </div>\
  \
              <div>\
                  <label for="edate">Date</label>\
                  <input type="date" name="edate" class="form-control" id="edate"><br>\
                  \
                </div>\
                \
                <div>\
                    <label for="etime">Time</label>\
                    <input type="time" name="etime" class="form-control" id="etime"><br>\
                    \
                  </div>\
        `
    }

}

class funeral extends Events{
    constructor(){
        super("funeral")
    }
    generate_event_details=()=>{ 
    return '<h2><b>Death details</b></h2>\
    <hr/>\
    <div>\
            <label for="death_name">Deceased Name</label>\
            <input type="text" name="death_name" class="form-control" id="death_name" required><br>\
    </div>\
    <div>\
            <label for="death_reason">Death Reason</label>\
            <input type="text" name="death_reason" class="form-control" id="death_reason"><br>\
    </div>\
    <div>\
            <label for="death_place">Death Place</label>\
            <input type="text" name="death_place" class="form-control" id="death_place"><br>\
    </div>\
    <div>\
            <label for="death_date">Deceased Name</label>\
            <input type="date" name="death_date" class="form-control" id="death_date" required><br>\
    </div></br>\
    <button class="btn btn-lg btn-primary">Submit</button>\
    '
    }
    add_funeral_details=()=>super.generate_event_details() + this.generate_event_details()
    

}


class marriage extends Events{
    constructor(){
        super("marriage")
    }
    generate_event_details=()=>{ 
    return '<h2><b>Death details</b></h2>\
    <hr/>\
    <div>\
            <label for="death_name">Deceased Name</label>\
            <input type="text" name="death_name" class="form-control" id="death_name" required><br>\
    </div>\
    <div>\
        <label for="death_name">Deceased Name</label>\
        <input type="text" name="death_name" class="form-control" id="death_name" required><br>\
    </div>\
   <div>\
            <label for="death_reason">Death Reason</label>\
            <input type="text" name="death_reason" class="form-control" id="death_reason"><br>\
    </div>\
    <div>\
            <label for="death_place">Death Place</label>\
            <input type="text" name="death_place" class="form-control" id="death_place"><br>\
    </div>\
    <div>\
            <label for="death_date">Deceased Name</label>\
            <input type="date" name="death_date" class="form-control" id="death_date" required><br>\
    </div></br>\
    <button class="btn btn-lg btn-primary">Submit</button>\
    '
    }
    add_funeral_details=()=>super.generate_event_details() + this.generate_event_details()
    

}
function eventcreator(){
    const fun = new funeral()
    return fun.add_funeral_details()
}
function add_event(x){
    switch(x){
        // first case will be funeral and next one will be marriage
        case 1:
        const event_form=eventcreator()
        const eventform = document.querySelector("#eventform")
        eventform.style.display="block"
        eventform.innerHTML=event_form
        break

        
        
    }

}

function select_event(x){
    //first case will be the case when we need to create events and second will be when we want to display the events
    switch(x){
        case 1:
        
        document.querySelector("#events_menu").style.display="block"
        break;
        case 2:
        break;
        



    }
}




