import{s as T,n as b}from"../chunks/scheduler.BvLojk_z.js";import{S as j,i as q,e as g,s as k,c as v,h as x,g as H,a as y,f as p,b as N,j as c,k as B,l as D,m as L,n as M}from"../chunks/index.D8_uDsy1.js";import{e as I}from"../chunks/each.D6YF6ztN.js";function A(r,t,l){const s=r.slice();return s[2]=t[l],s}function S(r){let t,l,s,m=r[2].title+"",o,i;return{c(){t=g("a"),l=g("article"),s=g("h3"),o=D(m),i=k(),this.h()},l(u){t=v(u,"A",{href:!0});var h=x(t);l=v(h,"ARTICLE",{});var f=x(l);s=v(f,"H3",{});var _=x(s);o=L(_,m),_.forEach(p),f.forEach(p),i=y(h),h.forEach(p),this.h()},h(){M(t,"href","/blog/"+r[2].slug)},m(u,h){N(u,t,h),c(t,l),c(l,s),c(s,o),c(t,i)},p:b,d(u){u&&p(t)}}}function O(r){let t,l,s="Home",m,o,i,u="Blog",h,f,_=I(r[0]),n=[];for(let a=0;a<_.length;a+=1)n[a]=S(A(r,_,a));return{c(){t=g("main"),l=g("h1"),l.textContent=s,m=k(),o=g("section"),i=g("h2"),i.textContent=u,h=k(),f=g("div");for(let a=0;a<n.length;a+=1)n[a].c()},l(a){t=v(a,"MAIN",{});var d=x(t);l=v(d,"H1",{"data-svelte-h":!0}),H(l)!=="svelte-1axyf4f"&&(l.textContent=s),m=y(d),o=v(d,"SECTION",{});var e=x(o);i=v(e,"H2",{"data-svelte-h":!0}),H(i)!=="svelte-mggmmu"&&(i.textContent=u),h=y(e),f=v(e,"DIV",{});var C=x(f);for(let E=0;E<n.length;E+=1)n[E].l(C);C.forEach(p),e.forEach(p),d.forEach(p)},m(a,d){N(a,t,d),c(t,l),c(t,m),c(t,o),c(o,i),c(o,h),c(o,f);for(let e=0;e<n.length;e+=1)n[e]&&n[e].m(f,null)},p(a,[d]){if(d&1){_=I(a[0]);let e;for(e=0;e<_.length;e+=1){const C=A(a,_,e);n[e]?n[e].p(C,d):(n[e]=S(C),n[e].c(),n[e].m(f,null))}for(;e<n.length;e+=1)n[e].d(1);n.length=_.length}},i:b,o:b,d(a){a&&p(t),B(n,a)}}}function P(r,t,l){let{data:s}=t;const m=s.posts;return r.$$set=o=>{"data"in o&&l(1,s=o.data)},[m,s]}class z extends j{constructor(t){super(),q(this,t,P,O,T,{data:1})}}export{z as component};
