let httpRequest
const base_url = "https://haveibeenpwned.com/api/v3/breach/"
const btn_busca = document.getElementById("search")
const event_busca = document.getElementById("search").addEventListener("change", update)
const r = document.getElementsByClassName('search-area')[0]

if (window.XMLHttpRequest) {
    httpRequest = new XMLHttpRequest()
} else if (window.ActiveXObject) {
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP")
}

httpRequest.onreadystatechange = _change

function update(evt){
    let url = base_url + btn_busca.value
    httpRequest.open("GET", url)
    httpRequest.send()
    btn_busca.value = ""
}

function _change(){
  let response
  r.style.display = "inherit"
  r.style.color = "white";
  try {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        response = httpRequest.responseText
        const json = JSON.parse(response)
        r.getElementsByTagName("h3")[0].innerText = json["Name"]
        r.getElementsByTagName("span")[0].innerHTML = json["Description"]
      }
      else if (httpRequest.status === 404) {
        r.innerText = "Not Found!"
      }
      else {
        alert('There was a problem with the request.')
      }
    }
  }
  catch( e ) {
    location.reload()
  }
}
