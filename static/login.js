$(function () {
    //GetValidateCode();
    //window.setTimeout(GetValidateCode, 200);

    function newGuid() {
        var guid = "";
        for (var i = 1; i <= 32; i++) {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
                guid += "-";
        }
        return guid;
    }
    //registerWords();
    //var path = "/Language/Default/Login/";
    //var lang = (getCookieVal("lang") || "zh");
    //setLanguage(lang, path);
    //document.title = __tr("Login-GPS Cloud Service Platform");
    ////placeholder属性值需要单独处理
    //$("#ManagerName").attr("placeholder", __tr("UserName"));
    //$("#ManagerPsw").attr("placeholder", __tr("Password"));
    //$("#ValidateCode").attr("placeholder", __tr("Verify Code"));
    //GetValidateCode();
    //$("#enBtn").bind("click", function () {

    //    setLanguage("en", path);
    //    document.title = __tr("Login-GPS Cloud Service Platform");
    //    $("#ManagerName").attr("placeholder", __tr("UserName"));
    //    $("#ManagerPsw").attr("placeholder", __tr("Password"));
    //    $("#ValidateCode").attr("placeholder", __tr("Verify Code"));
    //});
    //$("#zhBtn").bind("click", function () {
    //    setLanguage("zh", path);
    //    document.title = __tr("Login-GPS Cloud Service Platform");
    //    $("#ManagerName").attr("placeholder", __tr("UserName"));
    //    $("#ManagerPsw").attr("placeholder", __tr("Password"));
    //    $("#ValidateCode").attr("placeholder", __tr("Verify Code"));
    //});
    //登录
    $("#Login").click(function () {
        $("#req_Message").html("");
        var varmFLoginName = $("#ManagerName").val();
        var varmFPassword = $("#ManagerPsw").val();
        var varValidateCode = $("#ValidateCode").val();
        var isCommon = $("#isCommon").val();
        if (window.location.pathname == "/indexEN.html") {
          
            if (varmFLoginName == "") {
                $("#req_Message").html("Please Enter Username")
                // alert(__tr("Please Enter Username"));
                return;
            }
            if (varmFPassword == "") {
                $("#req_Message").html("Please enter Password")
                //  alert(__tr("Please enter Password"));
                return;
            }
            if (varValidateCode == "") {
                $("#req_Message").html("Please Enter Verify Code");
                //  alert(__tr("Please Enter Verify Code"));
                return;
            }
        } else {
            if (varmFLoginName == "") {
                $("#req_Message").html("请输入用户名")
                // alert(__tr("Please Enter Username"));
                return;
            }
            if (varmFPassword == "") {
                $("#req_Message").html("请输入密码")
                //  alert(__tr("Please enter Password"));
                return;
            }
/*            if (varValidateCode == "") {
                $("#req_Message").html("请输入验证码");
                //  alert(__tr("Please Enter Verify Code"));
                return;
            }*/
        }
        let data={"FAccessGUID":newGuid() ,"FUserName":varmFLoginName,"FPassword":varmFPassword,"FValidateCode":varValidateCode}
        $.post("/login/",data,function(json){
            console.log(json)
            $("#req_Message").html(json)
            if(json=="登录成功"){
                location.href='search_form/'
            }
        })
    });

    $("#ValidateCodeImg").click(function () {
        GetValidateCode();
    });

    $("#RandCode").click(function () {
        GetValidateCode();
    });

    $("#ForgetPassword").click(function () {
        var Email = $("#Email").val();
    });

});

//var IsChangeCode = true;
//function ChangValidateCode() {
//    if (IsChangeCode) {
//        GetValidateCode();
//        IsChangeCode = false;
//    }
//}
//填充验证码图片
function GetValidateCode() {
     $("#ValidateCodeImg").attr("src", "/WebLogin/?time="+new Date());
    // $.get("/WebLogin/",function(data){
    //     console.log(data)
    // })
}

document.onkeydown = function (e) {
    var ev = document.all ? window.event : e;
    if (ev.keyCode == 13) {
        $("#Login").click();
    }
}