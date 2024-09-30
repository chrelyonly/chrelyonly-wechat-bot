import{i as r}from"./vue-demi-Dq6ymT-8.js";import{i as p,b as l,E as u}from"./@vue-D1btLb8d.js";/*!
 * pinia v2.2.2
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */const f=Symbol();var o;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(o||(o={}));function b(){const t=p(!0),s=t.run(()=>l({}));let a=[],c=[];const i=u({install(e){i._a=e,e.provide(f,i),e.config.globalProperties.$pinia=i,c.forEach(n=>a.push(n)),c=[]},use(e){return!this._a&&!r?c.push(e):a.push(e),this},_p:a,_a:null,_e:t,_s:new Map,state:s});return i}export{b as c};
