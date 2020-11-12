
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
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js",
        "dojo/domReady!",
      ], function(Map, SceneView, SceneLayer, FeatureLayer, Legend, Home, watchUtils, Search, promiseUtils, Chart) {

        
// Add and Style counties
                 
    const counties = new FeatureLayer({
      url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/Covid_Data_County_Super_Simplified/FeatureServer",
      renderer: renderOct,
      //title: "Map Legend",
      outFields: ["*"],
      visible: true,
      definitionExpression: "STATEFP <> 72",    
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
            
            var popEstim = results.POPESTIM_9.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
                        
            var ncptFeb = (results.NC_Feb / results.POPESTIM_9) * 1000;
            var ncptMar = (results.NC_Mar / results.POPESTIM_9) * 1000;
            var ncptApr = (results.NC_Apr / results.POPESTIM_9) * 1000;
            var ncptMay = (results.NC_May / results.POPESTIM_9) * 1000;
            var ncptJun = (results.NC_Jun / results.POPESTIM_9) * 1000;
            var ncptJul = (results.NC_Jul / results.POPESTIM_9) * 1000;
            var ncptAug = (results.NC_Aug / results.POPESTIM_9) * 1000;
            var ncptSep = (results.NC_Sep / results.POPESTIM_9) * 1000;
            var ncptOct = (results.NC_Oct / results.POPESTIM_9) * 1000;
            
            var avgNcpt = (ncptFeb + ncptMar + ncptApr + ncptMay + ncptJun + ncptJul + ncptAug + ncptSep + ncptOct) / 9;
            
            var formAvgNcpt = avgNcpt.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            
            var ndptFeb = (results.CD_Feb / results.POPESTIM_9) * 1000;
            var ndptMar = (results.CD_Mar / results.POPESTIM_9) * 1000;
            var ndptApr = (results.CD_Apr / results.POPESTIM_9) * 1000;
            var ndptMay = (results.CD_May / results.POPESTIM_9) * 1000;
            var ndptJun = (results.CD_Jun / results.POPESTIM_9) * 1000;
            var ndptJul = (results.CD_Jul / results.POPESTIM_9) * 1000;
            var ndptAug = (results.CD_Aug / results.POPESTIM_9) * 1000;
            var ndptSep = (results.CD_Sep / results.POPESTIM_9) * 1000;
            var ndptOct = (results.CD_Oct / results.POPESTIM_9) * 1000;
            
            var avgNdpt = (ndptFeb + ndptMar + ndptApr + ndptMay + ndptJun + ndptJul + ndptAug + ndptSep + ndptOct) / 9;
            
            var formAvgNdpt = avgNdpt.toLocaleString("en", {   
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            
            var ccOct = results.CC_Oct.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            
            var cdOct = results.D_Oct.toLocaleString("en", {   
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
            
            var popupElement = document.createElement("div");
            
            popupElement.innerHTML = "<div><h2>" + results.CTYNAME + ", " + results.STNAME + "</h2><h3><b>Population (2019 Est.): </b>" + popEstim + "</h3><h3><b>Avg. Case Rate per 1000: </b>" + formAvgNcpt + "</h3><h3><b>Avg. Fatality Rate per 1000: </b>" + formAvgNdpt + "</h3><h3><b>Total Number Reported Cases: </b>" + ccOct + "</h3><h3><b>Total Number Reported Deaths: </b>" + cdOct + "</h3><h2>Impact Graphs</h2>"+"</div><div><div id='ud_tab'><input type='radio' name='ud_tabs' id='tab1' checked><label for='tab1'>Cases by Month</label><input type='radio' name='ud_tabs' id='tab2'><label for='tab2'>Deaths by Month</label><input type='radio' name='ud_tabs' id='tab3'><label for='tab3'>Cumulative Cases</label><div id='ud_tab-content1' class='ud_content'><div class='chartone'></div></div><div id='ud_tab-content2' class='ud_content'><div class='charttwo'></div></div><div id='ud_tab-content3' class='ud_content'><div class='chartthree'></div></div></div></div>";
            
            //Chart One Begins
            
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
                    backgroundColor: 'rgba(241, 68, 50,0.5)',
			        borderColor: 'rgba(241, 68, 50, 1)',
                    borderColor: "#404040",
                    borderWidth: .5,
                    hoverBorderWidth: 1
                },
              ],
              };

              var options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        position: "bottom",
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Monthly COVID-19 cases per 1000 residents'
                    },
                    scales: {
                        xAxes: [{
                            //stacked: true
                            ticks: {
                                fontSize: 12,
                                fontColor: "#000",
                            }
                        }],
                        yAxes: [{
                            //stacked: true,
                            ticks: {
                                beginAtZero: true,
                                fontSize: 10,
                                fontColor: "#000",           
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {                      
                            label: function(tooltipItem, data) {
                                return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                        },
                         backgroundColor: 'rgba(253, 202, 181, 0.9)',
                        titleFontFamily: "'Trispace'",
                        bodyFontFamily: "'Trispace'",
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

            Chart.defaults.global.defaultFontFamily="'Trispace'";
            var mybarChart = new Chart(canvas, {
              type: "line",
              data: data,
              options: options,   
            });

            popupElement.querySelector(".chartone").appendChild(canvas);
            
            //Chart Two Begins
            
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
                    label: "Number of Fatalities",
                    data: [results.CD_Feb, results.CD_Mar, results.CD_Apr, results.CD_May, results.CD_Jun, results.CD_Jul, results.CD_Aug, results.CD_Sep, results.CD_Oct],
                    stack: "Stack 0",    
                    backgroundColor: ["rgba(241, 68, 50,0.5)", "rgba(241, 68, 50,0.5)", "rgba(241, 68, 50,0.5)", "rgba(241, 68, 50,0.5)", "rgba(241, 68, 50,0.5)", "rgba(241, 68, 50,0.5)", "rgba(241, 68, 50,0.5)", "rgba(241, 68, 50,0.5)", "rgba(241, 68, 50,0.5)"],
                    borderColor: 'rgba(99, 99, 99, 1)',
                    borderWidth: .5,
                    hoverBorderWidth: .5
                }
              ],
              };

              var options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                        position: "bottom",
                    },
                    title: {
                        display: true,
                        text: 'Number of COVID-19 deaths per month'
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
                                fontColor: "#000",
                                callback: function(value) {
                                    if (!(value%1))
                                    {
                                    return Number(value).toFixed(0);
                                    }
                                }
                            }
                        }]
                    },
                    tooltips: {
                        callbacks: {                      
                            label: function(tooltipItem, data) {
                                return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            },
                        },
                         backgroundColor: 'rgba(253, 202, 181, 0.9)',
                        titleFontFamily: "'Trispace'",
                        bodyFontFamily: "'Trispace'",
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

            Chart.defaults.global.defaultFontFamily="'Trispace'";
            var mybarChart = new Chart(canvas, {
              type: "bar",
              data: data,
              options: options,   
            });

            popupElement.querySelector(".charttwo").appendChild(canvas);
            
            /////Chart Three Begins
            
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
                    label: "Cumulative Cases",
                    data: [results.CC_Feb, results.CC_Mar, results.CC_Apr, results.CC_May, results.CC_Jun, results.CC_Jul, results.CC_Aug, results.CC_Sep, results.CC_Oct],
                    stack: "Stack 0",    
                    backgroundColor: 'rgba(241, 68, 50,0.5)',
			        borderColor: 'rgba(241, 68, 50, 1)',
                    borderColor: "#404040",
                    borderWidth: .5,
                    hoverBorderWidth: 1
                }
              ],
              };

              var options = {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                        position: "bottom",
                    },
                    title: {
                        display: true,
                        text: 'Cumulative Covid-19 cases by month'
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
                        backgroundColor: 'rgba(253, 202, 181, 0.9)',
                        titleFontFamily: "'Trispace'",
                        bodyFontFamily: "'Trispace'",
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

            Chart.defaults.global.defaultFontFamily="'Trispace'";
            var mybarChart = new Chart(canvas, {
              type: "line",
              data: data,
              options: options,   
            });


            popupElement.querySelector(".chartthree").appendChild(canvas); 
            
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
                }
            }    
        },
        visible: true,
        popupEnabled: false,
    });
                
//Add and Style States Feature Layer      
            
      var states = new FeatureLayer({
          url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/US_States/FeatureServer",
          definitionExpression: "STNAME <> 'Puerto Rico'",
          renderer: {
              type: "simple",
              symbol: {
                type: "simple-fill",
                color: [219, 219, 219, 0.1],
                outline: {
                  color: "#000",
                  width: 1.5,
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
                  value: "{STNAME}"
                },
                symbol: {
                  type: "label-3d",
                  symbolLayers: [{
                    type: "text",
                    material: {
                      color: "black"
                    },
                    font: { 
                      family: "Trispace",
                      size: 7,
                      weight: "normal"    
                    },   
                    halo: {
                      color: [255, 255, 255, 0.8],
                      size: 1
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
                    font: { 
                      family: "Trispace",
                      size: 7,
                      weight: "normal"    
                    },   
                    halo: {
                      color: [255, 255, 255, 0.8],
                      size: 1
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
        
        
//Add and Style US Outline Feature Layer      
          
       var baseOutLine25km = new FeatureLayer({
            url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/US_Buffer_25k/FeatureServer",
            minScale: 0,
            maxScale: 0,
            renderer: {
                type: "simple",
                symbol: {
                  type: "polygon-3d", 
                  symbolLayers: [{
                    type: "fill", 
                    material: { color: [138, 138, 138, 0.4] },
                    outline: {
                      color: "transparent"
                    }
                  }]
                }
              },
            legendEnabled: false,
        });
          
        var baseOutLine50km = new FeatureLayer({
            url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/US_Buffer_50k/FeatureServer",
            minScale: 0,
            maxScale: 0,
            renderer: {
                type: "simple",
                symbol: {
                  type: "polygon-3d",
                  symbolLayers: [{
                    type: "fill", 
                    material: { color: [138, 138, 138, 0.3] },
                    outline: {
                      color: "transparent"
                    }
                  }]
                }
              },
            legendEnabled: false,
        });
         
        var baseOutLine75km = new FeatureLayer({
            url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/US_Buffer_75k/FeatureServer",
            minScale: 0,
            maxScale: 0,
            renderer: {
                type: "simple",
                symbol: {
                  type: "polygon-3d",
                  symbolLayers: [{
                    type: "fill", 
                    material: { color: [138, 138, 138, 0.2] },
                    outline: {
                      color: "transparent"
                    }
                  }]
                }
              },
            legendEnabled: false,
        });
          
        var baseOutLine100km = new FeatureLayer({
            url: "https://services5.arcgis.com/CmuSiXApoWtqLYty/arcgis/rest/services/US_Buffer_100k/FeatureServer",
            minScale: 0,
            maxScale: 0,
            renderer: {
                type: "simple",
                symbol: {
                  type: "polygon-3d",
                  symbolLayers: [{
                    type: "fill",
                    material: { color: [138, 138, 138, 0.1] },
                    outline: {
                      color: "transparent"
                    }
                  }]
                }
              },
            legendEnabled: false,
        });  
 
       
        var map = new Map({
            layers: [counties, cities,  states, baseOutLine25km, baseOutLine50km, baseOutLine75km, baseOutLine100km] 
        }); 

        var view = new SceneView({
          container: "viewDiv",
          map: map,
          viewingMode: "local",
          popup: {
                  collapseEnabled: false,
                  dockOptions: {
                      buttonEnabled: false,
                  } 
                },    
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
              z: 4700000
            },
            tilt: 45,
            heading: 1
          }
        });

        view.popup.viewModel.actions = false;    
          
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

        
        /************Adding script to change layers****************/
        
        var $li = $('#covidMonth li').click(function() {
            $li.removeClass('selected');
            $(this).addClass('selected');
            var id = $(this).closest('li').attr('id');
            if(id == 'Feb'){
                counties.renderer = renderFeb;
                $('#currentMonth').text("February 2020");
            }else if(id == 'Mar'){
                counties.renderer = renderMar;
                $('#currentMonth').text("March 2020");
            }else if(id == 'Apr'){
                counties.renderer = renderApr;
                $('#currentMonth').text("April 2020");
            }else if(id == 'May'){
                counties.renderer = renderMay;
                $('#currentMonth').text("May 2020");
            }else if(id == 'Jun'){
                counties.renderer = renderJun;
                $('#currentMonth').text("June 2020");
            }else if(id == 'Jul'){
                counties.renderer = renderJul;
                $('#currentMonth').text("July 2020");
            }else if(id == 'Aug'){
                counties.renderer = renderAug;
                $('#currentMonth').text("August 2020");
            }else if(id == 'Sep'){
                counties.renderer = renderSep;
                $('#currentMonth').text("September 2020");
            }else if(id == 'Oct'){
                counties.renderer = renderOct;
                $('#currentMonth').text("October 2020");
            }
        });
     
/***********************Start Looping Code for States***************************/  
         
        view
          .when(function() {
            return counties.when(function() {
              var query = counties.createQuery();
              return counties.queryFeatures(query);
            });
          })
          .then(getValues)
          .then(getUniqueValues)
          .then(addToSelect);

        function getValues(response) {
          var features = response.features;
          var values = features.map(function(feature) {
            return feature.attributes.STNAME;
          });
          return values;
        }

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
            stateFilter.add(option);
          });
        }
        
                
/****************Begin State Filtering Code************************/  
        
        view.when().then(function() {
          view.whenLayerView(counties).then(function(layerView) {
            const filterSelect = document.getElementById("stateFilter");
            // filters the layer using a definitionExpression
            // based on a religion selected by the user
            filterSelect.addEventListener("change", function(event) {
              const newValue = event.target.value;

              const whereClause = newValue
                ? "STNAME = '" + newValue + "'"
                : null;
              stateLayerView.filter = {
                where: whereClause
              };
              //If Statement Start
              if(newValue == ""){
                 zoomHome();
              } else if (newValue != ""){
                 zoomToLayer(stateLayerView); 
              };    
              //If Statement End    
            });
            stateLayerView = layerView;
                        
          });

        });
        
/****************Zoom to Home Code for Filter*************/
        
        function zoomHome() {
              view.goTo({
                    position: {
                      latitude: -1.841491,
                      longitude: -97.651421,    
                      //longitude: -96.651421,
                      z: 4700000
                    },
                      tilt: 45,
                      heading: 1
                });   
            };

/****************Zoom to Layer Code for Filter**********/ 

        function zoomToLayer(stateLayerView) {
          return stateLayerView.queryExtent().then(function (response) {
            view.goTo(response.extent).catch(function (error) {
              if (error.name != "AbortError") {
                console.error(error);
              }
            });
          });
        }   
        
/************Filter Clear Button**********/
        
        
        $(document).ready(function(){
          $("#reset").click(function(){
                view.when().then(function() {
                  view.whenLayerView(counties).then(function(layerView) {
                      const newValue = "";
                      const whereClause = newValue
                        ? "STNAME = '" + newValue + "'"
                        : null;
                      stateLayerView.filter = {
                        where: whereClause
                      };
                      zoomHome();
                       $("#stateFilter")[0].selectedIndex=0;
                    });

                });
               
          });
        }); 
        
        

/************Info Window Jquery**********/     
        
        $(document).ready(function(){
          $("#infoButton").click(function(){
            $("#infoDiv").fadeToggle(100);
          });
        });    

        $("#infoButton").click(function() {
          $("#infoButton").toggleClass('buttonStyle-clicked');
          $(".fa-info-circle").toggleClass('click');    
        });    
        
        
});
        
    