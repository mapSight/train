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

    // 添加雨量站点图层
    this.addRainStation = function () {

        rainStationLayer.clearLayers();

        var d1 = {lat: 30.60999302096146, lng: 114.4435501098633};
        var d2 = {lat: 30.57896245918393, lng: 114.41471099853516};
        var d3 = {lat: 30.60423095372707, lng: 114.35806274414064};

        var html = "<div><table><tr><td>站名:</td><td>示例站名1</td></tr><tr><td>雨量:</td><td class='rain'>10.2</td></tr></table></div>";
        L.marker(d1, {icon: L.divIcon({html:html, className:"rainStationIcon"})}).addTo(rainStationLayer);
        L.marker(d2, {icon: L.divIcon({html:html, className:"rainStationIcon"})}).addTo(rainStationLayer);
        L.marker(d3, {icon: L.divIcon({html:html, className:"rainStationIcon"})}).addTo(rainStationLayer);

        rainStationLayer.addTo(map);
    }

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
        if (interval != -1){
            clearInterval(interval);
        }
        var year = t.substring(0, 4);
        var month = t.substring(4, 6);
        var day = t.substring(6, 8);
        var hour = t.substring(8, 10);
        var min =t.substring(10, 12);
        var url = "QR/" + year + "/" + month + "/" + day + "/" + year + month + day + hour + min + ".PNG";
        radarLayer.setUrl(RADAR_PIC_URL + url);
    };

    this.showExtent = function () {
        map.fitBounds(RADAR_WUHAN_EXTENT);
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