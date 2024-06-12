"use strict";(self.webpackChunkDOCKETRUN=self.webpackChunkDOCKETRUN||[]).push([[592],{2688:(c,s,o)=>{o.d(s,{l:()=>l});var t=o(4650);let l=(()=>{class i{constructor(){this.dashboardInterval=3e3,this.jobsheetInterval=3e3,this.jobsheetDataInterval2=3e3,this.jobsheetDataInterval=3e3,this.checkApplicationStatusInterval=5e3,this.aiSolutionsList={cr:"Crowd Count",ra:"Danger Zone",ppe:"Personal Protective Equipment",tc:"Traffic Count",fire:"Fire Detection",dust:"Dust Detection",parking:"Parking",traffic_jam:"Traffic Jam"},this.config=this.loadConfigFile("assets/config.json"),this.IP=this.config.IP,this.IP_ESI=this.config.IP_ESI,this.socket_ip=this.config.Socket_IP,this.mech_app_start_api=this.config.mech_app_start_api,this.dashboardInterval=this.config.dashboardInterval,this.jobsheetDataInterval=this.config.jobSheetDataInterval,this.jobsheetInterval=this.config.jobSheetStatusInterval,this.jobsheetDataInterval2=this.config.jobSheetDataInterval2,this.startEsiApi=this.config.StartESIAppApi,this.steamDataDelay=this.config.steamSuitInterval,this.logInterval=this.config.logInterval,this.unplannedInterval=this.config.unallocatedInterval,this.checkApplicationStatusInterval=this.config.checkApplicationStatusInterval}loadConfigFile(e){const r=this.readConfigFile(e,"application/json");return JSON.parse(r)}readConfigFile(e,r){var n=new XMLHttpRequest;if(n.open("GET",e,!1),null!=r)return n.overrideMimeType&&n.overrideMimeType(r),n.send(),n.status?n.response:null}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275prov=t.\u0275\u0275defineInjectable({token:i,factory:i.\u0275fac,providedIn:"root"}),i})()},1968:(c,s,o)=>{o.d(s,{J:()=>l});var t=o(4650);let l=(()=>{class i{transform(e,...r){if(null!=e&&"None"!=e){if("object"==typeof e)return`${["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"][e.getMonth()]} ${e.getDate()} . ${e.getHours()}:${e.getMinutes()}`;if("string"==typeof e){let u,n=e.split(" "),h=n[0].split("-"),p=n[1].split(":"),g=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"],f=parseInt(h[1]);return u=f<10?g[f%10-1]:g[f-1],`${p[0]} : ${p[1]} : ${p[2]} . ${u} ${h[2]}`}return"---"}return"---"}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275pipe=t.\u0275\u0275definePipe({name:"dateFormater",type:i,pure:!0}),i})()},4522:(c,s,o)=>{o.d(s,{L:()=>i});var t=o(4650),l=o(7832);let i=(()=>{class a extends l.s{}return a.\u0275fac=function(){let e;return function(n){return(e||(e=t.\u0275\u0275getInheritedFactory(a)))(n||a)}}(),a.\u0275cmp=t.\u0275\u0275defineComponent({type:a,selectors:[["AngleDownIcon"]],standalone:!0,features:[t.\u0275\u0275InheritDefinitionFeature,t.\u0275\u0275StandaloneFeature],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M3.58659 4.5007C3.68513 4.50023 3.78277 4.51945 3.87379 4.55723C3.9648 4.59501 4.04735 4.65058 4.11659 4.7207L7.11659 7.7207L10.1166 4.7207C10.2619 4.65055 10.4259 4.62911 10.5843 4.65956C10.7427 4.69002 10.8871 4.77074 10.996 4.88976C11.1049 5.00877 11.1726 5.15973 11.1889 5.32022C11.2052 5.48072 11.1693 5.6422 11.0866 5.7807L7.58659 9.2807C7.44597 9.42115 7.25534 9.50004 7.05659 9.50004C6.85784 9.50004 6.66722 9.42115 6.52659 9.2807L3.02659 5.7807C2.88614 5.64007 2.80725 5.44945 2.80725 5.2507C2.80725 5.05195 2.88614 4.86132 3.02659 4.7207C3.09932 4.64685 3.18675 4.58911 3.28322 4.55121C3.37969 4.51331 3.48305 4.4961 3.58659 4.5007Z","fill","currentColor"]],template:function(r,n){1&r&&(t.\u0275\u0275namespaceSVG(),t.\u0275\u0275elementStart(0,"svg",0),t.\u0275\u0275element(1,"path",1),t.\u0275\u0275elementEnd()),2&r&&(t.\u0275\u0275classMap(n.getClassNames()),t.\u0275\u0275attribute("aria-label",n.ariaLabel)("aria-hidden",n.ariaHidden)("role",n.role))},encapsulation:2}),a})()},2621:(c,s,o)=>{o.d(s,{o:()=>i});var t=o(4650),l=o(7832);let i=(()=>{class a extends l.s{}return a.\u0275fac=function(){let e;return function(n){return(e||(e=t.\u0275\u0275getInheritedFactory(a)))(n||a)}}(),a.\u0275cmp=t.\u0275\u0275defineComponent({type:a,selectors:[["AngleRightIcon"]],standalone:!0,features:[t.\u0275\u0275InheritDefinitionFeature,t.\u0275\u0275StandaloneFeature],decls:2,vars:5,consts:[["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],["d","M5.25 11.1728C5.14929 11.1694 5.05033 11.1455 4.9592 11.1025C4.86806 11.0595 4.78666 10.9984 4.72 10.9228C4.57955 10.7822 4.50066 10.5916 4.50066 10.3928C4.50066 10.1941 4.57955 10.0035 4.72 9.86283L7.72 6.86283L4.72 3.86283C4.66067 3.71882 4.64765 3.55991 4.68275 3.40816C4.71785 3.25642 4.79932 3.11936 4.91585 3.01602C5.03238 2.91268 5.17819 2.84819 5.33305 2.83149C5.4879 2.81479 5.64411 2.84671 5.78 2.92283L9.28 6.42283C9.42045 6.56346 9.49934 6.75408 9.49934 6.95283C9.49934 7.15158 9.42045 7.34221 9.28 7.48283L5.78 10.9228C5.71333 10.9984 5.63193 11.0595 5.5408 11.1025C5.44966 11.1455 5.35071 11.1694 5.25 11.1728Z","fill","currentColor"]],template:function(r,n){1&r&&(t.\u0275\u0275namespaceSVG(),t.\u0275\u0275elementStart(0,"svg",0),t.\u0275\u0275element(1,"path",1),t.\u0275\u0275elementEnd()),2&r&&(t.\u0275\u0275classMap(n.getClassNames()),t.\u0275\u0275attribute("aria-label",n.ariaLabel)("aria-hidden",n.ariaHidden)("role",n.role))},encapsulation:2}),a})()}}]);