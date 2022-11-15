var submitButton = document.querySelector(".submit");
var dasboardButton = document.querySelector(".dashboard-tab");
var ordersButton = document.querySelector(".orders-tab");
var logoutButton = document.querySelector(".logout-tab");

pageRoutes = {
  home: "/index.html",
  dashboard: "/Dashboard.html",
  orders: "/Orders.html",
};

// Login Button
submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  var userNameValue = document.getElementById("username").value;
  var passwordValue = document.getElementById("password").value;
  var credentials = { username: userNameValue, password: passwordValue };
  console.log(credentials);
  auth(credentials);
});

// Verification Code
const auth = async (credentials) => {
  try {
    var response = await fetch(`https://freddy.codesubmit.io/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });
    var data = await response.json();
    console.log(data);
    if (data.access_token) {
      window.localStorage.setItem("freddyAccessToken", data.access_token)
      window.localStorage.setItem("freddyRefreshToken", data.refresh_token)
      window.history.pushState({urlpath:'/Dashboard.html'},'','/Dashboard.html');
      window.location.reload();      
    } else{
      console.log(data.msg)
      var errhandler = document.getElementsByClassName('login-error')[0].innerHTML = data.msg;
      var errColor = document.getElementsByClassName('login-error').style.color = 'red' 
      errColor;
      errhandler;
    }
  } catch (error) {
    console.log(error);
  }
};

