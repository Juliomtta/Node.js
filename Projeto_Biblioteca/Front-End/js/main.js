var URL_BASE = "http://localhost:3000";
var livro = 0;
var img = "img/livro_padrao.png"
var content = "";
var arrayLivro = [];

// Adicionar livro

window.onload = function(){
    content = document.getElementById('content');
    if(localStorage.userID == null){
        window.location = "index.html";
    }
    readLivro();
    
    
    
    
}
//Logout
function logout(){
    localStorage.userID = null;
    window.location = "index.html";
}

function criarLivro(){

    content.innerHTML += " <div class='livro' id='livro"+livro+"' ><div class='info'><img src='"+img+"'> <div class='info-livro'><input type='text' id='nome"+livro+"' placeholder='Nome do livro' ><input type='text' id='autor"+livro+"' placeholder='Nome do autor'><input type='text' id='genero"+livro+"' placeholder='Genero do livro'></div></div><div class='botoes'><i class='fas fa-check-circle confirmar' id='salvar"+livro+"' onclick='salvar(id)' ></i><br>  <i class='fas fa-window-close cancelar' onclick='cancelar()'></i></div></div><hr>";
    
    livro++;
}
// READ
function readLivro(){
    event.preventDefault();
    let url = URL_BASE + "/livro/"+localStorage.userID;
    
    callAPI(url, 'GET', function(response){
     
      
        for(var i=0; i<response.length; i++){

            if(response[i].image != undefined){
                img = response[i].image;
            }else{
                img = "img/livro_padrao.png"
            }
            
            var l = document.createElement("div");
            
            l.id = "livro"+livro;
           
            l.className = "livro";
            
            console.log();
            var informacoes = "<div class='info'><img src='"+img+"'> <div class='info-livro'><span class='label'>Livro: </span><span id='nome"+livro+"' contenteditable='true' onblur='atualizar(id, 1)'>  "+response[i].title+" </span><br><span class='label'>Autor: </span><span id='autor"+livro+"' contenteditable='true' onblur='atualizar(id, 2)'> "+response[i].author+"</span><br><span class='label'>Gênero: </span><span id='genero"+livro+"' contenteditable='true' onblur='atualizar(id, 3)'>"+response[i].genre+"</span></div></div><div class='botoes'><i class='far fa-edit editar' id='editar"+livro+"' onclick='editar(id)'></i><br>  <i class='fas fa-trash-alt apagar' id='apagar"+livro+"' onclick='del(id)'></i></div>";

            l.innerHTML += informacoes;
            
            document.getElementById("content").appendChild(l);
            
            document.getElementById("content").innerHTML += "<hr>";
            livro++;
            
            arrayLivro.push(response[i].id);
           
    }
        
        
       
        
        
    })
    
}

//DELETE

function del(id){
    id = id.replace('apagar', '');
    
    event.preventDefault();
    let url = URL_BASE + "/livro/" + arrayLivro[id];
    
    callAPI(url, 'DELETE', function(response){
        location.reload();
    })
}

//CREATE
function cancelar(){
    location.reload();
}
function salvar(id){
    event.preventDefault();
    id = id.replace('salvar', '');

    let li = {
        title: document.getElementById("nome"+id).value,
        author: document.getElementById("autor"+id).value,
        genre: document.getElementById("genero"+id).value,
        user: localStorage.userID
       
    }
    console.log(li);
    
    let url = URL_BASE + "/livro";
    
    
    callAPI(url, "POST", function(response){
       console.log("Livro inserido com sucesso. ");
        
    }, li );  
    location.reload();

}

//UPDATE
function atualizar(id, campo){
    event.preventDefault();
    if(campo == 1 ){
        var indice = id.replace("nome", "");
    }
    else if(campo == 2){
        var indice = id.replace("autor", "");
    }else if(campo == 3){
        var indice = id.replace("genero", "");
    }

    let li = {
        _id: arrayLivro[indice],
        title: document.getElementById("nome"+indice).innerHTML,
        author: document.getElementById("autor"+indice).innerHTML,
        genre: document.getElementById("genero"+indice).innerHTML,
        user: localStorage.userID
       
    }
    console.log(li)
    
    let url = URL_BASE + "/livro";
    
    
    callAPI(url, "PATCH", function(response){
       console.log("Livro inserido com sucesso. ");
        
    }, li );  
    location.reload();
}

function editar(id){
    id = id.replace("editar", "");
    document.getElementById("nome"+id).focus();
}











