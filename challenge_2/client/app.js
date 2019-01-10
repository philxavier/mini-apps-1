
$( document ).ready(function() {
    
    var button = document.getElementById('form_button');

    var text = button.addEventListener("click", () => {  

        // var http = new XMLHttpRequest();
        // var y = 'json'
        // var z = document.getElementById("inputBox").value;
        // var postdata= "text=y&data=z"; //Probably need the escape method for values here, like you did
        
        // http.open("POST", "/", true);
    
        // //Send the proper header information along with the request
        // http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // http.setRequestHeader("Content-length", postdata.length);
    
        // http.onreadystatechange = function() {//Call a function when the state changes.
        //     if(http.readyState == 4 && http.status == 200) {
        //         alert(http.responseText);
        //     }
        // }
        // http.send(postdata);
        // })
        
        // var input = document.getElementById("inputBox").value;
        // var request = new XMLHttpRequest();
        // request.open('POST', 'what is the dea', true);
        // request.send();


        // request.onreadystate = function() {
        //     if (request.readyState == request.DONE && request.status == 200) {
        //        alert(request.responseText);
        //     }
        //  };
     

        // $.post("/", {data:input}, function(result){
        //     var text = result;
        //     var paragraphResult = document.createElement("p");
        //     paragraphResult.innerHTML = text;
        //     console.log(paragraphResult);
        //     $('#results').append(paragraphResult);
        // });
    })
        
});



        
        
    //     var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    //     xmlhttp.open("POST","/");
    //     xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //     xmlhttp.send(JSON.stringify({ "email": "hello@user.com", "response": { "name": "Tester" } }))
        
    // })
       





// xhr = new XMLHttpRequest();

// xhr.open('POST', 'myservice/username?id=some-unique-id');
// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// xhr.onload = function() {
//     if (xhr.status === 200 && xhr.responseText !== newName) {
//         alert('Something went wrong.  Name is now ' + xhr.responseText);
//     }
//     else if (xhr.status !== 200) {
//         alert('Request failed.  Returned status of ' + xhr.status);
//     }
// };
// xhr.send(encodeURI('name=' + newName));