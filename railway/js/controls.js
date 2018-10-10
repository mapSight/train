function addControl() {
    // 加载控件
    jg_group = L.layerGroup([railway_jg, mileStone_jg, station_jg, trouble_jg]);
    hy_group = L.layerGroup([railway_hy, mileStone_hy, station_hy, trouble_hy]);
    hw_group = L.layerGroup([railway_hw, mileStone_hw, station_hw, trouble_hw]);
    yw_group = L.layerGroup([railway_yw, mileStone_yw, station_yw, trouble_yw]);
    wj_group = L.layerGroup([railway_wj, mileStone_wj]);
    wg_group = L.layerGroup([railway_wg, mileStone_wg]);
    wx_group = L.layerGroup([railway_wx, mileStone_wx]);
    wxx_group = L.layerGroup([railway_wxx, mileStone_wxx]);

    jg_group.addTo(map); // 默认添加京广线

    var baseLayers = {
        "地图": mapGroup,
        "卫星": sateLiteGroup,
        "地形": terrainGroup
    };
    var overlays = {
        "京广高铁": jg_group,
        "汉宜高铁": hy_group,
        "合武高铁": hw_group,
        "宜万高铁": yw_group,
        "武九客专": wj_group,
        "武冈城际": wg_group,
        "武孝城际": wx_group,
        "武咸城际": wxx_group,
        "其他信息": assistMarkersLayer
    };
    L.control.layers(baseLayers, overlays).addTo(map);
}