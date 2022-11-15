var switchButton = document.querySelector('.switch');
var logoutBtn = document.querySelector('.logout-button');
var switchState = 'week';
var reqData;

var headers = new Headers();

const refreshToken = async() => {
    const credentials = { username: 'freddy', password: 'ElmStreet2019' }
    try {
        headers.delete('Authrization');
        headers.append("Authorization",
        "Bearer " + window.localStorage.getItem("freddyRefreshToken"));
        var response = await fetch(`https://freddy.codesubmit.io/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: headers,
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
}

switchButton.addEventListener('click', function () {
    if (switchState === 'month') {
        switchState = 'week';
        switchButton.innerHTML = 'Weekly Revenue';
        
        var chart = document
        .getElementsByClassName("weekly-sales-row")[0]
        while (chart.children.length > 1) {
            chart.removeChild(chart.lastChild)
        }

        var weeklySales = reqData.dashboard.sales_over_time_week;
        console.log(weeklySales);
        for(const key in weeklySales) {
            
            console.log(weeklySales[key].total/1000)
            
            var td = document.createElement("td");
            var div = td.appendChild(document.createElement('div'));
            
            div.style.height = `${weeklySales[key].total/1000}px`;
            div.style.width = '30px';
            div.style.backgroundColor = 'red';
            
            document
            .getElementsByClassName("weekly-sales-row")[0].appendChild(td);
        };
        console.log(switchState)
    } else {
        switchState = 'month';        
        console.log(switchState)
        switchButton.innerHTML = 'Monthly Revenue';

        var chart = document
            .getElementsByClassName("weekly-sales-row")[0]
        while (chart.children.length > 1) {
            chart.removeChild(chart.lastChild)
        }

        var weeklySales = reqData.dashboard.sales_over_time_year;
        console.log(weeklySales);
        for(const key in weeklySales) {

            console.log(weeklySales[key].total/100000)
            
            var td = document.createElement("td");
            var div = td.appendChild(document.createElement('div'));
            
            div.style.height = `${weeklySales[key].total/100000}px`;
            div.style.width = `30px`;
            div.style.backgroundColor = `orange`;
            
            document
            .getElementsByClassName("weekly-sales-row")[0].appendChild(td);
        };
    }
})

const dashboard = async () => {

  headers.append(
    "Authorization",
    "Bearer " + window.localStorage.getItem("freddyAccessToken")
  );
  try {
    var response = await fetch(`https://freddy.codesubmit.io/dashboard`, {
      method: "GET",
      headers: headers,
    });
    var data = await response.json();
    reqData = data;
    var bestSellers = data.dashboard.bestsellers;
    console.log(data.dashboard);
    bestSellers.forEach((element) => {
        
        var tr = document.createElement("tr");
        var td1 = tr.appendChild(document.createElement('td'));
        var td2 = tr.appendChild(document.createElement('td'));
        var td3 = tr.appendChild(document.createElement('td'));
        var td4 = tr.appendChild(document.createElement('td'));
        
        td1.innerHTML = element.product.name.length > 15 ? element.product.name.slice(0,15)+'...':element.product.name;
        td2.innerHTML = '';
        td3.innerHTML = element.units;
        td4.innerHTML = element.revenue;
        
        document
          .getElementsByClassName("bs-table")[0].appendChild(tr);
    });
    
    var weeklySales = data.dashboard.sales_over_time_week;
    console.log(weeklySales);
    for(const key in weeklySales) {

        console.log(weeklySales[key].total/1000)
        
        var td = document.createElement("td");
        var div = td.appendChild(document.createElement('div'));
        
        div.style.height = `${weeklySales[key].total/1000}px`;
        div.style.width = `30px`;
        div.style.backgroundColor = `red`;
        
        document
          .getElementsByClassName("weekly-sales-row")[0].appendChild(td);
    };
  } catch (error) {
    console.log(error);
  }
  setTimeout(()=>{
    refreshToken();
  },75000)
};

logoutBtn.addEventListener('click', function () {
    window.history.replaceState({login:'/index.html'},'','/index.html');
    window.location.reload();
})