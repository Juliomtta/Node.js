function cadastrar(){
    event.preventDefault();
    let usuario = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirmPassword").value;
    if(password == confirm){
    let user = {
        
        username: usuario,
        password: password,
        livro: []

    }
    
    
    let url = "http://localhost:3000/user";
    
    
    callAPI(url, "POST", function(response){
       console.log("Usuário cadastrado com sucesso. ");
       window.location = "index.html";
       

        
    }, user );
    }else{
        document.getElementById("alert").innerHTML = "As senhas não conferem";
        document.getElementById("alert").className= "alert erro";
    }
}