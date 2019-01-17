//git log --author="githubHuserNameHere"  --pretty=format:\"%ai\", > commits.log
// _data = [ ...paste text from commits.log here... ];
// _data = [
// "2018-12-22 21:50:56 +0000",
// "2018-12-22 20:27:31 +0000",
// "2018-12-22 20:00:45 +0000",
// "2018-12-21 13:00:13 +0000"];

function round(date, duration, method) {
    return moment(Math[method]((+date) / (+duration)) * (+duration)); 
}
var date = moment();
var roundedDate = round(date, moment.duration(30, "minutes"), "ceil");

minutesIncrement = 30;
graphIncrements = 60/minutesIncrement;
times = [];
startTime = moment().hours(0).minutes(0).seconds(0);
for(var i = 0; i < 24; i++){
  for(var j = 0; j < graphIncrements; j++){
      console.log(startTime.toString());
    times.push(startTime.clone());
    startTime.add(minutesIncrement, "minutes")
  }
}

times.map(m=>{return m.toString()});
var mOD = function minutesOfDay(m){
  return m.minutes() + m.hours() * 60;
}
dataset = times.map((momentDate, i)=>{

    let nextMoment = times[i+1] ? times[i+1] : moment(99999999999999);
    let matchCounts = _data.map(str=>moment(str)).filter(commitMomment=>{
        return mOD(commitMomment)>=mOD(momentDate) && mOD(commitMomment)<=mOD(nextMoment)
    });

    return {
        label:`${momentDate.hours()}:${momentDate.minutes()}`,
        val: matchCounts.length
    };
});

console.log(dataset);


$('body').empty();
svgHeight = 1000;
svgWidth = 1800;
d3.select('body').append('svg').attr('width', svgWidth).attr('height', svgHeight);

svg = d3.select('svg')
barPadding = 15;
barWidth = (svgWidth / dataset.length);
barGroups = svg.selectAll("g")
    .data(dataset)
    .enter().append("g");

barGroups
    .append("rect")
    .attr("y", function(d) {
        return 0;//svgHeight - d
    })
    .attr("height", function(d) {
        return d.val * 5;
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
         var translate = [10+(barWidth * i), 20];
         return "translate("+ translate +")";
    });
    
barGroups
    .append("text")
    .attr("transform", function (d, i) {
         var translate = [10+(barWidth * i), 20];
         return "translate("+ translate +")";
    })
    .text(d=>d.label)
    .attr("style", "fill:white");

avgWorkDayStartIndex = 34;
avgWorrkDayEndIndex = dataset.length;

totalCommitsOutside = dataset.slice(0,avgWorkDayStartIndex).reduce((sum, data)=>sum+data.val, 0);
totalCommitsInside = dataset.slice(avgWorkDayStartIndex, avgWorrkDayEndIndex).reduce((sum, data)=>sum+data.val, 0);
