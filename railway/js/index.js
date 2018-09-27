var map = null; // 地图容器

// 底图
var mapLayer = null;
var mapAnnotation = null;
var sateLiteLayer = null;
var sateLiteAnnotation = null;
var terrainLayer = null;
var terrainAnnotation = null;

// baseMap控件
var mapGroup = null;
var sateLiteGroup = null;
var terrainGroup = null;

// 铁路
var railway_jg = null;  // 京广铁路线
var railway_hy = null;  // 汉宜铁路线
var railway_hw = null;  // 合武铁路线
var railway_yw = null;  // 宜万铁路线

// 里程
var mileStone_jg = null;  // 京广铁路线
var mileStone_hy = null;  // 汉宜铁路线
var mileStone_hw = null;  // 合武铁路线
var mileStone_yw = null;  // 宜万铁路线

// overlay控件
var jg_group = null;
var hy_group = null;
var hw_group = null;
var yw_group = null;

// 车站
var station_jg = null;
var station_hy = null;
var station_hw = null;
var station_yw = null;

// 隐患锚点
var trouble_jg = null;
var trouble_hy = null;
var trouble_hw = null;
var trouble_yw = null;

initMap();

addRailway();

addAssistPoint();

addTroubleEvent();

addControl();









