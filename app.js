var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=2WjrmVKM7H_otuadZxPdmSFMTonpyUX_xnsh5aDv81c";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/divisions" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
let on_button_click = () => {
  corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      console.log(JSON.parse(request.response)['data'])
      let data = JSON.parse(request.response)['data']
      .filter((x) => {
        return x['name'].length > 11 ? true: false;
      })
      .map(x=>x['name']);
      
      document.getElementById("my_list").inner_html = "";
      data.forEach((x) => {
        var node = document.createElement("li");                 
        var textnode = document.createTextNode(x);         
        node.appendChild(textnode);                              
        document.getElementById("my_list").appendChild(node); 
      });
    })
);
};

document.getElementById("load").addEventListener("click", on_button_click); 
//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
