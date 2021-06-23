function getTicket(){
    const MY_DOMAIN = "https://newaccount1624351818656.freshdesk.com/"; const API_KEY = "xRZJhkUHqffvrS03tkR"; //Base64 encoding of API_KEY 
    const Base64API_KEY = window.btoa(API_KEY); 
    const config = { headers: { Authorization: "Basic " + btoa(API_KEY), }, }; 
    const TICKETS_PATH = "api/v2/tickets"; 
    fetch(MY_DOMAIN + TICKETS_PATH, config)
      .then((res) => res.json())     
      .then((tickets)=>{
    const ticketList = document.querySelector(".viewTicket");
     tickets.forEach((ticket)=>{
      var status=""; var priority=""
      switch(ticket.status){
        case 1:
          {
            priority="Low"
            break;
          }
        case 2:
          {
            status="Open";
            priority="Medium";
            break;
          }
                  
        case 3:
          {
            status="pending";
            priority="High";
            break;
           }
          
        case 4:
          {
            status="resolved";
           priority="urgent";
            break;
          }
          
        case 5:
          {
            status="closed";
            break;
          } 
        case 6:
          {
            status="Waiting on Customer";
            priority="Low";
            break;
          }     
      }
      const ticketContainer = document.createElement("div");
      ticketContainer.className = "ticket-container";
      const name=localStorage.getItem('requesterName');
      // console.log(name);
      ticketContainer.innerHTML += `
          <h4 class="user-id">${ticket.subject}</h4>
          <p class="user-joined"> ${new Date(ticket.created_at).toDateString()}</p>
          
          <div class="StatusPriority">
          <div>
          <select id="statusSelect" size="1" onchange="changeStatus(${this.value},${ticket.id})" name="country" required>
        <option value="" disabled selected>${status}</option>
        <option type="text">Open</option>
        <option type="text">Pending</option>
        <option type="text">Resolved</option>
        <option type="text">Closed</option>
        <option type="text">Waiting on Customer</option>
      </select>
      </div>
      <div>
       <select id="prioritySelect" size="1" onchange="changePriority(${this.value},${ticket.id})" name="country" required>
        <option value="" disabled selected>${priority}</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Urgent</option>
      </select>
      </div>`;
          
      ticketList.append(ticketContainer);    
    });                 
  })
    .catch((err) => console.log(err));
  }
  
  
  getTicket();
  
  
  function addTicket(){
    const MY_DOMAIN = "https://newaccount1624351818656.freshdesk.com";
    const API_KEY = "xRZJhkUHqffvrS03tkR"; //Base64 encoding of API_KEY
    const Base64API_KEY = window.btoa(API_KEY);
   var status= document.querySelector(".newStatus").value;
    var priority = document.querySelector(".newPriority").value;
    console.log(document.querySelector(".newPriority").value,`'${status}'`)
    const config = {
      headers: {
        Authorization: "Basic " + btoa(API_KEY),
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        email: document.querySelector(".ticketEmail").value,
        priority:  `'${priority}'`,
        subject:document.querySelector(".newSubject").value,
        status:`'${status}'`, 
       
        description: document.querySelector(".newDescription").value
            
        
      })
    };
   
    const contacts_path = "/api/v2/tickets";
    fetch(MY_DOMAIN + contacts_path, config)
      .then((res) => res.json())
      .then((data) => console.log(data));
    
  }
  
  function changeStatus(status,id){
    var status=2;
    var status1=String(document.querySelector("#statusSelect").value);
    console.log("inside schange", status1.type);
    switch(status1){
        case "Open":
          {
            status=Number(2);
            break;
          }
        case "Pending":
          {
            status=Number(3);
            break;
          }
                  
        case "Resolved":
          {
            status=4;
            break;
           }
          
        case "Closed":
          {
            status=5;
            break;
          }
          
        case "Waiting on Customer":
          {
            status=6;
            break;
          }  
      }
    console.log(status1.type);
    const MY_DOMAIN = "https://newaccount1624351818656.freshdesk.com";
    const API_KEY = "xRZJhkUHqffvrS03tkR"; //Base64 encoding of API_KEY
    const Base64API_KEY = window.btoa(API_KEY);
    const config = {
      headers: {
        Authorization: "Basic " + btoa(API_KEY),
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify({
        status:`${status}` 
      })
      
      
    };
   
    const contacts_path = `https://newaccount1624351818656.freshdesk.com/api/v2/tickets/${id}`;
    fetch(contacts_path, config)
      .then((res) => res.json())
      .then((data) => console.log("hey",data.status));
    
  }