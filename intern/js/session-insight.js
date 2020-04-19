const logList = document.querySelector('#log-list');

var sessionID = localStorage.getItem("sessionId");
var sessionName = localStorage.getItem("sessionName");
var header = document.getElementById('header');
header.textContent = sessionName;


function renderResponse(doc){
    let session_li = document.createElement('li');
    let logTime =  document.createElement('span');
    let logValue = document.createElement('span');
    let logCross = document.createElement('div');

    
    session_li.setAttribute('data-id',doc.id);
    logTime.textContent = doc.data().sessionLog;
    logValue.textContent = doc.data().TimeCreated;
    logCross.textContent = 'x';

    session_li.appendChild(logValue);
    session_li.appendChild(logTime);
    session_li.appendChild(logCross);


    logList.appendChild(session_li);

    
// delete data
    logCross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Session-insight').doc(id).delete();
    })
}

function createLog(){
    var newLog = document.getElementById("newLog").value;
    if (newLog !=""){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        db.collection('Session-insight').add(    
            {
                sessionLog: newLog.toString(),
                TimeCreated: dateTime.toString(),
                sessionID: sessionID.toString()
            })
        }
    else {
        window.alert("Failed to add");
        location.reload();
    }
}



// Real-time listener (Getting real-time data)
db.collection('Session-insight').where("sessionID", "==", sessionID ).onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      if(change.type == 'added'){
        renderResponse(change.doc);
    } else if (change.type == 'removed') {
        let li = logList.querySelector('[data-id=' + change.doc.id + ']');
        logList.removeChild(li);
    }
    })
})

