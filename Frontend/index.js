


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { collection, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyBccoUXQsdcAdSXN8WBCJtvjw9X3rTvWXk",
    authDomain: "thethirdeye-007.firebaseapp.com",
    projectId: "thethirdeye-007",
    storageBucket: "thethirdeye-007.appspot.com",
    messagingSenderId: "109107275467",
    appId: "1:109107275467:web:58c270d1d8ea4510421d4e",
    measurementId: "G-7CCCEGGPWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initiliaize firestore
const database = getFirestore(app);

var lat1 = [];
var long1 = [];
var age=[];
var alldoc = await getDocs(collection(database, "cases"));
alldoc.forEach((doc) => {
    console.log(doc.id);
    console.log(doc.data().loc._lat);
    lat1.push(doc.data().loc._lat);
    long1.push(doc.data().loc._long);
    age.push(doc.data().agegroup)


});
age.forEach((val)=>console.log(val));

//
//
//map plottting//
var data = [{
    type: 'scattermapbox',
    lat: lat1,
    lon: long1,
    mode: 'markers',
    marker: {
        color: "red",
        size: 14
    },
    //text: ['Montreal']
}]

var layout = {
    title:"Victim Hotspot",
    autosize: false,
    font:{
        size:25,
        color:"black"
    },
    plot_bgcolor: "grey",
    paper_bgcolor: "grey",
    
    hovermode: 'closest',
    mapbox: {
        bearing: 0,
        center: {
            lat: 12.9716,
            lon: 77.5946
        },
        pitch: 0,
        zoom: 5
    },
     length: 1400,
     width: 600

}

Plotly.setPlotConfig({
    mapboxAccessToken: "pk.eyJ1IjoiY2hldGFuNTA3IiwiYSI6ImNsYXVtZ21vbTA1eHYzdm1weXczZTd0MmEifQ.s23ZgKamcfacmVI0qac7ng"
})
var config = {responsive: true};

Plotly.newPlot('mapbox', data, layout,config);

//map plotting end..........
var eit=0,th=0,fif=0;
age.forEach((val)=>{
    if(val==18)
    eit++
    else if(val==30)
    th++;
    else
    fif++;
})
var age1=[];
age1.push(eit);
age1.push(th);
age1.push(fif);





//pie chart starts.........

var data1 = [{
   
    values: age1,
    labels: ["18-30 YEARS","30-50 YEARS","50 YEARS ABOVE"],
    type: 'pie'
  }];
  
  var layout1 = {
    font:{
        size:25,
        color:"black"
    },
   // background: "red",
    title: 'Age Group',
    height: 500,
    width: 500
    
  };
  var config1 = {responsive: true};
  
  Plotly.newPlot("Pie1", data1, layout1,config1);

  //bar chart starts.........
  var data = [
    {
      x: ['kar', 'Maha', 'UttarPradesh'],
      y: [20, 14, 23],
      type: 'bar'
    }
  ];
  
  Plotly.newPlot('bar', data);



  //line chart starts.........
  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'scatter'
  };
  
  var trace2 = {
    x: [1, 2, 3, 4],
    y: [16, 5, 11, 9],
    type: 'scatter'
  };
  
  var data = [trace1];
  
  Plotly.newPlot('line', data);
  