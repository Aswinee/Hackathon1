//JS for contacts 

const MY_DOMAIN = "https://newaccount1624351818656.freshdesk.com/";
const API_KEY = "xRZJhkUHqffvrS03tkR"; //Base64 encoding of API_KEY
const Base64API_KEY = window.btoa(API_KEY);
const config = {
  headers: { Authorization: "Basic " + btoa(API_KEY) },
  method: "GET"
};
const TICKETS_PATH = "api/v2/tickets";
const contacts_path = "api/v2/contacts";
fetch(MY_DOMAIN + contacts_path, config)
  .then((res) => res.json())
  .then((users) => {
    
    const contactList = document.querySelector(".contacts");
    users.forEach((user) => {
    
      const userContainer = document.createElement("tr");
      userContainer.className = "user-container";
      userContainer.innerHTML += `<td>${user.name}</td><td>${user.job_title}</td><td>${user.email}</td><td>${user.phone}</td><td>${user.facebook_id}</td><td>${user.twitter_id}</td><td>
      <a href="#edit" rel="internal"><input type="button" onclick="editContact('${user.name}', '${user.job_title}', ${user.id}, '${user.email}', '${user.phone}')" class="editContact" value="edit"></input></a>
      <input type="button" onclick="deleteContact(${user.id})" class="deleteContact" value="del"></input>
      </td>`;

      contactList.append(userContainer);
    });
  })
  .catch((err) => console.log(err));


function createUser() {
  if(document.querySelector('.createUser').innerText == 'Edit User'){
    const id=localStorage.getItem("editID");
    
  const API_KEY = "xRZJhkUHqffvrS03tkR"; //Base64 encoding of API_KEY
  const Base64API_KEY = window.btoa(API_KEY);
  const config = {
    headers: {
      Authorization: "Basic " + btoa(API_KEY),
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify({
      name: document.querySelector(".newName").value,
      email: document.querySelector(".newEmail").value,
      job_title: document.querySelector(".newTitle").value,
      phone: document.querySelector(".newPhone").value     
      
    })
  };
  
  const contacts_path = `https://newaccount1624351818656.freshdesk.com/api/v2/contacts/${id}`;
  fetch(contacts_path, config)
    .then((res) => res.json())
    .then((data) => console.log("HI"));
  }
  
  
  else{
    console.log("inside create")
  const MY_DOMAIN = "https://newaccount1624351818656.freshdesk.com";
  const API_KEY = "xRZJhkUHqffvrS03tkR"; //Base64 encoding of API_KEY
  const Base64API_KEY = window.btoa(API_KEY);

  const fbID=document.querySelector(".newTwitter").value==""?null:document.querySelector(".newTwitter").value;
  const config = {
    headers: {
      Authorization: "Basic " + btoa(API_KEY),
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      name: document.querySelector(".newName").value,
      email: document.querySelector(".newEmail").value,
      job_title: document.querySelector(".newTitle").value,
      phone: document.querySelector(".newPhone").value
      
      
    })
  };
  console.log(fbID);
  const contacts_path = "/api/v2/contacts/";
  fetch(MY_DOMAIN + contacts_path, config)
    .then((res) => res.json())
    .then((data) => console.log(data));
  }
  
}

function deleteContact(userID){
  console.log("inside dlete", userID)
  const MY_DOMAIN = `https://newaccount1624351818656.freshdesk.com/`;
  const API_KEY = "xRZJhkUHqffvrS03tkR"; //Base64 encoding of API_KEY
  const Base64API_KEY = window.btoa(API_KEY);
  const config = {
    headers: {
      Authorization: "Basic " + btoa(API_KEY)
    },
    method: "DELETE",     
      
  };
  const contacts_path = `https://newaccount1624351818656.freshdesk.com/api/v2/contacts/${userID}`;
  fetch(contacts_path, config)
    .then((data) => console.log(data));
  
}

function editContact(name, title, id, email, phone){
  console.log(name, title, id, email, phone);
  document.querySelector(".newName").value=name;
  document.querySelector(".newTitle").value=title;
  document.querySelector(".newEmail").value=email;
  document.querySelector(".newPhone").value=phone;
  document.querySelector('.createUser').innerText = 'Edit User';
  document.querySelector(".new").style.top="0px";
  localStorage.setItem("editID", id)
;

}

function displayContactpage(){
    document.querySelector(".contactPage").style.display="visible";
}