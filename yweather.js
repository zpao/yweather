// Yahoo! Weather badge (alpha)
// copyright Paul O'Shannessy 2007
// Released under the MIT license
// see http://playground.zpao.com/yweather

// code structure 'borrowed' from ninja Kent Brewster
// http://kentbrewster.com/case-hardened-javascript/ for details


( function() {
   var trueName = '';
   for (var i = 0; i < 16; i++) {
      trueName += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
   }
   window[trueName] = {};
   var $ = window[trueName];
   $.f = function() {
      return {
         JSON_URL : "http://playground.zpao.com/yweather/json.php?",
         CSS_URL : "http://playground.zpao.com/yweather/yweather.css",
         IMAGE_URL : "http://us.i1.yimg.com/us.yimg.com/i/us/nws/weather/gr/",
         IMAGE_EXT : ".png",
         err : false,
         runFunction : [],
         init : function(target) {
            var theScripts = document.getElementsByTagName('SCRIPT');
            for (var i = 0; i < theScripts.length; i++) {
               if (theScripts[i].src.match(target)) {
                  $.a = {};
                  if (theScripts[i].innerHTML) {
                     $.a = $.f.parseJson(theScripts[i].innerHTML);
                  }
                  //console.log($.a);
                  if ($.a.err) {
                     alert('bad json!');
                  }
                  $.f.parseArgs();
                  $.f.buildStructure();
                  $.f.getData();
                  //$.f.fillWithDummyData();
                  if (!$.f.err) {
                     // insert new DOM nodes
                     theScripts[i].parentNode.insertBefore($.w, theScripts[i]);
                  }
                  // remove the script from DOM structure
                  theScripts[i].parentNode.removeChild(theScripts[i]);
                  break;
               }
            }
         },
         // Hedger's safer JSON parser:
         // http://www.hedgerwow.com/360/dhtml/js_safe_eval/demo.php
         parseJson : function(json) {
            this.parseJson.data = json;
            if ( typeof json !== 'string') {
               return {"err":"trying to parse a non-string JSON object"};
            }
            try {
               var f = Function(['var document,top,self,window,parent,Number,Date,Object,Function,',
                  'Array,String,Math,RegExp,Image,ActiveXObject;',
                  'return (' , json.replace(/<\!--.+-->/gim,'').replace(/\bfunction\b/g,'function&shy;') , ');'].join(''));
               return f();
            } catch (e) {
               return {"err":"trouble parsing JSON object"};
            }
         },
         // broke out from buildStructure - didn't belong
         parseArgs : function () {
            var args = [ "code" ];
            var defaults = {
               "code":"USPA1290"
            };
            // parse args for defaults
            for (var i = 0; i < args.length; i++) {
               if (typeof defaults[args[i]] !== typeof $.a[args[i]] ) {
                  $.a[args[i]] = defaults[args[i]];
               }
            }
         },
         // based on runSearch from original search script
         getData : function () {
            if ($.a.code) {
               var n = $.f.runFunction.length;
               var id = trueName + '.f.runFunction[' + n + ']';

               // !!!! IMPORTANT - the callback
               $.f.runFunction[n] = function(r) {
                  $.f.removeScript(id);
                  //console.log(r);
                  r.err = r.err || false;
                  if (!r.err) {
                     $.f.processWeatherData(r);
                  }
               }
               // !!!!!!!

               // set units
               $.a.units = $.a.units || 'f';

               var url = $.f.JSON_URL + "p=" + $.a.code;
               url +=    "&u=" + $.a.units;
               url +=    "&callback=" + id;
               $.f.runScript(url, id);
            }
         },
         processWeatherData : function (r) {
            var isNight = $.f.isNightTime(r.condition.date, r.astronomy.sunrise, r.astronomy.sunset);
            // TODO still need to figure out if it's day or night... (look at sunrise)
            //console.log(isNight);
            $.w.bg.className = "yweather_bg " + (isNight ? "night" : "day");
            $.w.bg.h3.innerHTML = r.condition.temp + "&deg;";
            $.w.bg.p.innerHTML = "High: " + r.forecast.high + "&deg; Low: " + r.forecast.low + "&deg;"
            // TODO same as above - day or night?
            //XXXzpao this is weird...
            if (r.condition.code == "3200")
              r.condition.code = "44";
            $.w.icon.img.src = $.f.IMAGE_URL + r.condition.code + (isNight ? "n" : "d") + $.f.IMAGE_EXT;
            $.w.icon.img.alt = $.w.icon.img.title = r.location.city + ": " + r.condition.text + " - Yahoo! Weather";
            $.w.link.a.href = r.url;

            //finally: show the element that we created, now that it has data
            $.w.style.display = "block";
         },
         // based loosely on weather widget code
         convertTimeToInt : function (time_string) {
            time = time_string.split( " " )[0];
            amPm = time_string.split( " " )[1].toUpperCase();
            hour = time.split( ":" )[0];
            minute = time.split( ":" )[1];
            //console.log(time_string, time, amPm, hour, minute)
            newTime = new Date();

            if (amPm == "AM" && hour == "12") {
               hour = 0;
            } else if (amPm == "PM" && hour != "12") {
               hour += 12;
            }
            return (60 * hour) + (1 * minute);
         },
         isNightTime : function (date, sunrise, sunset) {
            // date will be of format: Thu, 04 Oct 2007 1:56 pm PDT
            // sunrise will be       : 7:06 am
            // sunset will be        : 6:47 pm
            // strategy - convert to ints and just compare, makes it easy as balls

            // console.log(date);
            // console.log(date.match(/\d\d?:\d\d \S\S/));
            var [dt, tz] = date.split(/\d\d?:\d\d \S\S/);
            // console.log(dt, tz);
            // get date into same format (so can apply same regex)
            // console.log(date, sunrise, sunset);
            now = date.match(/\d\d?:\d\d \S\S/)[0];

            nowI = $.f.convertTimeToInt(now);
            sunriseI = $.f.convertTimeToInt(sunrise);
            sunsetI = $.f.convertTimeToInt(sunset);
            // console.log([nowI, sunriseI, sunsetI].join("--"));
            // console.log(nowI >= sunriseI);
            // console.log(nowI < sunsetI);
            return !(nowI >= sunriseI && nowI < sunsetI);
         },
         buildStructure : function() {
            // load our stylesheet
            if (!document.getElementById('yWeather')) {
               var link = document.createElement('LINK');
               link.id = 'yWeather';
               link.rel = 'stylesheet';
               link.type = 'text/css';
               link.href = $.f.CSS_URL;
               document.getElementsByTagName('HEAD')[0].appendChild(link);
            }
            // create container
            $.w = document.createElement('DIV');
            $.w.className = 'yweather';
            $.w.style.display="none"; // hide it
               // create bg, data container
               $.w.bg = document.createElement('DIV');
               $.w.bg.className = 'yweather_bg';
               $.w.appendChild($.w.bg);
                  // create h3
                  $.w.bg.h3 = document.createElement('H3');
                  $.w.bg.h3.className = 'yweather_h3';
                  $.w.bg.appendChild($.w.bg.h3);
                  // create p
                  $.w.bg.p = document.createElement('P');
                  $.w.bg.p.className = 'yweather_p';
                  $.w.bg.appendChild($.w.bg.p);
               // create icon
               $.w.icon = document.createElement('DIV');
               $.w.icon.className = 'yweather_icon';
               $.w.appendChild($.w.icon);
                  // create img
                  $.w.icon.img = document.createElement('IMG');
                  $.w.icon.img.className = 'yweather_img';
                  $.w.icon.appendChild($.w.icon.img);
               // create link
               $.w.link = document.createElement('DIV');
               $.w.link.className = 'yweather_link';
               $.w.appendChild($.w.link);
                  // create A
                  $.w.link.a = document.createElement('A');
                  $.w.link.a.innerHTML = "Yahoo! Weather";
                  $.w.link.a.href = "#";
                  $.w.link.appendChild($.w.link.a);
         },
         fillWithDummyData : function () {
            // fill with testing for now
            $.w.bg.className = "yweather_bg day";
            $.w.bg.h3.innerHTML = "76&deg;";
            $.w.bg.p.innerHTML = "High: 79&deg; Low: 61&deg;"
            $.w.icon.img.src = "http://us.i1.yimg.com/us.yimg.com/i/us/nws/weather/gr/28d.png";
            $.w.icon.img.alt = $.w.icon.img.title = "Pittsburgh: Mostly Cloudy - Yahoo! Weather";
            $.w.link.a.href = "http://weather.yahoo.com/forecast/USPA1290.html";
         },
         runScript : function(url, id) {
            var s = document.createElement('script');
            s.id = id;
            s.type ='text/javascript';
            s.src = url;
            document.getElementsByTagName('body')[0].appendChild(s);
         },
         removeScript : function(id) {
            if (document.getElementById(id)) {
               var s = document.getElementById(id);
               s.parentNode.removeChild(s);
            }
         }
      };
   }();
   var thisScript = /^https?:\/\/[^\/]*playground.zpao.com\/yweather\/yweather.js$/;
// brothercake onload function
   if(typeof window.addEventListener !== 'undefined') {
      window.addEventListener('load', function() { $.f.init(thisScript); }, false);
   } else if(typeof window.attachEvent !== 'undefined') {
      window.attachEvent('onload', function() { $.f.init(thisScript); });
   }
} )();
