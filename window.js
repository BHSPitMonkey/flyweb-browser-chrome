document.addEventListener('DOMContentLoaded', function () {
  chrome.mdns.onServiceList.addListener(function (services) {
    var container = document.getElementById("services");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Repopulate list
    if (services.length == 0) {
      container.innerText = "No FlyWeb services found yet...";
    } else {
      for (var i=0; i<services.length; i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        var name = services[i].serviceName.replace("._flyweb._tcp.local", "");
        var aText = document.createTextNode(name);
        a.setAttribute("href", services[i].serviceHostPort);
        a.setAttribute("title", services[i].serviceHostPort);
        a.setAttribute("target", "_blank");
        a.appendChild(aText);
        li.appendChild(a);
        container.appendChild(li);
      }
    }
  }, { serviceType:'_flyweb._tcp.local' });

  setInterval(function() {
   chrome.mdns.forceDiscovery(function(){console.log("Forcing discovery")});
  }, 5000);
});
