function signup(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");

    
    if(confirmPassword!=password){
        alert("Passwords not matching");
        window.location.href = 'signup.html';
    }
}