/**
 * 添加隐患锚点
 */

function addTroubleEvent() {

    function addTroubleMarker(troubles) {
        var troubleEventLayers = L.markerClusterGroup({
            showCoverageOnHover: false,
            spiderfyOnMaxZoom: true,
            removeOutsideVisibleBounds: true,
            maxClusterRadius: 40
        });

        for (var i = 0; i < troubles.length; i++) {
            var trouble = troubles[i];

            L.marker([parseFloat(trouble.纬度), parseFloat(trouble.经度)], {
                icon: L.icon({
                    iconUrl: 'image/trouble/' + trouble.安全色 + '.png',
                    iconSize: [32, 32]
                }),
                title: trouble.铁路里程,
                data: trouble
            }).on("click", function (event) {
                var html = "<table class='tipClass' border='1' cellspacing='0' cellpadding='0'>";
                // 整合所有的属性
                var trouble = event.target.options.data;
                for (var key in trouble) {
                    if (key == "纬度" || key == "经度" || key == "安全色") {
                    }
                    else html += "<tr><th>" + key + "</th><td>" + trouble[key] + "</td></tr>";
                }
                html += "</table>";
                $(".popDiv").html(html);
                $(".popDiv").show();
            }).addTo(troubleEventLayers);
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