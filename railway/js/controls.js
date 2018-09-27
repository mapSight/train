function addControl() {
    // 加载控件
    jg_group = L.layerGroup([railway_jg, mileStone_jg]);
    hy_group = L.layerGroup([railway_hy, mileStone_hy]);
    hw_group = L.layerGroup([railway_hw, mileStone_hw]);
    yw_group = L.layerGroup([railway_yw, mileStone_yw]);

    jg_group.addTo(map); // 默认添加京广线
    stationLayer.addTo(map);

    var baseLayers = {
        "地图": mapGroup,
        "卫星": sateLiteGroup,
        "地形": terrainGroup
    };
    var overlays = {
        "车站": stationLayer,
        "京广铁路": jg_group,
        "汉宜铁路": hy_group,
        "合武铁路": hw_group,
        "宜万铁路": yw_group,
        "隐患锚点": troubleEventLayers,
        "其他信息": assistMarkersLayer
    };
    L.control.layers(baseLayers, overlays).addTo(map);
}