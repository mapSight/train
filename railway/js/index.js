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










