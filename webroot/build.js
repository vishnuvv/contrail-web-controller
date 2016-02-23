({
    mainConfigFile:"main.js",
    //name:"js/main",
    // appDir:"./",
    //Will optimize only files added as dependencies in modules??
    skipDirOptimize:true,
    optimizeCss:'none',
    optimize:'none',
    baseUrl:".",
    wrapShim:true,
    //Output directory
    dir:"dist",
    fileExclusionRegExp:/^(build|fakeData|dist1|reports|setting|test)$/,
    findNestedDependencies:false,
    removeCombined:true,
    //out:"main.build.js",
    modules: [
        /*{ 
            name:"js/main",
            exclude:[
                'js/controller-libs',
            ]
        },*/{
            name:"js/controller-libs",
            exclude:['underscore','js/controller-dashboard-libs']
        },{
            name:"js/controller-dashboard-libs",
            exclude:['underscore']
        }
    ]
})
