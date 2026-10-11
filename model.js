(function(root){
const profiles={sodium:{name:'Sodium-ion',symbol:'Na⁺',reserve:.1,efficiency:.92,specificEnergy:140,cycles:3000,cost:9000,negative:'Hard carbon',positive:'Sodium host material',carrier:'Sodium ions (Na⁺)'},lead:{name:'Lead-acid',symbol:'Pb',reserve:.5,efficiency:.8,specificEnergy:40,cycles:600,cost:6000,negative:'Sponge lead (Pb)',positive:'Lead dioxide (PbO₂)',carrier:'H⁺ and SO₄²⁻'}};
function thermalFactor(t){return Math.max(.55,1-Math.max(0,10-t)*.012-Math.max(0,t-35)*.006)}
function calculate(s){const p=profiles[s.chem],eta=Math.sqrt(p.efficiency),effective=s.capacity*thermalFactor(s.temperature),available=Math.max(0,s.soc/100-p.reserve)*effective*eta,power=s.mode==='idle'?0:s.load,remaining=s.mode==='charge'?(1-s.soc/100)*effective/eta:available;return{p,eta,effective,available,power,runtime:power>0?remaining/(power/1000):Infinity,voltage:(s.chem==='sodium'?44:46)+(s.soc/100)*(s.chem==='sodium'?8:5)}}
function step(s,hours){const m=calculate(s);let next=s.soc;if(s.mode==='charge')next+=s.load/1000*m.eta*hours/m.effective*100;if(s.mode==='discharge')next-=s.load/1000/m.eta*hours/m.effective*100;return Math.max(s.mode==='discharge'?Math.min(s.soc,m.p.reserve*100):0,Math.min(100,next))}
const api={profiles,thermalFactor,calculate,step};if(typeof module!=='undefined')module.exports=api;root.BatteryModel=api;
})(typeof window==='undefined'?globalThis:window);
