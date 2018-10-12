/**
 * 雷达
 * @constructor
 */
function RADAR() {

    // 全国范围
    var RADAR_ACHN_EXTENT = L.latLngBounds([12.2023, 73.16895], [54.11485, 134.86816]);

    // 武汉铁路局范围
    var RADAR_WUHAN_EXTENT = L.latLngBounds([27.65, 107.49], [36.13, 118.85]);

    // 全国铁路最新雷达图片序列144张
    // var RADAR_SERVER = "http://qxcp.wis.com.cn/r_qr_wm/ACHN/QR.xml?random=";

    // 雷达图片获取地址
    var RADAR_PIC_URL = "http://qxcp.wis.com.cn/r_qr_wm/ACHN/";

    // 图片url地址集合
    var urls = [];

    // 雷达图层
    var radarLayer = null;

    // 雨量站图层
    var rainStationLayer = L.featureGroup();

    // 动图索引
    var interval = -1;

    // 图例元素
    var legendDom = null;

    // 降雨报告dom
    var reportDom = null;

    /**
     * 显示雷达雨量站的图例
     */
    this.showPanel = function (legend) {
        legendDom = legend;
        $(legendDom).show();
        $(reportDom).show();
    };

    /**
     * 隐藏图例
     */
    this.hidePanel = function () {
        $(legendDom).hide();
        $(reportDom).hide();
    };

    /**
     * 添加雨量站点图层
     */
    this.addRainStation = function (report) {
        reportDom = report;

        rainStationLayer.clearLayers();

        var data = [
            {lat: 30.597434, lng: 114.421620, name: "孝感", h1: 20},
            {lat: 30.538829, lng: 114.450459, name: "武汉北", h1: 16},
            {lat: 30.456923, lng: 114.453721, name: "襄阳南", h1: 12},
            {lat: 30.364284, lng: 114.427542, name: "汉口", h1: 10.5},
            {lat: 30.263404, lng: 114.366130, name: "横店", h1: 0},
            {lat: 30.292052, lng: 114.382181, name: "咸宁", h1: 5.2}
        ];

        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            var className = "";
            if (d.h1 >= 10) {
                className = "rain";
            } else if (d.h1 > 0) {
                className = "rainN";
            }
            var html = "";
            if (className){
                html = "<div><table><tr><td>站名:</td><td>" + d.name + "</td></tr><tr><td>雨量:</td><td class='" + className + "'>" + d.h1 + "</td></tr></table></div>";
            }
            L.marker([d.lat, d.lng], {
                title:d.name,
                icon: L.divIcon({
                    html: html,
                    className: "rainStationIcon"
                })
            }).addTo(rainStationLayer);
        }
        rainStationLayer.addTo(map);


        // 过滤数据生成报表
        var reportData = data.filter(function (item) {
            return item.h1 >= 10;
        });
        // 排序
        reportData.sort(function (a, b) {
           return -(a.h1 - b.h1);
        });
        var html = "";
        for (var i = 0; i < reportData.length; i++){
            var r = reportData[i];
            html += "<tr><td><a onclick='radar_module.zoomStation(\"" + r.lat + "|" + r.lng + "\")'>" + r.name + ":" + r.h1 + "mm</a></td></tr>";
        }

        // 报告格式
        html = "<table class=\"table table-bordered table-striped\"><caption><h5>监测报告：武汉铁路局管辖范围内共249个监测点，小时降雨量超过<b>10mm</b>的监测站共有<b>" + reportData.length + "</b>个，分别为：</h5></caption>" + html + "</table>";

        $(reportDom).empty();
        $(reportDom).html(html);

    };

    this.zoomStation = function (d) {
        var lat = d.split("|")[0];
        var lng = d.split("|")[1];
        map.flyTo([lat, lng], 16);
    };

    /**
     * 移除雨量站
     */
    this.removeRainStation = function () {
        map.removeLayer(rainStationLayer);
    };

    /**
     * 添加雷达图
     */
    this.addRadar = function (dom) {

        urls = this._createURLs();

        var imageUrl = RADAR_PIC_URL + urls[0];
        radarLayer = L.imageOverlay(imageUrl, RADAR_ACHN_EXTENT, {opacity: 0.6}).addTo(map);

        this._insertSelect(dom, urls);
    };

    /**
     * 移除雷达图
     */
    this.removeRadar = function () {
        map.removeLayer(radarLayer);
    };

    /**
     * 播放雷达动图
     */
    this.play = function () {
        var i = urls.length - 1;
        interval = setInterval(function () {
            if (i < 0) {
                i = urls.length - 1;
            }
            radarLayer.setUrl(RADAR_PIC_URL + urls[i--]);
        }, 200);
    };

    /**
     * 停止播放雷达动图
     */
    this.stop = function () {
        clearInterval(interval);
    };

    /**
     * 显示单张
     */
    this.showSingle = function (t) {
        if (interval != -1) {
            clearInterval(interval);
        }
        var year = t.substring(0, 4);
        var month = t.substring(4, 6);
        var day = t.substring(6, 8);
        var hour = t.substring(8, 10);
        var min = t.substring(10, 12);
        var url = "QR/" + year + "/" + month + "/" + day + "/" + year + month + day + hour + min + ".PNG";
        radarLayer.setUrl(RADAR_PIC_URL + url);
    };

    /**
     * 居中武汉铁路局范围
     */
    this.showExtent = function () {
        map.flyToBounds(RADAR_WUHAN_EXTENT);
    };

    /**
     * 构建雷达图片url
     * @returns {*[]}
     * @private
     */
    this._createURLs = function () {
        var arr = [];
        var d = new Date();
        var m = d.getMinutes();
        m = m - m % 6;
        d.setMinutes(m);
        for (var i = 0; i < 146; i++) {
            d.setMinutes(d.getMinutes() - 6);
            arr.push(this._getTimeString(d));
        }
        return arr.slice(1);
    };

    /**
     * 更新页面雷达下拉框时间列表
     * @param dom select对象
     * @param urls
     * @private
     */
    this._insertSelect = function (dom, urls) {
        $(dom).empty();
        for (var i = 0; i < urls.length; i++) {
            var t = urls[i].split(".")[0].split("/");
            t = t[t.length - 1];
            var v = t.substring(0, 4) + "年" + t.substring(4, 6) + "月" + t.substring(6, 8) + "日" + t.substring(8, 10) + "时" + t.substring(10, 12) + "分";
            $(dom).append("<option value=\"" + t + "\">" + v + "</option>");
        }
    };

    /**
     * 根据时间组装url格式
     * @param d
     * @returns {string}
     * @private
     */
    this._getTimeString = function (d) {
        var year = d.getFullYear();
        var month = (d.getMonth() + 1).toString().PadLeft(2, "0");
        var day = d.getDate().toString().PadLeft(2, "0");
        var hour = d.getHours().toString().PadLeft(2, "0");
        var min = d.getMinutes().toString().PadLeft(2, "0");
        return "QR/" + year + "/" + month + "/" + day + "/" + year + month + day + hour + min + ".PNG";
    };

    String.prototype.PadLeft = function (len, charStr) {
        var s = this + '';
        return new Array(len - s.length + 1).join(charStr, '') + s;
    }
}

var radar_module = new RADAR();