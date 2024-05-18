import{a as L,i as h,S as w}from"./assets/vendor-eded45c0.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const v=t=>t.reduce((i,{tags:a,webformatURL:r,largeImageURL:e,likes:s,views:c,comments:g,downloads:y})=>i+`<li class="photo-container">
        <a href=${e} class="card-link js-card-link">
            <img class="photo" src="${r}" alt="${a}">
        </a>
        <div class="info">
            <div class="info-item">
                <span class="title">Likes</span>
                <span class="info">${s}</span>
            </div>
            <div class="info-item">
                <span class="title">Views</span>
                <span class="info">${c}</span>
            </div>
            <div class="info-item">
                <span class="title">Comments</span>
                <span class="info">${g}</span>
            </div>
            <div class="info-item">
                <span class="title">Downloads</span>
                <span class="info">${y}</span>
            </div>
        </div>
      </li>`,""),P="43826877-794dcc159b12a8b36c7bc4349",S="https://pixabay.com/api/",b=async(t,i=1,a=15)=>{const r=new URLSearchParams({key:P,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:a,page:i});try{return(await L.get(`${S}/?${r}`)).data}catch{throw new Error("Sorry, something went wrong with the API request.")}},d=document.querySelector(".gallery"),q=document.querySelector(".search-form"),n=document.querySelector(".loader"),o=document.querySelector(".btn");let u="",l=1,m=15,p=null;async function f(){try{const t=await b(u,l);if(t.hits.length===0&&l===1){h.error({position:"topRight",timeout:2e3,message:"Sorry, there are no images matching your search query. Please try again!"}),o.classList.add("is-hidden");return}const i=d.getBoundingClientRect().height;d.innerHTML+=v(t.hits);const r=d.getBoundingClientRect().height-i;window.scrollBy({top:r,behavior:"smooth"}),p?p.refresh():p=new w(".gallery a",{captionsData:"alt",captionsDelay:250}),t.hits.length<m?n.classList.add("is-hidden"):n.classList.remove("is-hidden"),o.classList.remove("is-hidden")}catch{h.error({position:"topRight",timeout:2e3,message:"Sorry, something went wrong. Please try again!"})}finally{n.classList.add("is-hidden"),o.classList.remove("is-hidden")}}async function R(t){if(t.preventDefault(),u=t.target.elements.searchKeyword.value.trim(),d.innerHTML="",l=1,o.classList.add("is-hidden"),n.classList.remove("is-hidden"),u===""){h.error({position:"topRight",timeout:2e3,message:"Please enter a search query!"}),n.classList.add("is-hidden");return}await f(),t.target.reset()}async function $(){l+=1;const t=Math.ceil(100/m);if(l>t)return o.classList.add("is-hidden"),h.error({position:"topRight",message:"We're sorry, there are no more posts to load"});o.classList.add("is-hidden"),n.classList.remove("is-hidden"),await f()}q.addEventListener("submit",R);o.addEventListener("click",$);
//# sourceMappingURL=commonHelpers.js.map