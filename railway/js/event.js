/**
 * 添加隐患锚点
 */

var troubleEventLayers = L.featureGroup();

function addTrobuleEvent() {

    function addTroubleMarker(troubles) {
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
    }

    // 京广铁路沿线锚点
    addTroubleMarker(DATA_TROUBLES_GJ);
}