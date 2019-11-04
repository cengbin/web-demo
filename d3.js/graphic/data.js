var xData={
    "data":[
        {
            "hist": [
                {"date":"00-31-01",close:1906.9},
                {"date":"01-00-01",close:2850.1},
                {"date":"01-59-59",close:3850.1},
                {"date":"02-30-01",close:4780.3},
                {"date":"03-00-01",close:5685.6},
                {"date":"04-00-01",close:6608},
                {"date":"05-00-01",close:6522.9},
                {"date":"06-00-01",close:6450.8},
                {"date":"07-00-01",close:6480},
                {"date":"08-00-01",close:6451.1},
                {"date":"09-00-01",close:7979},
                {"date":"10-00-01",close:7997},
                {"date":"11-00-01",close:8002.1},
                {"date":"12-00-01",close:7900.2},
                {"date":"13-00-01",close:7986.2},
                {"date":"14-00-01",close:7950},
                {"date":"15-00-01",close:7843.4},
                {"date":"16-00-01",close:7994.14},
                {"date":"17-00-01",close:7913.1},
                {"date":"18-00-01",close:7832.1},
                {"date":"19-00-01",close:7800.1},
                {"date":"20-00-01",close:7971.7},
                {"date":"21-00-01",close:8009},
                {"date":"22-00-01",close:7972.5},
                {"date":"23-59-59",close:7923.86},
            ],
            "name": "Bitcoin",
            "percent_change_24h": -20.43,
            "price_usd": 6471.19
        },
        {
            "hist": [
                {"date":"00-31-01",close:121.9},
                {"date":"01-00-01",close:223.34},
                {"date":"01-59-59",close:322.76},
                {"date":"02-30-01",close:415.5},
                {"date":"03-00-01",close:818.35},
                {"date":"04-00-01",close:817.2},
                {"date":"05-00-01",close:805.11},
                {"date":"06-00-01",close:816.11},
                {"date":"07-00-01",close:509.73},
                {"date":"08-00-01",close:799.66},
                {"date":"09-00-01",close:796.46},
                {"date":"10-00-01",close:811.6},
                {"date":"11-00-01",close:819},
                {"date":"12-00-01",close:814.48},
                {"date":"13-00-01",close:912.1},
                {"date":"14-00-01",close:1811.81},
                {"date":"15-00-01",close:1807.87},
                {"date":"16-00-01",close:1802.64},
                {"date":"17-00-01",close:2808.5},
                {"date":"18-00-01",close:3802.01},
                {"date":"19-00-01",close:3795.1},
                {"date":"20-00-01",close:4787.67},
                {"date":"21-00-01",close:5778.76},
                {"date":"22-00-01",close:6781.22},
                {"date":"23-59-59",close:5816},
            ],
            "name": "Ethereum",
            "percent_change_24h": -22.29,
            "price_usd": 642.497
        }
    ],
    'timeExtent':[],
    'closeExtent':[]
}

;(function(){
    var parseTime = d3.timeParse("%H-%M-%S");

    xData['data'].forEach(function(value,i){
        value['hist']=value['hist'].map(function(d){
            d.date = parseTime(d.date);
            d.close = +d.close;
            return d;
        });

        value['timeExtent']=d3.extent(value['hist'],function(d){return d.date;});
        value['closeExtent']=d3.extent(value['hist'],function(d){return d.close;});

        xData['timeExtent'].push(value['timeExtent'][0],value['timeExtent'][1]);
        xData['closeExtent'].push(value['closeExtent'][0],value['closeExtent'][1]);
    });
    xData['timeExtent']=d3.extent(xData['timeExtent']);
    xData['closeExtent']=d3.extent(xData['closeExtent']);
}());