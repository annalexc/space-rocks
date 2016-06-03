function getNASAdata(startDate, endDate){
  // var startDate = '2016-06-01';
  // var endDate = '2016-06-08';
  var results;
  var link = apiLinkBase+'feed?start_date=' + startDate + '&end_date=' + endDate + '&api_key=' + apiKey;
  var count = 0;
  
  console.log("GETTING DATA FOR YOU!");
  var getAsteroids = setInterval(function(){
    console.log(count);
    if (count == 36){
      clearInterval(getAsteroids);
    } else {
        getData(link, function(response){
          link = response.links.prev;
          console.log(34,link);
          parseAsteroidData(response, parseOrbitData);
          count++;
        });
    }
  }, 3000);    
};


