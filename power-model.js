(function(root){
function pack(series,parallel,voltage,ah){return{voltage:series*voltage,ah:parallel*ah,cells:series*parallel,wh:series*parallel*voltage*ah}}
function brake(s){const initial=s.speed/3.6,final=Math.max(0,initial-5),kinetic=.5*s.mass*(initial*initial-final*final)/3600000,room=Math.max(0,1-s.soc/100)*s.capacity,limit=s.blocked?0:s.cold?.1:.65,recovered=Math.min(room,kinetic*limit);return{speed:final*3.6,kinetic,recovered,loss:kinetic-recovered,soc:Math.min(100,s.soc+recovered/s.capacity*100)}}
function capacitor(farads,volts){return .5*farads*volts*volts/3600}
function flywheel(inertia,rpm){const omega=rpm*Math.PI/30;return .5*inertia*omega*omega/3600}
const systems={capacitor:{name:'Ultracapacitor',energy:5,power:8000,eff:.96,capacityWh:capacitor(100,48)},flywheel:{name:'Flywheel',energy:30,power:2000,eff:.9,capacityWh:flywheel(.02,20000)}};
function bufferStep(type,storedWh,mode,powerW,seconds){const s=systems[type],eta=Math.sqrt(s.eff),requested=powerW*seconds/3600;if(mode==='charge'){const input=Math.min(requested,Math.max(0,s.capacityWh-storedWh)/eta),added=input*eta;return{storedWh:Math.min(s.capacityWh,storedWh+added),inputWh:input,outputWh:0,lossWh:input-added}}if(mode==='discharge'){const removed=Math.min(storedWh,requested/eta),output=removed*eta;return{storedWh:Math.max(0,storedWh-removed),inputWh:0,outputWh:output,lossWh:removed-output}}const retained=type==='flywheel'?storedWh*Math.exp(-.02*seconds/60):storedWh;return{storedWh:retained,inputWh:0,outputWh:0,lossWh:storedWh-retained}}
const api={pack,brake,capacitor,flywheel,systems,bufferStep};if(typeof module!=='undefined')module.exports=api;root.PowerModel=api;
})(typeof window==='undefined'?globalThis:window);
