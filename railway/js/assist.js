/*****************************************************
 * 其他辅助点
 ****************************************************/

// 其他辅助点图层集合
var assistMarkersLayer = L.featureGroup();

/**
 * 添加辅助点
 */
function addAssistPoint() {

    /************************************************************************************************************************************************************
     ***************************************************** 车站 **************************************************************************************************
     ************************************************************************************************************************************************************/

    // 添加驻马店西站车站
    // L.marker([33.0025272757331, 113.9726507663727], {
    //     icon: L.icon({
    //         iconUrl: 'image/station/1.png',
    //         iconSize: [140, 56],
    //         iconAnchor: [150, 20]
    //     })
    // }).addTo(assistMarkersLayer);
    //
    // // 添加漯河西站车站
    // L.marker([33.57483256261765, 113.95955085754396], {
    //     icon: L.icon({
    //         iconUrl: 'image/station/2.png',
    //         iconSize: [95, 56],
    //         iconAnchor: [115, 20]
    //     })
    // }).addTo(assistMarkersLayer);

    function addStationMarker(stations) {
        for (var i = 0; i < stations.length; i++) {
            var s = stations[i];
            L.marker([s.lat, s.lng], {
                icon: L.icon({
                    iconUrl: "image/station/" + s.name + ".png",
                    iconSize: [60, 40],
                    iconAnchor:[30, 54]
                }),
                title: s.name
            }).addTo(assistMarkersLayer);
        }
    }

    // 京广铁路车站
    addStationMarker(DATA_STATIONS_JG);

    // 汉宜铁路车站
    addStationMarker(DATA_STATIONS_HY);

    // 合武铁路车站
    addStationMarker(DATA_STATIONS_HW);

    // 宜万铁路车站
    addStationMarker(DATA_STATIONS_YW);

    /************************************************************************************************************************************************************
     ***************************************************** 派出所 ************************************************************************************************
     ************************************************************************************************************************************************************/

    // 明港东站派出所
    L.marker([32.82385046709784, 113.99242401123048], {
        icon: L.icon({
            iconUrl: 'image/police/1.png',
            iconSize: [278, 60],
            iconAnchor: [-20, 65]
        })
    }).addTo(assistMarkersLayer);

    // 驻马店西站派出所
    L.marker([33.000385796838415, 113.97216796875001], {
        icon: L.icon({
            iconUrl: 'image/police/2.png',
            iconSize: [278, 60],
            iconAnchor: [-20, 65]
        })
    }).addTo(assistMarkersLayer);

    /************************************************************************************************************************************************************
     ***************************************************** 大桥 ************************************************************************************************
     ************************************************************************************************************************************************************/

    // 漯驻特大桥
    L.marker([33.012945998478706, 113.97212505340578], {
        icon: L.icon({
            iconUrl: 'image/brige/1.png',
            iconSize: [200, 20],
            iconAnchor: [210, 40]
        })
    }).addTo(assistMarkersLayer);

    // 驻马店特大桥
    L.marker([32.98812977912391, 113.97207140922548], {
        icon: L.icon({
            iconUrl: 'image/brige/2.png',
            iconSize: [200, 20],
            iconAnchor: [210, 0]
        })
    }).addTo(assistMarkersLayer);

    /************************************************************************************************************************************************************
     ***************************************************** 隧道 ************************************************************************************************
     ************************************************************************************************************************************************************/

    // 上井湾隧道
    L.marker([32.78085234570831, 113.99156570434572], {
        icon: L.icon({
            iconUrl: 'image/tunnel/1.png',
            iconSize: [90, 15],
            iconAnchor: [80, 0]
        })
    }).addTo(assistMarkersLayer);

    // 屈庄隧道
    L.marker([32.639230320544, 114.00341033935548], {
        icon: L.icon({
            iconUrl: 'image/tunnel/2.png',
            iconSize: [90, 15],
            iconAnchor: [80, 0]
        })
    }).addTo(assistMarkersLayer);

}