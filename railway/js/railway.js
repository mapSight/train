function addRailway() {

    /**
     * ********************************************************************加载铁路线
     */
    // 高铁铁路样式
    var high_way_style = {
        "paused": true,   　　//暂停  初始化状态
        "dashArray": [10, 20],　//间隔样式
        "weight": 5,　　　　//线宽
        "lineCap": "square",
        "opacity": 1,　　//透明度
        "color": "#da251c",　//颜色
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
    mileStone_jg = addMileMarker(DATA_MILESTONE_JG, "kmDiv_jg");

    // 汉宜铁路里程
    mileStone_hy = addMileMarker(DATA_MILESTONE_HY, "kmDiv_hy");

    // 合武铁路里程
    mileStone_hw = addMileMarker(DATA_MILESTONE_HW, "kmDiv_hw");

    // 宜万铁路里程
    mileStone_yw = addMileMarker(DATA_MILESTONE_YW, "kmDiv_yw");

    /**
     * ***************************************************添加高铁车站
     */
    stationLayer = L.featureGroup();
    function addStationMarker(stations) {
        for (var i = 0; i < stations.length; i++) {
            var s = stations[i];
            L.marker([s.lat, s.lng], {
                icon: L.icon({
                    iconUrl: 'image/station.png',
                    iconSize: [24, 24]
                }),
                title: s.name
            }).addTo(stationLayer);
        }
    }

    // 京广铁路车站
    addStationMarker(DATA_STATIONS_JG);
}