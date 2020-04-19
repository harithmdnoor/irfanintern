const sessionList = document.querySelector('#session-list');
const form = document.querySelector('#add-response');
function renderResponse(doc){

    let session_li = document.createElement('li');
    let session_id =  document.createElement('span');
    let session_name = document.createElement('span');
    let session_click = document.createElement('BUTTON');
    let session_cross = document.createElement('div');

    
    session_li.setAttribute('data-id',doc.id);
    session_name.textContent = doc.data().SessionName;
    session_click.textContent = "Enter Session";
    session_cross.textContent = 'x';


    session_li.appendChild(session_name);
    session_li.appendChild(session_click);
    session_li.appendChild(session_cross);


    sessionList.appendChild(session_li);
    
    
    session_click.addEventListener('click', (e) => {
        e.preventDefault();
        var data = doc.data();
        var sessionName = data.SessionName;
        var sessionId = doc.id;
        localStorage.setItem("sessionId",sessionId);
        localStorage.setItem("sessionName",sessionName);
        window.location.href = 'session-insight.html';
    })

    session_cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Session').doc(id).delete();
    })

}
function logOut(){
    window.location.href = "index.html";
}
function createSession(){
    var newSession = document.getElementById("newSession").value;
    if (newSession !=""){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        db.collection('Session').add(    
            {
                SessionName: newSession.toString(),
                TimeCreated: dateTime.toString()

            })
            db.collection('Students').get().then(snapshot => {
                data = snapshot.docs;
    
                data.forEach(doc => {
                    var sessionname = '';
                    const guide = doc.data();
                    sessionName = guide.Name;
                    if (SessionName.toString() == sessionname.toString()) {
                        window.alert("Added Successfully");
                        location.reload();
                    }
                    else {
                        counter += 1;
                        if (counter == data.length) {
                            window.alert("Failed to add");
                            location.reload();
                        }
                    }
                })
            });
        }
    else {
        window.alert("Failed to add");
        location.reload();
    }
    newSession.value = "";
}
function clearTxt(){
    document.getElementById("newSession").value = 'f';
}

// Real-time listener (Getting real-time data)
db.collection('Session').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      if(change.type == 'added'){
        renderResponse(change.doc);
    } else if (change.type == 'removed') {
        let session_li = sessionList.querySelector('[data-id=' + change.doc.id + ']');
        sessionList.removeChild(session_li);
    }
    })
})

