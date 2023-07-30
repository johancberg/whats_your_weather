(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"0418":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col q-pt-lg q-px-md"},[a("q-input",{attrs:{placeholder:"Search for a city",dark:"",borderless:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getWeatherBySearch.apply(null,arguments)}},scopedSlots:t._u([{key:"before",fn:function(){return[t.checkRoute?a("q-btn",{attrs:{round:"",dense:"",flat:"",to:"/position",icon:"my_location"}}):a("q-btn",{attrs:{round:"",dense:"",flat:"",icon:"my_location"},on:{click:t.getLocation}})]},proxy:!0},{key:"append",fn:function(){return[t.search?a("q-btn",{attrs:{round:"",dense:"",flat:"",icon:"search"},on:{click:t.getWeatherBySearch}}):t._e(),t.weatherData?a("q-btn",{attrs:{to:"/settings",round:"",dense:"",flat:"",icon:"settings"}}):t._e()]},proxy:!0}]),model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)},i=[],n={data(){return{search:""}},props:{weatherData:Object,route:String},computed:{checkRoute(){return"index"===this.route}},methods:{getWeatherBySearch(){this.$emit("getWeatherBySearch",this.search)},getLocation(){this.$emit("getLocation")}}},r=n,o=a("2877"),c=a("27f9"),h=a("9c40"),l=a("eebe"),u=a.n(l),g=Object(o["a"])(r,s,i,!1,null,null,null);e["a"]=g.exports;u()(g,"components",{QInput:c["a"],QBtn:h["a"]})},3259:function(t,e,a){"use strict";a("7ee7")},"69ca":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.page.twentyFourHours?a("q-page",{staticClass:"flex column",class:t.bgClass},[a("Header",{attrs:{weatherData:t.weatherData},on:{getWeatherBySearch:function(e){return t.getWeatherBySearch(e)},getLocation:t.getLocation}}),a("div",{staticClass:"text-white text-center q-mb-lg"},[a("div",{staticClass:"text-h4 text-weight-light"},[t._v("\n      "+t._s(t.cityData.name)+", "+t._s(t.cityData.country)+"\n    ")])]),a("div",{staticClass:"text-center hour-content"},[a("q-scroll-area",{staticStyle:{"max-height":"90%",width:"100%"},attrs:{visible:t.visibleBar,"thumb-style":t.thumbStyle,"bar-style":t.barStyle}},t._l(24,(function(e){return a("div",{key:e,staticClass:"q-py-xs hour-row"},[t.isMidnight(e)?a("div",{staticClass:"text-h6 text-weight-light text-white"},[t._v(t._s(t.getDateName(1))+" "+t._s(t.getDateFormat(1)))]):t._e(),a("div",{staticClass:"text-white text-weight-light hour-inner"},[a("div",{staticClass:"hour-time"},[a("img",{staticClass:"hour-icon",attrs:{src:"https://openweathermap.org/img/wn/"+t.weatherData.hourly[e].weather[0].icon+"@2x.png"}}),a("span",{staticClass:"text-weight-bold"},[t._v(t._s(Math.round(t.weatherData.hourly[e].temp))+" °C")])]),a("div",{staticClass:"hour-time"},[a("span",[t._v(t._s(t.setDestinedTimeFormat(e))+" ")]),a("span",[t._v(" "+t._s(t.getTimezone(0-t.weatherData.timezone_offset/3600)))])])])])})),0)],1),a("div",{staticClass:"col row"},[a("q-btn",{staticClass:"col",attrs:{flat:""},on:{click:function(e){t.page.twentyFourHours=!1}}},[a("div",{staticClass:"sub-menu"},[a("q-icon",{staticClass:"text-white icon-auto",attrs:{left:"",size:"3em",name:"cloud_queue"}}),a("div",{staticClass:"text-white"},[t._v("To main page")])],1)]),a("q-btn",{staticClass:"col",attrs:{flat:""},on:{click:function(e){t.page.twentyFourHours=!1,t.page.sevenDays=!0}}},[a("div",{staticClass:"sub-menu"},[a("q-icon",{staticClass:"text-white icon-auto",attrs:{left:"",size:"3em",name:"cloud_queue"}}),a("div",{staticClass:"text-white"},[t._v("10 days")])],1)])],1),a("div",{staticClass:"col skyline"})],1):t.page.sevenDays?a("q-page",{staticClass:"flex column",class:t.bgClass},[a("Header",{attrs:{weatherData:t.weatherData},on:{getWeatherBySearch:function(e){return t.getWeatherBySearch(e)},getLocation:t.getLocation}}),a("div",{staticClass:"text-white text-center q-mb-lg"},[a("div",{staticClass:"text-h4 text-weight-light"},[t._v("\n      "+t._s(t.cityData.name)+", "+t._s(t.cityData.country)+"\n    ")])]),a("div",{staticClass:"text-center hour-content"},[a("q-scroll-area",{staticStyle:{"max-height":"90%",width:"100%"},attrs:{visible:t.visibleBar,"thumb-style":t.thumbStyle,"bar-style":t.barStyle}},t._l(7,(function(e){return a("div",{key:e,staticClass:"day-row"},[a("div",{staticClass:"text-white text-weight-light hour-inner"},[a("div",{staticClass:"hour-time"},[a("img",{staticClass:"hour-icon",attrs:{src:"https://openweathermap.org/img/wn/"+t.weatherData.daily[e].weather[0].icon+"@2x.png"}}),a("div",{staticClass:"day-temp"},[a("span",{staticClass:"text-weight-bold"},[t._v(t._s(Math.round(t.weatherData.daily[e].temp.max))+" °C")]),a("span",{staticClass:"text-weight-bold"},[t._v(t._s(Math.round(t.weatherData.daily[e].temp.min))+" °C")])])]),a("div",{staticClass:"hour-time"},[a("span",[t._v(t._s(t.getDateName(e)))]),a("span",[t._v(t._s(t.getDateFormat(e)))])])])])})),0)],1),a("div",{staticClass:"col row"},[a("q-btn",{staticClass:"col",attrs:{flat:""},on:{click:function(e){t.page.sevenDays=!1,t.page.twentyFourHours=!0}}},[a("div",{staticClass:"sub-menu"},[a("q-icon",{staticClass:"text-white icon-auto",attrs:{left:"",size:"3em",name:"cloud_queue"}}),a("div",{staticClass:"text-white"},[t._v("24 hours")])],1)]),a("q-btn",{staticClass:"col",attrs:{flat:""},on:{click:function(e){t.page.sevenDays=!1}}},[a("div",{staticClass:"sub-menu"},[a("q-icon",{staticClass:"text-white icon-auto",attrs:{left:"",size:"3em",name:"cloud_queue"}}),a("div",{staticClass:"text-white"},[t._v("To main page")])],1)])],1),a("div",{staticClass:"col skyline"})],1):a("q-page",{staticClass:"flex column",class:t.bgClass},[a("Header",{attrs:{weatherData:t.weatherData},on:{getWeatherBySearch:function(e){return t.getWeatherBySearch(e)},getLocation:t.getLocation}}),t.weatherData&&t.cityData?[a("div",{staticClass:"text-white text-center"},[a("div",{staticClass:"text-h4 text-weight-light"},[t._v("\n      "+t._s(t.cityData.name)+", "+t._s(t.cityData.country)+"\n    ")]),a("div",{staticClass:"text-h6 text-weight-light"},[t._v("\n      "+t._s(t.weatherData.current.weather[0].main)+"\n    ")]),a("div",{staticClass:"text-h1 text-weight-thin q-my-md relative-position"},[a("span",[t._v(t._s(Math.round(t.weatherData.current.temp)))]),a("span",{staticClass:"text-h4 relative-position degree"},[t._v("°C")])]),a("div",[a("span",{staticClass:"text-h5 text-weight-light"},[t._v(" "+t._s(t.setDestinedTimeFormat(0))+" "+t._s(t.getTimezone(0-t.weatherData.timezone_offset/3600))+" ")])]),a("div",[t.weatherData.timezone_offset<0&&t.viewUTCActive?[a("span",{staticClass:"text-h7 text-weight-light"},[t._v(" "+t._s(t.setUTCTimeFormat)+" GMT "+t._s(t.weatherData.timezone_offset/3600)+":00 ")])]:t.weatherData.timezone_offset>0&&t.viewUTCActive?[a("span",{staticClass:"text-h7 text-weight-light"},[t._v(" "+t._s(t.setUTCTimeFormat)+" GMT +"+t._s(t.weatherData.timezone_offset/3600)+":00 ")])]:t._e(),(new Date).getTimezoneOffset()/60!=0-t.weatherData.timezone_offset/3600&&t.time&&t.viewLocalActive?a("div",[a("span",{staticClass:"text-h7 text-weight-light"},[t._v(" "+t._s(t.setTimeFormat)+" "+t._s(t.getTimezone((new Date).getTimezoneOffset()/60))+" ")])]):t._e()],2)]),a("div",{staticClass:"text-center"},[a("img",{attrs:{src:"https://openweathermap.org/img/wn/"+t.weatherData.current.weather[0].icon+"@2x.png"}})]),a("div",{staticClass:"col row"},[a("q-btn",{staticClass:"col",attrs:{flat:""},on:{click:function(e){t.page.twentyFourHours=!0}}},[a("div",{staticClass:"sub-menu"},[a("q-icon",{staticClass:"text-white icon-auto",attrs:{left:"",size:"3em",name:"cloud_queue"}}),a("div",{staticClass:"text-white"},[t._v("24 hours")])],1)]),a("q-btn",{staticClass:"col",attrs:{flat:""},on:{click:function(e){t.page.sevenDays=!0}}},[a("div",{staticClass:"sub-menu"},[a("q-icon",{staticClass:"text-white icon-auto",attrs:{left:"",size:"3em",name:"cloud_queue"}}),a("div",{staticClass:"text-white"},[t._v("10 days")])],1)])],1)]:t._e(),a("div",{staticClass:"col skyline"})],2)},i=[],n=a("0418"),r=a("bd4c"),o=a("2f62");const c="11f99448beb3efdaafea5c0de1ef999b";var h={name:"WeatherApp",data(){return{page:{twentyFourHours:!1,sevenDays:!1},weatherData:this.exeWeather(),cityData:null,lat:null,lon:null,time:null,apiUrl:"https://api.openweathermap.org/data/2.5/onecall",cityUrl:"https://api.openweathermap.org/geo/1.0/reverse",apiKey:c,visibleBar:!0,thumbStyle:{right:"2px",borderRadius:"4px",backgroundColor:"rgb(20, 56, 156)",width:"5px",opacity:.75},barStyle:{right:"2px",borderRadius:"4px",backgroundColor:"rgb(20, 56, 156)",width:"7px",opacity:.2}}},components:{Header:n["a"]},computed:{...Object(o["c"])("data",["general","view","graphics","getWeather"]),bgClass(){let t="";if(this.weatherData&&this.graphics.AN1.active){const e=this.weatherData.timezone_offset/3600,a=new Date(1e3*this.weatherData.current.sunset),s=new Date(1e3*this.weatherData.current.sunrise),i=new Date,n=((i.getUTCHours()+e)%24+24)%24,r=((a.getUTCHours()+e)%24+24)%24,o=((s.getUTCHours()+e)%24+24)%24;return Math.abs(r-n)<=1?t+="bg-sunset":Math.abs(o-n)<=1?t+="bg-sunrise":this.weatherData.current.weather[0].icon.endsWith("n")?t+="bg-night":"Rain"===this.weatherData.current.weather[0].main?t+="bg-rain":t+="bg-day",this.graphics.AN2.active||(t+=" bg-animation"),t}return t=this.graphics.AN3.active?"maroon":"blue",t},setTimeFormat(){const t=Date.now();return this.general.GD1.active?r["a"].formatDate(t,"hh:00 A"):r["a"].formatDate(t,"HH:00")},setUTCTimeFormat(){const t=this.setTimeFormat.toString();let e=t.slice(0,2);const a=t.slice(2);return e=this.general.GD1.active?(parseInt(e)+(new Date).getTimezoneOffset()/60+12)%12:(parseInt(e)+(new Date).getTimezoneOffset()/60+24)%24,e.toString().length>1?e.toString()+a:"0"+e.toString()+a},getUTCTimeFormat(){const t=r["a"].formatDate(Date.now(),"HH:00");let e=t.slice(0,2);const a=t.slice(2);return e=(parseInt(e)+(new Date).getTimezoneOffset()/60+24)%24,e.toString().length>1?e.toString()+a:"0"+e.toString()+a},getAMPM(){return this.general.GD1.active?(this.setDestinedTimeFormat(0)+this.weatherData.timezone_offset/3600)%24<12?"AM":"PM":""},viewLocalActive(){return this.view.VW1.active},viewUTCActive(){return this.view.VW2.active}},methods:{...Object(o["b"])("data",["switchWeather"]),setDestinedTimeFormat(t){const e=this.getUTCTimeFormat;let a=parseInt(e.slice(0,2)),s=e.slice(2);return this.general.GD1.active?(s=(a+t+this.weatherData.timezone_offset/3600)%24<12?s.slice(0,4)+" AM":s.slice(0,4)+" PM",a=(a+t+this.weatherData.timezone_offset/3600)%12,0===a&&(a=12)):a=(a+t+this.weatherData.timezone_offset/3600)%24,a.toString().length>1?a.toString()+s:"0"+a.toString()+s},getTimezone(t){const e=this.getDST()?1:0,a=t+e;return 10===a?"HST":9===a?"AKST":8===a?"PST":7===a?"PDT":6===a?"CST":5===a?"EST":4===a?"EDT":3===a?"ADT":2===a?"AT":1===a?"WAT":0===a?e?"BST":"GMT":-1===a?e?"CEST":"CET":-2===a?e?"EEST":"EET":-3===a?"MSK":-5===a?"PKT":-6===a?"OMSK":-7===a?"KRAT":-8===a?"CST":-9===a?"AWST":-9.5===a?"ACST":-10===a?"AEST":-12===a?"NZST":""},exeWeather(){this.getLocation()},isMidnight(t){const e=this.getUTCTimeFormat,a=parseInt(e.slice(0,2));return(a+t+this.weatherData.timezone_offset/3600)%24===0},stdTimeZoneOffset(){const t=(new Date).getFullYear(),e=new Date(t,0,1),a=new Date(t,6,1);return Math.max(e.getTimezoneOffset(),a.getTimezoneOffset())},getDST(){return(new Date).getTimezoneOffset()<this.stdTimeZoneOffset()},getLocation(){this.$q.loading.show(),this.cond=this.$q.platform.is.electron,!0===this.cond||void 0!==this.cond?this.$axios("https://freegeoip.app/json/").then((t=>{this.lat=t.data.latitude,this.lon=t.data.longitude,this.time=this.calculateTimezones(t.timestamp),this.getWeatherByCoords()})):navigator.geolocation.getCurrentPosition((t=>{this.lat=t.coords.latitude,this.lon=t.coords.longitude,this.time=this.calculateTimezones(t.timestamp),this.getWeatherByCoords()}))},getDateName(t){return r["a"].formatDate(Date.now()+864e5*t,"dddd")},getDateFormat(t){return r["a"].formatDate(Date.now()+864e5*t,"D MMM  YY")},getCityData(){this.$axios(`${this.cityUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`).then((t=>{this.cityData=t.data[0]})).catch((t=>{this.$q.dialog({title:"Error",message:"The inserted location could not be found: "+t})}))},getWeatherByCoords(){this.$q.loading.show(),this.$axios(`${this.apiUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`).then((t=>{this.weatherData=t.data,this.getCityData(),this.switchWeather({updates:{weatherStorage:this.weatherData}})})).catch((t=>{this.$q.dialog({title:"Error",message:"Something unexpected happened: "+t})})),this.$q.loading.hide()},getWeatherBySearch(t){this.$q.loading.show(),this.$axios(`https://api.openweathermap.org/geo/1.0/direct?q=${t}&appid=${this.apiKey}&units=metric`).then((t=>{this.lat=t.data[0].lat,this.lon=t.data[0].lon,this.getWeatherByCoords(),this.switchWeather({updates:{weatherStorage:this.weatherData}})})).catch((t=>{this.$q.dialog({title:"Error",message:"The inserted location could not be found: "+t})})),this.$q.loading.hide()},calculateTimezones(t){const e=new Date(1e3*t/1e3),a=e.toLocaleTimeString(),s=a.split(":");return s[0]}}},l=h,u=(a("3259"),a("2877")),g=a("9989"),d=a("4983"),m=a("9c40"),w=a("0016"),p=a("eebe"),v=a.n(p),f=Object(u["a"])(l,s,i,!1,null,null,null);e["default"]=f.exports;v()(f,"components",{QPage:g["a"],QScrollArea:d["a"],QBtn:m["a"],QIcon:w["a"]})},"7ee7":function(t,e,a){}}]);