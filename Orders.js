var logoutBtn = document.querySelector('.logout-button');

const orders = async () => {

    access_token = window.localStorage.getItem("freddyAccessToken");

  if (!access_token) {
    window.history.replaceState({ login: "/index.html" }, "", "/index.html");
    window.location.reload()
    return;
  }

  var headers = new Headers();

  headers.append(
    "Authorization",
    "Bearer " + window.localStorage.getItem("freddyAccessToken")
  );

  try {
    var response = await fetch(`https://freddy.codesubmit.io/orders`, {
      method: "GET",
      headers: headers,
    });
    var data = await response.json();
    var orders = data.orders;
    console.log(data.orders);
    for (key in orders) {
      var tr = document.createElement("tr");
      var td1 = tr.appendChild(document.createElement("td"));
      var td2 = tr.appendChild(document.createElement("td"));
      var td3 = tr.appendChild(document.createElement("td"));
      var td4 = tr.appendChild(document.createElement("td"));

      td1.innerHTML =
        orders[key].product.name.length > 15
          ? orders[key].product.name.slice(0, 15) + "..."
          : orders[key].product.name;
      td2.innerHTML = orders[key].created_at.slice(0, 10);
      td3.innerHTML = orders[key].customer.name;
      td4.innerHTML = orders[key].status;

      document.getElementsByClassName("order-table")[0].appendChild(tr);
    }
  } catch (error) {
    console.log(error);
  }
};

logoutBtn.addEventListener('click', function () {
    window.localStorage.removeItem('freddyRefreshToken');
    window.localStorage.removeItem('freddyAccessToken');
    window.history.replaceState({login:'/index.html'},'','/index.html');
    window.location.reload();
})
