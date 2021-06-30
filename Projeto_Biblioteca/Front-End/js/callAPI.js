function callAPI(url, method, callback, data){
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open(method, url, true);
    if(method == "POST" || method == "PUT" || method == "PATCH"){
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
    xhr.onload = function(){
        if(xhr.status == 200 || xhr.status == 201){
            callback(xhr.response);
        }
    }
    if(data){
        xhr.send(JSON.stringify(data))
    } else{
        xhr.send();    
    }
}