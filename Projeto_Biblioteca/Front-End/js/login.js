function login(){
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let url = "http://localhost:3000/user/login";

    let user = {
        username: username,
        password: password,
        livro: []
    }
    
    
    callAPI(url, "POST", function(response){
       console.log(response);
        if(response == null){
            alert("Usuário ou senha incorretos")
        }else{
            localStorage.userID = response;
            window.location = "home.html";
        }
         
     }, user ); 
    

}

