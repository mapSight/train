function initMap() {
    mapLayer = L.tileLayer('http://t{s}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}', {subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']});
    mapAnnotation = L.tileLayer('http://t{s}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}', {subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']});
    sateLiteLayer = L.tileLayer('http://t{s}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}', {subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']});
    sateLiteAnnotation = L.tileLayer('http://t{s}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}', {subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']});
    terrainLayer = L.tileLayer('http://t{s}.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}', {subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']});
    terrainAnnotation = L.tileLayer('http://t{s}.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}', {subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']});

    mapGroup = L.layerGroup([mapLayer, mapAnnotation]);
    sateLiteGroup = L.layerGroup([sateLiteLayer, sateLiteAnnotation]);
    terrainGroup = L.layerGroup([terrainLayer, terrainAnnotation]);

    map = L.map('map', {
        center: [30.60968830483705, 114.41888988018037],
        zoom: 9,
        layers: [sateLiteGroup]
    });

    // 动态更新
    map.on("zoomend", function () {
        if (map.getZoom() > 14) {
            $(".kmDiv").show();
            $(".kmDiv").css("font-size", "35px");
        } else if (map.getZoom() > 11) {
            $(".kmDiv").show();
            $(".kmDiv").css("font-size", "22px");
        } else if (map.getZoom() == 11) {
            $(".kmDiv").show();
            $(".kmDiv").css("font-size", "8px");
        } else if (map.getZoom() < 11) {
            $(".kmDiv").hide();
        }
    });
}