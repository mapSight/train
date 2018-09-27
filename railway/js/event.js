/**
 * 添加隐患锚点
 */

function addTroubleEvent() {

    function addTroubleMarker(troubles) {
        var troubleEventLayers = L.featureGroup();

        for (var i = 0; i < troubles.length; i++) {
            var trouble = troubles[i];

            var html = "";

            // 整合所有的属性
            for(var key in trouble){
                html += key + "：" + trouble[key] + "<br>";
            }

            L.marker(trouble.coord, {
                icon: L.icon({
                    iconUrl: 'image/trouble/' + trouble.level + '.png',
                    iconSize: [24, 39],
                    className: "trouble"
                })
            }).bindPopup(html).addTo(troubleEventLayers);
        }
        return troubleEventLayers;
    }

    // 京广铁路沿线锚点
    trouble_jg = addTroubleMarker(DATA_TROUBLES_JG);

    // 汉宜铁路沿线锚点
    trouble_hy = addTroubleMarker(DATA_TROUBLES_HY);

    // 合武铁路沿线锚点
    trouble_hw = addTroubleMarker(DATA_TROUBLES_HW);

    // 宜万铁路沿线锚点
    trouble_yw = addTroubleMarker(DATA_TROUBLES_YW);
}