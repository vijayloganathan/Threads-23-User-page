const auth = firebase.auth()
const db = firebase.firestore()
const database = firebase.database()
const cardElement = document.querySelector('.card');
const downloadButton = document.querySelector('#downloadcardbtn');
const downloadButton1 = document.querySelector('#downloadcardbtn1');
const downloadButton2 = document.querySelector('#downloadcardbtn2');
const idcard = document.querySelector('#id_card');



downloadButton.addEventListener('click' , Event =>{
    Event.preventDefault();
    downloadcard()
    })

    downloadButton1.addEventListener('click' , Event =>{
        Event.preventDefault();
        downloadcard()
        })

        downloadButton2.addEventListener('click' , Event =>{
            Event.preventDefault();
            downloadcard()
            })

function downloadcard()
{
    idcard.style.display = "block";
    swal({
        title : 'Download ID Card',
        content : {
            element : 'input',
            attributes : {
                placeholder : 'Type your Registered Emailid',
                type : 'email'
            }
        }
    }).then(val => {
        const emailget=val;
        var databas = firebase.database();

databas.ref("userdata").child("findid").once("value", function(snapshot) {
          
          snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();
            console.log(data);
            ifevent=data.emailid;
            console.log(ifevent)
            let ifid=data.id;
            if(ifevent==emailget)
            {  
              
              console.log(ifid)
                     
              databas.ref("userdata").child("user").child(ifid).once("value", function(snapshot) {
                if (snapshot.exists()) {
                    const sydata = snapshot.val();
                const id=sydata.id;
                const name=sydata.Name;
                const event=sydata.Event;
                const workshop=sydata.workshop;
                const dept=sydata.Dept;
                const college=sydata.Email;

                const userid = document.querySelector('#userid');
                const nameid = document.querySelector('#nameid');
                const eventid = document.querySelector('#eventid');
                const workshopid = document.querySelector('#workshopid');
                const deptid = document.querySelector('#deptid');
                const collegeid = document.querySelector('#collegeid');
                

                userid.textContent = id;
                nameid.textContent = name.toLocaleUpperCase();
                if(event === "no"){
                    eventid.textContent = "NOT REGISTERED FOR EVENTS";
                    eventid.style.color = "red";
                }
                else if(event === "yes"){
                    eventid.textContent = "REGISTERED FOR EVENTS";
                    eventid.style.color = "green";
                }
                if(workshop === "not_interested"){
                     workshopid.textContent = "NOT REGISTERED FOR WORKSHOP";
                     workshopid.style.color = "red";
                }
                else if(workshop === "cyber_security"){
                    workshopid.textContent = "CYBER SECURITY"
                     workshopid.style.color = "green";
                }
                else if(workshop === "web_development"){
                    workshopid.textContent = "WEB DEVELOPMENT"
                    workshopid.style.color = "green";
                }
                else if(workshop === "rpa"){
                    workshopid.textContent = "ROBOTIC PROCESS AUTOMATION"
                    workshopid.style.color = "green";
                }
                deptid.textContent = dept.toLocaleUpperCase();
                collegeid.textContent = college;

                domtoimage.toBlob(cardElement)
                .then(blob => {
                    const downloadLink = document.createElement('a');
                    downloadLink.href = window.URL.createObjectURL(blob);
                    downloadLink.download = 'idcard.png';
                    downloadLink.click();
                }).then((event)=>{
                      idcard.style.display = "none";
                })
          
                }
                })
            }
          })

    })
})
}