function addRailway() {

    /**
     * ********************************************************************加载铁路线
     */
    // 高铁铁路样式
    var high_way_style = {
        "paused": true,   　　//暂停  初始化状态
        "dashArray": [10, 20],　//间隔样式
        "weight": 3,　　　　//线宽
        "lineCap": "square",
        "opacity": 1,　　//透明度
        "color": "#3e3e3e",　//颜色
        "pulseColor": "#FFFFFF"　　//块颜色
    };

    // 城际铁路样式
    var city_way_style = {
        "paused": true,   　　//暂停  初始化状态
        "dashArray": [10, 20],　//间隔样式
        "weight": 3,　　　　//线宽
        "lineCap": "square",
        "opacity": 1,　　//透明度
        "color": "#d99691",　//颜色
        "pulseColor": "#FFFFFF"　　//块颜色
    };

    // 京广铁路线
    railway_jg = L.polyline.antPath(DATA_RAILWAY_JG, high_way_style);

    // 汉宜铁路线
    railway_hy = L.polyline.antPath(DATA_RAILWAY_HY, high_way_style);

    // 合武铁路线
    railway_hw = L.polyline.antPath(DATA_RAILWAY_HW, high_way_style);

    // 宜万铁路线
    railway_yw = L.polyline.antPath(DATA_RAILWAY_YW, high_way_style);

    // 武九客专线
    railway_wj = L.polyline.antPath(DATA_RAILWAY_WJ, city_way_style);

    // 武冈城际线
    railway_wg = L.polyline.antPath(DATA_RAILWAY_WG, city_way_style);

    // 武孝城际线
    railway_wx = L.polyline.antPath(DATA_RAILWAY_WX, city_way_style);

    // 武咸城际线
    railway_wxx = L.polyline.antPath(DATA_RAILWAY_WXX, city_way_style);

    /**
     ************************************************************加载里程
     */
    function addMileMarker(mileData) {
        var markerGroup = L.featureGroup();
        for (var i = 0; i < mileData.length; i++) {
            var mileStone = mileData[i];
            L.marker([parseFloat(mileStone.lat), parseFloat(mileStone.lon)], {
                icon: L.divIcon({
                    html: "<div class='kmDiv'>K" + (parseFloat(mileStone.mile)).toFixed(0) + "</div>",
                    iconAnchor: L.point(-20, 0)
                })
            }).addTo(markerGroup);
        }
        return markerGroup;
    }

    // 京广铁路里程
    mileStone_jg = addMileMarker(DATA_MILESTONE_JG);

    // 汉宜铁路里程
    mileStone_hy = addMileMarker(DATA_MILESTONE_HY);

    // 合武铁路里程
    mileStone_hw = addMileMarker(DATA_MILESTONE_HW);

    // 宜万铁路里程
    mileStone_yw = addMileMarker(DATA_MILESTONE_YW);

    // 武九客专里程
    mileStone_wj = addMileMarker(DATA_MILESTONE_WJ);

    // 武冈城际里程
    mileStone_wg = addMileMarker(DATA_MILESTONE_WG);

    // 武孝城际里程
    mileStone_wx = addMileMarker(DATA_MILESTONE_WX);

    // 武咸城际里程
    mileStone_wxx = addMileMarker(DATA_MILESTONE_WXX);

    /**
     * ***************************************************添加高铁车站
     */
    function addStationMarker(stations) {
        var stationLayer = L.featureGroup();
        for (var i = 0; i < stations.length; i++) {
            var s = stations[i];
            L.marker([s.lat, s.lng], {
                icon: L.icon({
                    iconUrl: 'image/station.png',
                    iconSize: [18, 18]
                }),
                title: s.name
            }).addTo(stationLayer);
        }
        return stationLayer;
    }

    // 京广铁路车站
    station_jg = addStationMarker(DATA_STATIONS_JG);

    // 汉宜铁路车站
    station_hy = addStationMarker(DATA_STATIONS_HY);

    // 合武铁路车站
    station_hw = addStationMarker(DATA_STATIONS_HW);

    // 宜万铁路车站
    station_yw = addStationMarker(DATA_STATIONS_YW);
}