    const febStops = [
      {
        value: 0.0,
        size: 10000,
        color: "#FFF5F0"
      },
      {
        value: 0.0001,
        size: 45000,
        color: "#FDCAB5"
      },
      {
        value: 0.000223,
        size: 75000,
        color: "#FC8A6A"
      },
      {
        value: 0.000388,
        size: 125000,
        color: "#F14432"
      },
      {
        value: 0.000519,
        size: 300000,
        color: "#BC141A"
      },
      {
        value: 0.001244,
        size: 500000,
        color: "#67000D"
      } 
    ]        

    var renderFeb = {
          type: "simple", 
          symbol: {
            type: "polygon-3d", 
            symbolLayers: [
              {
                type: "extrude",
                //castShadows: true,
                edges: {
                    type: "sketch", 
                    color: [110, 110, 110, 0.95],
                    size: .3
                }  
              }
            ]
          },
          visualVariables: [
            {
              type: "size",
              valueExpression: "($feature.NC_Feb/$feature.POPESTIM_9)*1000",
              stops: febStops,
              },
            {
              type: "color",
              valueExpression: "($feature.NC_Feb/$feature.POPESTIM_9)*1000",
              stops: febStops,
            }
          ]    
    };

    const marStops = [
      {
        value: 0.0003,
        size: 10000,
        color: "#FFF5F0"
      },
      {
        value: 0.001216,
        size: 45000,
        color: "#FDCAB5"
      },
      {
        value: 0.003403,
        size: 75000,
        color: "#FC8A6A"
      },
      {
        value: 0.00549,
        size: 125000,
        color: "#F14432"
      },
      {
        value: 0.007651,
        size: 300000,
        color: "#BC141A"
      },
      {
        value: 0.026807,
        size: 500000,
        color: "#67000D"
      } 
    ]        

    var renderMar = {
          type: "simple", 
          symbol: {
            type: "polygon-3d", 
            symbolLayers: [
              {
                type: "extrude",
                //castShadows: true,
                edges: {
                    type: "sketch", 
                    color: [110, 110, 110, 0.95],
                    size: .3
                } 
              }
            ]
          },
          visualVariables: [
            {
              type: "size",
              valueExpression: "($feature.NC_Mar/$feature.POPESTIM_9)*1000",
              stops: marStops,
              },
            {
              type: "color",
              valueExpression: "($feature.NC_Mar/$feature.POPESTIM_9)*1000",
              stops: marStops,
            }
          ]    
    };

    const aprStops = [
      {
        value: 0.199621,
        size: 10000,
        color: "#FFF5F0"
      },
      {
        value: 0.652582,
        size: 45000,
        color: "#FDCAB5"
      },
      {
        value: 1.583782,
        size: 75000,
        color: "#FC8A6A"
      },
      {
        value: 3.336605,
        size: 125000,
        color: "#F14432"
      },
      {
        value: 7.041662,
        size: 300000,
        color: "#BC141A"
      },
      {
        value: 11.511229,
        size: 500000,
        color: "#67000D"
      } 
    ]        

    var renderApr = {
          type: "simple", 
          symbol: {
            type: "polygon-3d", 
            symbolLayers: [
              {
                type: "extrude",
                //castShadows: true,
                edges: {
                    type: "sketch", 
                    color: [110, 110, 110, 0.95],
                    size: .3
                }  
              }
            ]
          },
          visualVariables: [
            {
              type: "size",
              valueExpression: "($feature.NC_Apr/$feature.POPESTIM_9)*1000",
              stops: aprStops,
              },
            {
              type: "color",
              valueExpression: "($feature.NC_Apr/$feature.POPESTIM_9)*1000",
              stops: aprStops,
            }
          ]    
    };

    const mayStops = [
      {
        value: 1.479362,
        size: 10000,
        color: "#FFF5F0"
      },
      {
        value: 4.808496,
        size: 45000,
        color: "#FDCAB5"
      },
      {
        value: 11.835463,
        size: 75000,
        color: "#FC8A6A"
      },
      {
        value: 24.830086,
        size: 125000,
        color: "#F14432"
      },
      {
        value: 40.038837,
        size: 300000,
        color: "#BC141A"
      },
      {
        value: 89.950372,
        size: 500000,
        color: "#67000D"
      } 
    ]        

    var renderMay = {
          type: "simple", 
          symbol: {
            type: "polygon-3d", 
            symbolLayers: [
              {
                type: "extrude",
                //castShadows: true,
                edges: {
                    type: "sketch", 
                    color: [110, 110, 110, 0.95],
                    size: .3
                }  
              }
            ]
          },
          visualVariables: [
            {
              type: "size",
              valueExpression: "($feature.NC_May/$feature.POPESTIM_9)*1000",
              stops: mayStops,
              },
            {
              type: "color",
              valueExpression: "($feature.NC_May/$feature.POPESTIM_9)*1000",
              stops: mayStops,
            }
          ]    
    };

    const junStops = [
      {
        value: 0.992685,
        size: 10000,
        color: "#FFF5F0"
      },
      {
        value: 2.7722131,
        size: 45000,
        color: "#FDCAB5"
      },
      {
        value: 5.802648,
        size: 75000,
        color: "#FC8A6A"
      },
      {
        value: 11.649789,
        size: 125000,
        color: "#F14432"
      },
      {
        value: 24.778549,
        size: 300000,
        color: "#BC141A"
      },
      {
        value: 51.168757,
        size: 500000,
        color: "#67000D"
      } 
    ]        

    var renderJun = {
          type: "simple", 
          symbol: {
            type: "polygon-3d", 
            symbolLayers: [
              {
                type: "extrude",
                //castShadows: true,
                edges: {
                    type: "sketch", 
                    color: [110, 110, 110, 0.95],
                    size: .3
                } 
              }
            ]
          },
          visualVariables: [
            {
              type: "size",
              valueExpression: "($feature.NC_Jun/$feature.POPESTIM_9)*1000",
              stops: junStops,
              },
            {
              type: "color",
              valueExpression: "($feature.NC_Jun/$feature.POPESTIM_9)*1000",
              stops: junStops,
            }
          ]    
    };

    const julStops = [
      {
        value: 1.208459,
        size: 10000,
        color: "#FFF5F0"
      },
      {
        value: 3.115748,
        size: 45000,
        color: "#FDCAB5"
      },
      {
        value: 5.905555,
        size: 75000,
        color: "#FC8A6A"
      },
      {
        value: 10.895286,
        size: 125000,
        color: "#F14432"
      },
      {
        value: 25.317572,
        size: 300000,
        color: "#BC141A"
      },
      {
        value: 81.856159,
        size: 500000,
        color: "#67000D"
      } 
    ]        

    var renderJul = {
          type: "simple", 
          symbol: {
            type: "polygon-3d", 
            symbolLayers: [
              {
                type: "extrude",
                //castShadows: true,
                edges: {
                    type: "sketch", 
                    color: [110, 110, 110, 0.95],
                    size: .3
                }  
              }
            ]
          },
          visualVariables: [
            {
              type: "size",
              valueExpression: "($feature.NC_Jul/$feature.POPESTIM_9)*1000",
              stops: julStops,
              },
            {
              type: "color",
              valueExpression: "($feature.NC_Jul/$feature.POPESTIM_9)*1000",
              stops: julStops,
            }
          ]    
    };

    const augStops = [
      {
        value: 2.402042,
        size: 10000,
        color: "#FFF5F0"
      },
      {
        value: 5.302227,
        size: 45000,
        color: "#FDCAB5"
      },
      {
        value: 9.196835,
        size: 75000,
        color: "#FC8A6A"
      },
      {
        value: 14.724649,
        size: 125000,
        color: "#F14432"
      },
      {
        value: 24.766457,
        size: 300000,
        color: "#BC141A"
      },
      {
        value: 47.84689,
        size: 500000,
        color: "#67000D"
      } 
    ]        

    var augVisVar = [
            {
              type: "size",
              valueExpression: "($feature.NC_Aug/$feature.POPESTIM_9)*1000",
              stops: augStops,
              },
            {
              type: "color",
              valueExpression: "($feature.NC_Aug/$feature.POPESTIM_9)*1000",
              stops: augStops,
            }
          ];

    const sepStops = [
      {
        value: 2.723161,
        size: 10000,
        color: "#FFF5F0"
      },
      {
        value: 5.914608,
        size: 45000,
        color: "#FDCAB5"
      },
      {
        value: 10.671848,
        size: 75000,
        color: "#FC8A6A"
      },
      {
        value: 22.018031,
        size: 125000,
        color: "#F14432"
      },
      {
        value: 58.025622,
        size: 300000,
        color: "#BC141A"
      },
      {
        value: 129.77915,
        size: 500000,
        color: "#67000D"
      } 
    ];  
    
    var sepVisVar = [
        {
          type: "size",
          valueExpression: "($feature.NC_Aug/$feature.POPESTIM_9)*1000",
          stops: sepStops,
          },
        {
          type: "color",
          valueExpression: "($feature.NC_Aug/$feature.POPESTIM_9)*1000",
          stops: sepStops,
        }
      ];

    let visVar = augVisVar;
    
    var renderAug = {
          type: "simple", 
          symbol: {
            type: "polygon-3d", 
            symbolLayers: [
              {
                type: "extrude",
                //castShadows: true,
                edges: {
                    type: "sketch", 
                    color: [110, 110, 110, 0.95],
                    size: .3
                }  
              }
            ]
          },
          visualVariables: visVar
    };

    


    /*const sepStops = [
      {
        value: 2.723161,
        size: 10000,
        color: "#FFF5F0"
      },
      {
        value: 5.914608,
        size: 45000,
        color: "#FDCAB5"
      },
      {
        value: 10.671848,
        size: 75000,
        color: "#FC8A6A"
      },
      {
        value: 22.018031,
        size: 125000,
        color: "#F14432"
      },
      {
        value: 58.025622,
        size: 300000,
        color: "#BC141A"
      },
      {
        value: 129.77915,
        size: 500000,
        color: "#67000D"
      } 
    ]        */

    var renderSep = {
          type: "simple", 
          symbol: {
            type: "polygon-3d", 
            symbolLayers: [
              {
                type: "extrude",
                //castShadows: true,
                edges: {
                    type: "sketch", 
                    color: [110, 110, 110, 0.95],
                    size: .3
                }  
              }
            ]
          },
          visualVariables: [
            {
              type: "size",
              valueExpression: "($feature.NC_Sep/$feature.POPESTIM_9)*1000",
              stops: sepStops,
              },
            {
              type: "color",
              valueExpression: "($feature.NC_Sep/$feature.POPESTIM_9)*1000",
              stops: sepStops,
            }
          ]    
    };

    const octStops = [
      {
        value: 2.332112,
        size: 10000,
        color: "#FFF5F0"
      },
      {
        value: 4.957088,
        size: 45000,
        color: "#FDCAB5"
      },
      {
        value: 8.300683,
        size: 75000,
        color: "#FC8A6A"
      },
      {
        value: 13.196481,
        size: 125000,
        color: "#F14432"
      },
      {
        value: 22.12728,
        size: 300000,
        color: "#BC141A"
      },
      {
        value: 49.972787,
        size: 500000,
        color: "#67000D"
      } 
    ]        

    var renderOct = {
          type: "simple", 
          symbol: {
            type: "polygon-3d", 
            symbolLayers: [
              {
                type: "extrude",
                //castShadows: true,
                edges: {
                    type: "sketch", 
                    color: [110, 110, 110, 0.95],
                    size: .3
                }  
              }
            ]
          },
          visualVariables: [
            {
              type: "size",
              valueExpression: "($feature.NC_Oct/$feature.POPESTIM_9)*1000",
              stops: octStops,
              },
            {
              type: "color",
              valueExpression: "($feature.NC_Oct/$feature.POPESTIM_9)*1000",
              stops: octStops,
            }
          ]    
    };
