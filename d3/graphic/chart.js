;(function(){

    function drawLineChart(data){

        var svg = d3.select("svg"),
            margin = {top: 100, right: 20, bottom: 30, left: 50},
            width = +window.innerWidth - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var color_hash = {
            0 : ["Invite","#1f77b4"],
            1 : ["Accept","#2ca02c"],
            2 : ["Decline","#ff7f0e"]
        };

        var x = d3.scaleTime()
            .domain(data.timeExtent)//定义域
            .rangeRound([0, width]);//值域

        g.append("g")//添加X轴
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        var y = d3.scaleLinear()
            .domain([0, d3.max(data.closeExtent)])
            .rangeRound([height, 0]);

        var yAxis=d3.axisLeft(y)
            .tickSizeInner(0)
            .tickSizeOuter(0)
            .tickPadding(5)
            .tickFormat(function(d){
                return d/1000 + "k";
            })

        g.append("g")//添加y轴
            .attr("class", "axis axis-y-left")
            .call(yAxis);

        g.selectAll('.axis-y-left .tick')// 画背景线
            .append('line')
            .attr('class', 'bg-line')
            .attr('stroke', '#dddddd')
            .attr('shape-rendering', 'crispEdges')
            .attr('x2', width-1).attr('transform','translate(1,0)');

        g.select('.axis-y-left .bg-line:last-of-type').remove();

        /*g.append("g")//添加右侧y轴
         .attr("class", "axis axis-y-right")
         .attr("transform","translate("+width+",0)")
         .call(d3.axisRight(y));*/

        var line = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });

        var area = d3.area()
            .x(function(d) { return x(d.date); })
            .y1(function(d) { return y(d.close); });
        // x表示数据在横坐标的位置
        // y0可以认为是总高度
        // y1表示数据在纵坐标的高度
        area.y0(y(0));

        var DURATION = 1500;
        var DELAY    = 0;

        data["data"].forEach(function(value,i){
            var startData = value['hist'].map( function( datum ) {
                return {
                    date  : datum.date,
                    close : 0
                };
            } );

            g.append("path")//画渐变区块
                .datum(startData)
                .attr("fill", "url(#BackgroundArea-"+color_hash[i][0]+")")
                .attr("d", area)
                .on('click',function(event){
                    console.log(event);
                })
                .transition()
                .duration( DURATION )
                .attrTween( 'd', tween( value['hist'], area ) );

            g.append("path")//画走势图曲线
                .datum(startData)
                .attr("fill", "none")
                .attr("stroke", color_hash[i][1])
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1)
                .attr("stroke-dasharray","5,2")
                .attr("d", line)
                .transition()
                .duration( DURATION )
                .delay( DELAY )
                .attrTween( 'd', tween( value['hist'], line ) );

            var legend=svg.append('g')
                .attr("class", "legend")
                .attr("transform","translate(0," + (i * 25 + 10) + ")");

            legend.append("rect")
                .attr("x",25)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill",color_hash[i][1]);

            legend.append("text")
                .attr("x", 55)
                .attr("y", 9)
                .attr("dy", ".35em")
                .text(value['name']);
        });
        return;





        //添加左上角介绍
        /*var legend = svg.selectAll(".legend")
            .data(["Bitcoin"])
            .enter().append("g")//


        legend.append("rect")
            .attr("x",25)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill",function(currentValue,index){
                return color_hash[index][1];
            });

        legend.append("text")
            .attr("x", 55)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text(function(d) { return d; });*/

    }

    function tween( b, callback ) {
        return function( a ) {
            var i = d3.interpolateArray( a, b );

            return function( t ) {
                return callback( i ( t ) );
            };
        };
    }

    drawLineChart(xData);
}());