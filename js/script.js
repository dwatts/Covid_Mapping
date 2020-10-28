    const dojoOptions = {
      dojoConfig: {
        async: true,
        packages: [
          {
            location:
              "https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js",
            name: "Chart",
          },
        ],
      },
    };

    require([
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/SceneLayer",
        "esri/layers/FeatureLayer",  
        "esri/widgets/Legend",
        "esri/widgets/Home",
        "esri/core/watchUtils",
        "esri/widgets/Search",
        "esri/core/promiseUtils",
        "esri/renderers/SimpleRenderer",
        "esri/symbols/PolygonSymbol3D",
        "esri/symbols/ExtrudeSymbol3DLayer",
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js",
        "dojo/domReady!",
      ], function(Map, SceneView, SceneLayer, FeatureLayer, Legend, Home, watchUtils, Search, promiseUtils, SimpleRenderer, PolygonSymbol3D, ExtrudeSymbol3DLayer, Chart) {

        
// Add and Style counties
                 
    const counties = new FeatureLayer({
      url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/Covid_Data_County_Super_Simplified/FeatureServer",
      renderer: renderAug,
      //title: "Map Legend",
      outFields: ["*"],
      visible: true,     
      popupEnabled: true,
      popupTemplate: {
                outFields: ["*"],
                  //title: "{name_e}",
                  content: function (feature) {
                    return setContentInfo(feature.graphic.attributes);
                  },    
              },        
          });
        
        function setContentInfo(results) {
                        
            var ncptFeb = (results.NC_Feb / results.POPESTIM_9) * 1000;
            var ncptMar = (results.NC_Mar / results.POPESTIM_9) * 1000;
            var ncptApr = (results.NC_Apr / results.POPESTIM_9) * 1000;
            var ncptMay = (results.NC_May / results.POPESTIM_9) * 1000;
            var ncptJun = (results.NC_Jun / results.POPESTIM_9) * 1000;
            var ncptJul = (results.NC_Jul / results.POPESTIM_9) * 1000;
            var ncptAug = (results.NC_Aug / results.POPESTIM_9) * 1000;
            var ncptSep = (results.NC_Sep / results.POPESTIM_9) * 1000;
            var ncptOct = (results.NC_Oct / results.POPESTIM_9) * 1000;
            
            var popupElement = document.createElement("div");
            
            popupElement.innerHTML = "<div><table><tbody><tr><td><h1>" + results.CTYNAME + "</h1></td></tr></tbody></table><table class='iconTable'><tbody><tr><td>" + results.STNAME + "</td></tr></tbody></table><h3><b>Length: </b>" + results.CC_Oct + "</h3>"+"<div class='chartDiv'></div></div>";
            
            var canvas = document.createElement("canvas");

            var data = {
              labels: [
                'Feb',
                'Mar',
                'Apr',
                'May',
                'June',
                'July',
                'Aug',
                'Sep',
                'Oct',  
              ],        
              datasets:[
                {
                    label: "Cases per 1000",
                    data: [ncptFeb, ncptMar, ncptApr, ncptMay, ncptJun, ncptJul, ncptAug, ncptSep, ncptOct],
                    //stack: "Stack 0",    
                    backgroundColor: ["rgba(254, 203, 64, 0.7)", "rgba(254, 203, 64, 0.7)", "rgba(254, 203, 64, 0.7)", "rgba(254, 203, 64, 0.7)","rgba(254, 203, 64, 0.7)", "rgba(254, 203, 64, 0.7)", "rgba(254, 203, 64, 0.7)", "rgba(254, 203, 64, 0.7)", "rgba(254, 203, 64, 0.7)"],
                    borderColor: "#404040",
                    borderWidth: .5,
                    hoverBorderWidth: 1
                },
                /*{
                    label: "Cases",
                    data: [results.CC_Feb, results.CC_Mar, results.CC_Apr, results.CC_May, results.CC_Jun, results.CC_Jul, results.CC_Aug, results.CC_Sep, results.CC_Oct],
                    stack: "Stack 0",    
                    backgroundColor: ["rgba(110,1,107,0.8)", "rgba(110,1,107,0.8)", "rgba(110,1,107,0.8)", "rgba(110,1,107,0.8)", "rgba(110,1,107,0.8)", "rgba(110,1,107,0.8)", "rgba(110,1,107,0.8)", "rgba(110,1,107,0.8)", "rgba(110,1,107,0.8)"],
                    borderColor: "#404040",
                    borderWidth: .5,
                    hoverBorderWidth: 1
                }*/
              ],
              };

              var options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        position: "top",
                    },
                    scales: {
                        xAxes: [{
                            //stacked: true
                            ticks: {
                                fontSize: 12,
                                fontColor: "#000"
                            }
                        }],
                        yAxes: [{
                            //stacked: true,
                            ticks: {
                                beginAtZero: true,
                                fontSize: 10,
                                fontColor: "#000"
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {                      
                            label: function(tooltipItem, data) {
                                return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                        },
                        backgroundColor: 'rgba(255,255,255, 0.8)',
                        titleFontFamily: "'Montserrat'",
                        bodyFontFamily: "'Montserrat'",
                        titleFontColor: "#000",
                        bodyFontColor: "#000"
                    },
                    hover: {
                            onHover: function(e) {
                                var point = this.getElementAtEvent(e);
                                if (point.length) e.target.style.cursor = 'pointer';
                                else e.target.style.cursor = 'default';
                            }
                    }
            };
        
            Chart.Legend.prototype.afterFit = function() {
                this.height = this.height + 10;
            };

            Chart.defaults.global.defaultFontFamily="'Montserrat'";
            var mybarChart = new Chart(canvas, {
              type: "line",
              data: data,
              options: options,   
            });

            popupElement.querySelector(".chartDiv").appendChild(canvas);
            
            return popupElement;
            
        };
          
   const baseCounties = new FeatureLayer ({
        url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/Covid_Data_County_Super_Simplified/FeatureServer",   
        renderer: {
             type: "simple",
              symbol: {
                type: "simple-fill", 
                color: [219, 219, 219, 0],
                outline: {
                  color: [0,0,0, 0.5],
                  width: 1,
                  //style: "short-dot"    
                }
            }    
        },
        visible: true,
        popupEnabled: false,
    });
                
    //Add and Style States Feature Layer      
            
      var states = new FeatureLayer({
          url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer",  
          renderer: {
              type: "simple",
              symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [219, 219, 219, 0.1],
                outline: {
                  // makes the outlines of all features consistently light gray
                  color: "#000",
                  width: 1.75,
                  style: "solid"    
                }
              }
            },
              legendEnabled: false,
              //definitionExpression: "NAME <> 'Puerto Rico'",
              labelingInfo: [{
                labelPlacement: "above-center",
                maxScale: 10000000,  
                labelExpressionInfo: {
                  value: "{STATE_NAME}"
                },
                symbol: {
                  type: "label-3d",
                  symbolLayers: [{
                    type: "text",
                    material: {
                      color: "black"
                    },
                    halo: {
                      color: [255, 255, 255, 0.8],
                      size: 2
                    },
                    size: 10
                  }],
                  verticalOffset: {
                    screenLength: 500,
                    maxWorldLength: 70000
                  },
                  callout: {
                    type: "line", 
                    size: 1.5,
                    color: [50, 50, 50],
                    border: {
                      color: [50, 50, 50, 0.7]
                    }
                  }      
                }
              }]
        });
          
        //Add and Style Cities Feature Layer  
          
        var cities = new FeatureLayer({
            url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Major_Cities/FeatureServer/0",
            minScale: 10000000,
            definitionExpression: "POPULATION > 175000",
            legendEnabled: false,
            renderer: {
                type: "simple",
                symbol: {
                type: "simple-marker",
                size: 6,
                color: [0, 0, 0, 0],
                outline: { 
                    width: 0.5,
                    color: [0, 0, 0, 0]
                    }
                }
            },
            labelingInfo: [{
                labelPlacement: "above-center",
                labelExpressionInfo: {
                  value: "{NAME}, {ST}"
                },
                symbol: {
                  type: "label-3d",
                  symbolLayers: [{
                    type: "text",
                    material: {
                      color: "black"
                    },
                    halo: {
                      color: [255, 255, 255, 0.8],
                      size: 2
                    },
                    size: 10
                  }],
                  verticalOffset: {
                    screenLength: 800,
                    maxWorldLength: 100000
                  },
                  callout: {
                    type: "line",
                    size: 1.5,
                    color: [50, 50, 50],
                    border: {
                      color: [50, 50, 50, 0.7]
                    }
                  }      
                }
              }]    
        });
        
             // Set Scene View
        
    var map = new Map({
        layers: [/*baseCD, allCD, baseCounties,*/ counties, /*allStates,*/ cities,  states, /*baseOutLine25km, baseOutLine50km, baseOutLine75km, baseOutLine100km*/] 
    }); 
        
    var view = new SceneView({
      container: "viewDiv",
      map: map,
      viewingMode: "local",
      environment: {
        background:{
            type: "color", 
            color: [255, 255, 255, 1]
        },
        lighting: {
        directShadowsEnabled: true,
        date: new Date("Sun Mar 15 2019 16:00:00 GMT+0100 (CET)")
        },  
        atmosphereEnabled: false,
        starsEnabled: false
      },
      camera: {
        position: {
          latitude: -1.841491,
          longitude: -97.651421,    
          //longitude: -96.651421,
          z: 4700000
        },
        tilt: 45,
        heading: 1
      }
    });
        
                            
        // Add Legend and Home widgets to map; Remove some stock widgets
          
        var legend = new Legend({
          view: view,
          container: "legend"
        })
          
        map.ground.opacity = 0;  
          
        var homeBtn = new Home({
            view: view
        });
          
        view.ui.add(homeBtn, "top-left");
          
        view.ui.remove("navigation-toggle");  
          
        view.ui.remove("compass"); 
        
        watchUtils.whenTrueOnce(view, "updating", function(evt) {
          $("#loading").show();
        });

        watchUtils.whenFalse(view, "updating", function(evt) {
          $("#loading").hide();
        });

        
        /***********************Adding script to power layer buttons**************************/
          
       /*var layerButton1 = document.getElementById("btnCongDist");

        layerButton1.addEventListener("click", function() {
            if (allCD.visible == true) {
                allCD.visible = false;
                baseCD.visible = false;
            } else if (allCD.visible == false) {
                allCD.visible = true;
                baseCD.visible = true;
                allCounties.visible = false;
                baseCounties.visible = false;
                allStates.visible = false;
                $("#countyFilterDiv").removeClass('pressed', 0);
                $("#cdFilterDiv").removeClass('pressed', 0);
                partyFilter.value="1";
                allCD.definitionExpression = "";
                partyLayerView.filter = null;
                partyStateFilter.value="";
                
            }
        }); */ 
          
        var layerButton1 = document.getElementById("btnSept");

        layerButton1.addEventListener("click", function() {
              if (counties.renderer != renderSep) {
                  counties.renderer = renderSep;
              } else {
                  counties.renderer = renderSep;
              }
        });
          
        var layerButton2 = document.getElementById("btnOct");

        layerButton2.addEventListener("click", function() {
              if (counties.renderer != renderOct) {
                  counties.renderer = renderOct;
              } else {
                  counties.renderer = renderOct;
              }
        });
          
        
        /***********************Start Looping Code for Counties***************************/  
          
  /*      // query all features from the wells layer
        view
          .when(function() {
            return allCounties.when(function() {
              var query = allCounties.createQuery();
              return allCounties.queryFeatures(query);
            });
          })
          .then(getValues)
          .then(getUniqueValues)
          .then(addToSelect);

        // return an array of all the values in the
        // STATUS2 field of the wells layer
        function getValues(response) {
          var features = response.features;
          var values = features.map(function(feature) {
            return feature.attributes.State;
          });
          return values;
        }

        // return an array of unique values in the STATUS2 field of the wells layer
        function getUniqueValues(values) {
          var uniqueValues = [];

          values.forEach(function(item, i) {
            if (
              (uniqueValues.length < 1 || uniqueValues.indexOf(item) === -1) &&
              item !== ""
            ) {
              uniqueValues.push(item);
            }
          });
          return uniqueValues;
        }

        function addToSelect(values) {
          values.sort();
          values.forEach(function(value) {
            var option = document.createElement("option");
            option.text = value;
            countyFilter.add(option);
          });
        }
        
*/        

/****************Begin County Filtering Code************************/  

/*          
          
       view.when().then(function() {
          view.whenLayerView(allCounties).then(function(layerView) {
            const filterSelect = document.getElementById("countyFilter");
            // filters the layer using a definitionExpression
            // based on a religion selected by the user
            filterSelect.addEventListener("change", function(event) {
              const newValue = event.target.value;

              const whereClause = newValue
                ? "State = '" + newValue + "'"
                : null;
              layerView.filter = {
                where: whereClause
              };
                
            });
            layerView.goTo(response.extent);  
          });    
        });   
          
*/
        
/******************Begin County Number Filtering Code******************/
 
/*          
          
    $(document).ready(function() {
        
        $('#numProjFilter').on("change", function() {
            if (numProjFilter.value == "1") {
                allCounties.definitionExpression = ""
          } else if (numProjFilter.value == "2") {
                allCounties.definitionExpression = "NUMPOINTS = 0"
          } else if (numProjFilter.value == "3") {
                allCounties.definitionExpression = "NUMPOINTS = 1"
          } else if (numProjFilter.value == "4") {
                allCounties.definitionExpression = "NUMPOINTS >= 2 AND NUMPOINTS <= 5"
          } else if (numProjFilter.value == "5") {
                allCounties.definitionExpression = "NUMPOINTS >= 6 AND NUMPOINTS <= 10"       
          } else if (numProjFilter.value == "6") {
                allCounties.definitionExpression = "NUMPOINTS >= 11 AND NUMPOINTS <= 50"       
          } else if (numProjFilter.value == "7") {
                allCounties.definitionExpression = "NUMPOINTS >= 51 AND NUMPOINTS <= 991"       
          };  
        });
          
    });
          
*/

/******************Begin Political Party Filtering Code*****************/          

/*          
        $(document).ready(function() {
        
        $('#partyFilter').on("change", function() {
            if (partyFilter.value == "1") {
                allCD.definitionExpression = ""
          } else if (partyFilter.value == "2") {
                allCD.definitionExpression = "Party = 'Democrat'"
          } else if (partyFilter.value == "3") {
                allCD.definitionExpression = "Party = 'Republican'"
          } else if (partyFilter.value == "4") {
                allCD.definitionExpression = "Party = 'Vacant'"
          };  
        });
    });
  
*/
          
/***********************Start Looping Code for CD States***************************/  
 /*         
        // query all features from the wells layer
        view
          .when(function() {
            return allCD.when(function() {
              var query = allCD.createQuery();
              return allCD.queryFeatures(query);
            });
          })
          .then(getPartyValues)
          .then(getUniquePartyValues)
          .then(addToPartySelect);

        // return an array of all the values in the
        // STATUS2 field of the wells layer
        function getPartyValues(response) {
          var features = response.features;
          var values = features.map(function(feature) {
            return feature.attributes.g_state;
          });
          return values;
        }

        // return an array of unique values in
        // the STATUS2 field of the wells layer
        function getUniquePartyValues(values) {
          var uniquePartyValues = [];

          values.forEach(function(item, i) {
            if (
              (uniquePartyValues.length < 1 || uniquePartyValues.indexOf(item) === -1) &&
              item !== ""
            ) {
              uniquePartyValues.push(item);
            }
          });
          return uniquePartyValues;
        }

        // Add the unique values to the wells type
        // select element. This will allow the user
        // to filter wells by type.
        function addToPartySelect(values) {
          values.sort();
          values.forEach(function(value) {
            var option = document.createElement("option");
            option.text = value;
            partyStateFilter.add(option);
          });
        }

*/

/****************Begin CD State Filtering Code************************/  
 
/*          
        view.when().then(function() {
          view.whenLayerView(allCD).then(function(layerView) {
            const partyfilterSelect = document.getElementById("partyStateFilter");
            // filters the layer using a definitionExpression
            // based on a religion selected by the user
            partyfilterSelect.addEventListener("change", function(event) {
              const newPartyValue = event.target.value;

              const whereClause = newPartyValue
                ? "g_state = '" + newPartyValue + "'"
                : null;
              partyLayerView.filter = {
                where: whereClause
              };
              // close popup for former cluster that no longer displays
              //view.popup.close();
            });
            partyLayerView = layerView;  
          });
        });
          
      /*  function filterByParty(event) {
          const selectedParty = document.getElementById("partyStateFilter");
          partyLayerView.filter = {
            where: "g_state = '" + selectedParty + "'"
          };
        }  
          
        view.whenLayerView(layer).then(function(layerView) {
          // flash flood warnings layer loaded
          // get a reference to the flood warnings layerview
          partyLayerView = layerView;  
        });  

*/                    
          
});
        
    