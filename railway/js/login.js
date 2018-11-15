var invalidDate = new Date(2018, 10, 30, 23, 59, 59);
if (new Date() >= invalidDate) {
    window.alert("试用期已到期");
}else{
    $("button").removeClass("disabled").removeAttr("disabled");
}

function submit() {
    var username = $("#username").val();
    var password = $("#password").val();
    if (username == "whgt" && password == "123456") {
        window.location = "./main.html";
    } else {
        alert("用户名或者密码错误");
    }
}