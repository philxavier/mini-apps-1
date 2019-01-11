$(document).ready(function () {


    var button = document.getElementById('form_button');


    button.addEventListener("click", (e) => {
        e.preventDefault;
        var input = document.getElementById('inputBox').value;
    
        $.post("/", {data:input}, function(result){
            var text = result;
            var paragraphResult = document.createElement("p");
            paragraphResult.innerHTML = text;
            console.log(paragraphResult);
            $('#results').append(paragraphResult);
            console.log('here')
        });
    
    });

    $('#downloadLink').on('click', function(){
        $.ajax(
            {
                method: 'get', 
                url: '/download',
                success: function() {
                    console.log('yes')
                }
         })

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