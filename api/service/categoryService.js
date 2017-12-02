var request = require('request');
var Xray = require("x-ray");
var _ = require('underscore');
var x = Xray();
var reqoptions = {
    headers: {'User-Agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 7.0; InfoPath.3; .NET CLR 3.1.40767; Trident/6.0; en-IN)'},
    proxy: "http://912437:bhagya%232016@proxy.tcs.com:8080",

}

/*var phantom = require('x-ray-phantom');
var x = Xray().driver(phantom({proxy:"http://proxy.tcs.com:8080",proxyAuth:"912437:bhagya%232016",webSecurity: false, weak: false}));*/
var configDAO = require("./../../api/dao/configDAO");
var async = require('async');
var log=require('./../../api/util/logger');
var reqoptions = {
    headers: {'User-Agent': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 7.0; InfoPath.3; .NET CLR 3.1.40767; Trident/6.0; en-IN)'},
    proxy: "http://1038645:Augest@2016@proxy.tcs.com:8080"
}
var subcaturl = [];
var configData = [];
function fetchConfiguration(data,callback) {

    var site_id = data;
    async.parallel([
        function(callback) {
            configDAO.getProxyConfig(site_id, function (err, data) {
                if (err) {
                    log.error(err);
                    callback(err,null)
                } else {
                    configData.push(data[0]);
                    console.log("1st fn" +configData);
                }
            });
        },
    function(callback) {
        configDAO.getTagConfig(site_id, function (err, getTagData) {
            if(err){
                log.error(err);
                res.send(err);
            }else {
                configData.push(getTagData[0]);
                console.log("2st fn" +configData);
            }
        });
    }
    ],function (err,response) {
        console.log("response",response);
        console.log("configdata",configData);
        callback(null,configData);
    })
}


function fetchTopCategory(data,callback) {
    /*code for getting top category Start*/
    fetchConfiguration(data,function(err,response){
        console.log("response lenght"+response);
        console.log("response in fetch Config" , response);
    })
    console.log("response lenght"+configData);
    var url = "http://www.marksandspencer.com/";
    request(url, reqoptions, function (err, response) {
        x(response.body,'ul.level-one',{title:['li.mega-trigger a'],url:['li.mega-trigger a@href'],level:['li.mega-trigger a@id']})
        (function (err, obj) {
            var result = obj.url.map(function (elm, index) {
                return {
                    title: obj.title[index],
                    url: obj.url[index],
                    level:obj.level[index]
                };
            });

            var filtered = _(result).filter(function(item) {
                return (item.level !== undefined) && (item.url.indexOf("/c/")>=0)
            });
            console.log("top category");
            console.log(filtered);
           return callback(null, filtered);
        })
    });

}

function fetchSubCategory(req,callback) {
    var url = req.body.siteurl;
    console.log(url);
    request(url, reqoptions, function (err, response) {
        x(response.body,'div.left-navigation',{url:['li a@href']})
        (function (err, obj) {
            console.log("1s fn"+obj.url);
            var result = obj.url.map(function (elm, index) {
                return {
                //    title: obj.title[index],
                    url: obj.url[index],
                };
            });

            subcaturl = _(result).filter(function(item) {
                return (url!== undefined  && ((url!== undefined&&url.indexOf("/l/")>=0)) || (url!== undefined&&url.indexOf("/c/")>=0 )|| (url!== undefined&&url.indexOf("/s/")>=0))
            });
            //console.log(filtered);
            return callback(null, subcaturl);
            if(!subcaturl.length==0) {
                console.log("Inside if");
               // console.log(filtered);
            }

        })
    });
    request(url, reqoptions, function (err, response) {
        x(response.body,'div.container-inner',{url:['li a@href']})
        (function (err, obj) {
            console.log("2s fn"+obj.url);
            var result = obj.url.map(function (elm, index) {
                return {
                    //title: obj.title[index],
                    url: obj.url[index],
                };
            });

            var subcaturl = _(result).filter(function(item) {
                return (url!== undefined  && ((url!== undefined&&url.indexOf("/l/")>=0)) || (url!== undefined&&url.indexOf("/c/")>=0 )|| (url!== undefined&&url.indexOf("/s/")>=0))
            });
           // console.log(filtered);
            if(!subcaturl.length==0) {
                console.log("subcategory category");
                console.log(subcaturl);

                return callback(null, subcaturl);
            }
        })
    });

}

function fetchBrokenLinks(req,callback) {
    //console.log(subcaturl);
    var brokenlinks =[];
    var url = "http://www.marksandspencer.com/l/women/dresses";
        request(url, reqoptions, function (err, response) {
           // console.log(subcaturl.url);
            console.log("connected" + response.statusCode);
            if(response.statusCode == 200){
                x(response.body, 'ol.grid-view div.lead .prodAnchor', {pdpurl: ['a@href'], imagesrc: ['img@src']})
                (function (err, obj) {
                    _.each(obj.imagesrc, function (images) {
                        request("http:" + images, reqoptions, function (err, response) {
                           // 1st console.log(err + "http:" + images);
                            //   console.log("Image path" + "http:" + images);
                            // console.log("Image status code" +response.statusCode);
                        })
                    });
                    _.each(obj.pdpurl, function (url) {
                        //console.log("pdpurlurl"+url);
                        request("http://www.marksandspencer.com" + url, reqoptions, function (err, response) {
                           // console.log("pdp sourcecode"+response.body);
                           //7 console.log(err + "http://www.marksandspencer.com" + url );
                            //  console.log("PDP url"+ "http://www.marksandspencer.com" + url);
                            // console.log("PDP status Code"+ response.statusCode);
                            //pdp code start here
                            if(response.statusCode == 200){
                                x(response.body, 'div.typeC div.caro_wrap ', {imagesrc: ['li img@src']})

                                (function (err, obj) {
                                    _.each(obj.imagesrc, function (images) {
                                        console.log("imagepdp"+obj.imagesrc);
                                        request("http:" + images, reqoptions, function (err, response) {
                                            // 2nd console.log(err + "http:" + images);
                                            //   console.log("Image path" + "http:" + images);
                                            // console.log("Image status code" +response.statusCode);
                                        })
                                    });
                                    /* _.each(obj.pdpurl, function (url) {
                                     console.log("pdpurlurl"+url);
                                     request("http://www.marksandspencer.com" + url, reqoptions, function (err, response) {
                                     console.log("pdp sourcecode"+response.body);
                                     console.log(err + "http://www.marksandspencer.com" + url );
                                     //  console.log("PDP url"+ "http://www.marksandspencer.com" + url);
                                     // console.log("PDP status Code"+ response.statusCode);
                                     //pdp code start here



                                     //pdp code start here



                                     })
                                     });*/
                                })
                                /*x(response.body,['script@src'])(function (err,obj) {
                                 _.each(obj, function (scripturl) {
                                 if (scripturl !== undefined && scripturl.indexOf("//")>=0) {
                                 console.log(scripturl);
                                 request("http:" + scripturl, reqoptions, function (err, response) {
                                 console.log(err + "http:" + scripturl);
                                 //  console.log("script response code" + response.statusCode);
                                 });
                                 }
                                 });
                                 });*/

                                /*x(response.body,{type:['link@rel'],url:['link@href']})(function (err,obj) {
                                 console.log(err);
                                 var result = obj.url.map(function (elm, index) {
                                 return {
                                 type: obj.type[index],
                                 url: obj.url[index],
                                 };
                                 });
                                 _(result).filter(function(item) {
                                 if(item.type === 'stylesheet'){
                                 request("http:" + item.url, reqoptions, function (err, response) {
                                 console.log(err);
                                 console.log("stylesheet response code" + response.statusCode);
                                 });
                                 }
                                 })
                                 });*/
                                /* var brokenlink ={
                                 statusCode :200 ,
                                 statusname:"success",
                                 url :subcaturl.url
                                 }
                                 brokenlinks.push(brokenlink);
                                 console.log(brokenlinks);*/

                            }


                            //pdp code end here



                        })
                    });
                })
                x(response.body,['script@src'])(function (err,obj) {
                    _.each(obj, function (scripturl) {
                        if (scripturl !== undefined && scripturl.indexOf("//")>=0) {
                           //3 console.log(scripturl);
                            request("http:" + scripturl, reqoptions, function (err, response) {
                               //3rd console.log(err + "http:" + scripturl);
                                //  console.log("script response code" + response.statusCode);
                            });
                        }
                    });
                });

                x(response.body,{type:['link@rel'],url:['link@href']})(function (err,obj) {
                    console.log(err);
                    var result = obj.url.map(function (elm, index) {
                        return {
                            type: obj.type[index],
                            url: obj.url[index],
                        };
                    });
                    _(result).filter(function(item) {
                        if(item.type === 'stylesheet'){
                            request("http:" + item.url, reqoptions, function (err, response) {
                              //4  console.log(err);
                              //5  console.log("stylesheet response code" + response.statusCode);
                            });
                        }
                    })
                });
                var brokenlink ={
                    statusCode :200 ,
                    statusname:"success",
                    url :subcaturl.url
                }
                brokenlinks.push(brokenlink);
                console.log(brokenlinks);

            }else if(response.statusCode == 404){
                var brokenlink ={
                    statusCode :404 ,
                    statusname:"Page Not Found",
                    url :subcaturl.url
                }
                 brokenlinks.push(brokenlink);


            }else if(response.statusCode == 403){
                var brokenlink ={
                    statusCode :403 ,
                    statusname:"Access Forbidden",
                    url :subcaturl.url
                }
                brokenlinks.push(brokenlink);

            }else if(response.statusCode == 500){
                var brokenlink ={
                    statusCode :500 ,
                    statusname:"Internal Server Error",
                    url :subcaturl.url
                }
                brokenlinks.push(brokenlink);
                console.log(brokenlinks);

            }



        });



    callback(null,brokenlinks);

}
module.exports.fetchTopCategory = fetchTopCategory;
module.exports.fetchSubCategory = fetchSubCategory;
module.exports.fetchBrokenLinks = fetchBrokenLinks;