// JavaScript source code
var userNamelist = [];
var user = [];
var teachernamelist = [];
var teacherpasswordlist = [];
var teacheradminlist = [];
var check = false;
var counter = 0;
// Login
function verify() {
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    userNamelist.forEach(doc => {
        userNamelist.forEach(ids => {
        if (name == doc) {
                userNamelist.forEach(ids => {
                    if (password == ids.toString()){
                        window.location.href = 'session.html';
                        var studentdata = [name, ids];
                        localStorage.setItem('studentdata',studentdata);
                        check = true;
                    }
                })
            }
        })
    })
    if(check == false){
        alert("Wrong username or Password");
        window.location.href = 'index.html';
    }
}
function signup(){
    window.location.href= "signup.html";
}

//getting student name and id
dbl.collection('User').get().then(snapshot => {
    data = snapshot.docs;
    
    data.forEach(doc => {
        var userName = '';
        var userPassword = '';
        const guide = doc.data();
        userName = guide.name;
        userPassword = guide.password;
        userNamelist.push(userName);
        userNamelist.push(userPassword);
    })
});


// Get the input field
var nameinput = document.getElementById("name");
var passwordinput = document.getElementById("password");

// Execute a function when the user releases a key on the keyboard
nameinput.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("loginBtn").click();
    }
});
// Execute a function when the user releases a key on the keyboard
passwordinput.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("loginBtn").click();
    }
});


function admin() {
    window.location.href = 'adminmenu.html';
}