var map = null; // 地图容器

// 底图
var mapLayer = null;
var mapAnnotation = null;
var sateLiteLayer = null;
var sateLiteAnnotation = null;
var terrainLayer = null;
var terrainAnnotation = null;

// baseMap控件
var mapGroup = null;
var sateLiteGroup = null;
var terrainGroup = null;

// 铁路
var railway_jg = null;  // 京广铁路线
var railway_hy = null;  // 汉宜铁路线
var railway_hw = null;  // 合武铁路线
var railway_yw = null;  // 宜万铁路线
var railway_wj = null;  // 武九客专线
var railway_wg = null;  // 武冈城际线
var railway_wx = null;  // 武孝城际线
var railway_wxx = null; // 武咸城际线

// 里程
var mileStone_jg = null;  // 京广铁路线
var mileStone_hy = null;  // 汉宜铁路线
var mileStone_hw = null;  // 合武铁路线
var mileStone_yw = null;  // 宜万铁路线
var mileStone_wj = null;  // 武九客专线
var mileStone_wg = null;  // 武冈城际线
var mileStone_wx = null;  // 武孝城际线
var mileStone_wxx = null; // 武咸城际线

// overlay控件
var jg_group = null;
var hy_group = null;
var hw_group = null;
var yw_group = null;
var wj_group = null;
var wg_group = null;
var wx_group = null;
var wxx_group = null;

// 车站
var station_jg = null;
var station_hy = null;
var station_hw = null;
var station_yw = null;

// 隐患锚点
var trouble_jg = null;
var trouble_hy = null;
var trouble_hw = null;
var trouble_yw = null;

initMap();

addRailway();

addAssistPoint();

addTroubleEvent();

addControl();

// 搜索
$("#searchBtn").on("click", function () {
    var type = $("#railway_type").val();
    var numberL = parseFloat($("#numberL").val()).toFixed(0); // 里程
    var numberR = parseFloat($("#numberR").val()).toFixed(0); // 小里程

    var data_sourece = null;
    if (type == "jg") {
        data_sourece = DATA_MILESTONE_JG;
    } else if (type == "hy") {
        data_sourece = DATA_MILESTONE_HY;
    } else if (type == "hw") {
        data_sourece = DATA_MILESTONE_HW;
    } else if (type == "yw") {
        data_sourece = DATA_MILESTONE_YW;
    } else if (type == "wj") {
        data_sourece = DATA_MILESTONE_WJ;
    } else if (type == "wg") {
        data_sourece = DATA_MILESTONE_WG;
    } else if (type == "wx") {
        data_sourece = DATA_MILESTONE_WX;
    } else if (type == "wxx") {
        data_sourece = DATA_MILESTONE_WXX;
    }

    for (var i = 0; i < data_sourece.length; i++) {
        var mile = parseFloat(data_sourece[i].mile).toFixed(0);
        var lat = parseFloat(data_sourece[i].lat);
        var lon = parseFloat(data_sourece[i].lon);
        if (mile == numberL) {
            if (numberR == "NaN" || i == data_sourece.length - 1) {
                map.flyTo([lat, lon], map.getMaxZoom() - 1);
            } else {
                var latNext = parseFloat(data_sourece[i + 1].lat);
                var lonNext = parseFloat(data_sourece[i + 1].lon);
                map.fitBounds([
                    [lat, lon],
                    [latNext, lonNext]
                ], {padding: L.point(50, 50), maxZoom: map.getMaxZoom() - 1});
            }
            return false;
        }
    }
});

// 铁路天气
$("#weatherControl").on("click", function () {
    if ($(this).prop("checked")) {
        radar_module.addRadar($("#radar_time"));
        radar_module.addRainStation($(".report"));
        radar_module.showPanel($(".legend"));
        $("#radar_time").show();
        $("#btnGroup").show();
        $("#showWuhan").show();
    } else {
        radar_module.removeRadar();
        radar_module.removeRainStation();
        radar_module.hidePanel();
        $("#radar_time").hide();
        $("#btnGroup").hide();
        $("#showWuhan").hide();
    }
});

$("#btn_play").on("click", function () {
    if ($(this).attr("title") == "播放") {
        radar_module.play();
        $(this).attr("title", "停止");
        $(this).find("span").removeClass("glyphicon-play").addClass("glyphicon-pause");
    } else {
        radar_module.stop();
        $(this).attr("title", "播放");
        $(this).find("span").removeClass("glyphicon-pause").addClass("glyphicon-play");
    }
});

$("#radar_time").on("change", function () {
    var t = $(this).val();
    radar_module.showSingle(t);
});

$("#btn_previous").on("click", function () {
    var v = $("#radar_time option:selected").next().val();
    if (v){
        $("#radar_time").val(v);
        radar_module.showSingle(v);
    }
});

$("#btn_next").on("click", function () {
    var v = $("#radar_time option:selected").prev().val();
    if (v){
        $("#radar_time").val(v);
        radar_module.showSingle(v);
    }
});

$("#showWuhan").on("click", function () {
    radar_module.showExtent();
});

function login() {
    $.ajax({
        type: "POST",
        cache: false,
        async: false,
        //url: "ashx/CheckLogin.ashx?Ran=" + Math.random(),
        url: "http://shrain.cn:8888/ashx/CheckLogin.ashx",
        data: {
            userName: "whj",
            userPwd: "1"
        },
        beforeSend: function() {},
        success: function(result) {
            alert(result);
            switch (result) {
                case "0":
                    document.location.href = "./RealRain/index.aspx";
                    break;
                case "1":
                    $("#message").text("用户不存在！");
                    $("#uname").focus();
                    break;
                case "2":
                    $("#message").text("用户密码错误！");
                    $("#upwd").focus();
                    break;
                default:

                    $("#message").text("连接数据库错误！");
                    $("#upwd").focus();
                    break;
            }
        },
        complete: function() {},
        error: function(err) {
            $("#message").text(err);
        }
    });
}












