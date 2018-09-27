var map = L.map('map', {
    center: [30.60968830483705, 114.41888988018037],
    zoom: 9
});

//控制marker图层加载
var markersLayer =  L.layerGroup();

map.on("click", function (event) {
    $(".divIframe").hide();
    console.log(event.latlng);
});

// 动态更新
map.on("zoomend", function (event) {
    if (map.getZoom() > 14) {
        $(".kmDiv").show();
        $(".kmDiv").css("font-size", "35px");
    } else if (map.getZoom() > 11) {
        if(!map.hasLayer(markersLayer)) map.addLayer(markersLayer);
        $(".kmDiv").show();
        $(".kmDiv").css("font-size", "22px");
    } else if (map.getZoom() == 11) {
        if(!map.hasLayer(markersLayer)) map.addLayer(markersLayer);
        $(".kmDiv").show();
        $(".kmDiv").css("font-size", "8px");
    } else if (map.getZoom() < 11) {
        if(map.hasLayer(markersLayer)) map.removeLayer(markersLayer);
        $(".kmDiv").hide();
    }
});

// 添加osm为底图
L.tileLayer('http://t{s}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}', {subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']}).addTo(map);
L.tileLayer('http://t{s}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}', {subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']}).addTo(map);

// 添加铁路线
L.polyline.antPath(railway, {
    "paused": true,   　　//暂停  初始化状态
    "dashArray": [10, 20],　//间隔样式
    "weight": 5,　　　　//线宽
    "lineCap": "square",
    "opacity": 1,　　//透明度
    "color": "#da251c",　//颜色
    "pulseColor": "#FFFFFF"　　//块颜色
}).addTo(map);

// 添加里程 779
for (var i = 0; i < milistone.length; i++) {
    L.marker([parseFloat(milistone[i].纬度), parseFloat(milistone[i].经度)], {
        icon: L.divIcon({
            html: "<div class='kmDiv'>K" + (parseFloat(milistone[i].里程)).toFixed(0) + "</div>",
            iconAnchor: L.point(-20, 0)
        })
    }).addTo(map);
}

// 添加默认车站
for (var i = 0; i < stations.length; i++) {
    var s = stations[i];
    L.marker([s.lat, s.lng], {
        icon: L.icon({
            iconUrl: 'image/station.png',
            iconSize: [24, 24],
            className: "station"
        }), title: s.name
    }).on("click", function (event) {
        var station = event.target.options.title;
        //***********************************************目前只放驻马店西站的全景***********************
        if (station == "驻马店西站" ||station == "武汉站"  ) {
            $(".modal-title").html(station + " 全景图");
            $(".modal-body #container").css("height", $(window).height() - 200);
            $("#panoramaModal").modal('show');
            setTimeout(function () {
                var pano = new pano2vrPlayer("container");
                var skin = new pano2vrSkin(pano);
                pano.readConfigUrl("data/360/" + station + "/index.xml");
            }, 100)
        }
    }).addTo(map);
}

// 添加特殊车站
var marker1 = L.marker([33.0025272757331, 113.9726507663727], {
    icon: L.icon({
        iconUrl: 'image/station/1.png',
        iconSize: [140, 56],
        iconAnchor: [150, 20]
    })
});
var marker2 = L.marker([33.57483256261765, 113.95955085754396], {
    icon: L.icon({
        iconUrl: 'image/station/2.png',
        iconSize: [95, 56],
        iconAnchor: [115, 20]
    })
});

// 添加派出所
var marker3 = L.marker([32.82385046709784, 113.99242401123048], {
    icon: L.icon({
        iconUrl: 'image/police/1.png',
        iconSize: [278, 60],
        iconAnchor: [-20, 65]
    })
});
var marker4 = L.marker([33.000385796838415, 113.97216796875001], {
    icon: L.icon({
        iconUrl: 'image/police/2.png',
        iconSize: [278, 60],
        iconAnchor: [-20, 65]
    })
});

// 添加大桥
var marker5 =  L.marker([33.012945998478706, 113.97212505340578], {
    icon: L.icon({
        iconUrl: 'image/brige/11.png',
        iconSize: [200, 20],
        iconAnchor: [210, 40]
    })
});
var marker6 =  L.marker([32.98812977912391, 113.97207140922548], {
    icon: L.icon({
        iconUrl: 'image/brige/12.png',
        iconSize: [200, 20],
        iconAnchor: [210, 0]
    })
});

// 添加隧道
var marker7 =  L.marker([32.639230320544, 114.00341033935548], {
    icon: L.icon({
        iconUrl: 'image/tunnel/2.png',
        iconSize: [90, 15],
        iconAnchor: [80, 0]
    })
});
var marker8 = L.marker([32.78085234570831, 113.99156570434572], {
    icon: L.icon({
        iconUrl: 'image/tunnel/1.png',
        iconSize: [90, 15],
        iconAnchor: [80, 0]
    })
});

// 添加隐患点
for(var j = 0; j < troubles.length ; j++){
    var marker = L.marker(troubles[j].coord, {
        icon: L.icon({
            iconUrl: 'image/trouble/'+troubles[j].level+'.png',
            iconSize: [24, 39],
            className: "trouble"
        }),title: troubles[j]
    }).on("click", function (evt) {
        $(".modal-title").html("隐患点一事一档");
        $("#troubleModal").modal('show');
        $(".divIframe").html("<iframe class=\"htmlIframe\" allowfullscreen=\"false\"  src=\"data/trouble/"+evt.target.options.title.name+"/index.html\"></iframe></div>");
        $(".divIframe").show();
    });
    markersLayer.addLayer(marker);
}

markersLayer.addLayer(marker1);
markersLayer.addLayer(marker2);
markersLayer.addLayer(marker3);
markersLayer.addLayer(marker4);
markersLayer.addLayer(marker5);
markersLayer.addLayer(marker6);
markersLayer.addLayer(marker7);
markersLayer.addLayer(marker8);