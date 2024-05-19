import{a as w,i as u,S as v}from"./assets/vendor-eded45c0.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const b=t=>t.reduce((i,{tags:o,webformatURL:r,largeImageURL:e,likes:s,views:c,comments:y,downloads:L})=>i+`<li class="photo-container">
        <a href=${e} class="card-link js-card-link">
            <img class="photo" src="${r}" alt="${o}">
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
                <span class="info">${y}</span>
            </div>
            <div class="info-item">
                <span class="title">Downloads</span>
                <span class="info">${L}</span>
            </div>
        </div>
      </li>`,""),P="43826877-794dcc159b12a8b36c7bc4349",S="https://pixabay.com/api/",q=async(t,i=1,o=15)=>{const r=new URLSearchParams({key:P,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:o,page:i});try{return(await w.get(`${S}/?${r}`)).data}catch{throw new Error("Sorry, something went wrong with the API request.")}},d=document.querySelector(".gallery"),$=document.querySelector(".search-form"),n=document.querySelector(".loader"),a=document.querySelector(".btn");let p="",l=1,m=15,f=0,h=null;async function g(){try{const t=await q(p,l);if(f=Math.ceil(t.totalHits/m),t.hits.length===0&&l===1){u.error({position:"topRight",timeout:2e3,message:"Sorry, there are no images matching your search query. Please try again!"}),a.classList.add("is-hidden"),n.classList.add("is-hidden");return}const i=d.getBoundingClientRect().height;d.insertAdjacentHTML("beforeend",b(t.hits));const r=d.getBoundingClientRect().height-i;window.scrollBy({top:r,behavior:"smooth"}),h?h.refresh():h=new v(".gallery a",{captionsData:"alt",captionsDelay:250}),l>=f||t.hits.length<m?a.classList.add("is-hidden"):a.classList.remove("is-hidden"),n.classList.add("is-hidden")}catch{u.error({position:"topRight",timeout:2e3,message:"Sorry, something went wrong. Please try again!"}),n.classList.add("is-hidden"),a.classList.remove("is-hidden")}}async function R(t){if(t.preventDefault(),p=t.target.elements.searchKeyword.value.trim(),d.innerHTML="",l=1,a.classList.add("is-hidden"),n.classList.remove("is-hidden"),p===""){u.error({position:"topRight",timeout:2e3,message:"Please enter a search query!"}),n.classList.add("is-hidden");return}await g(),t.target.reset()}async function E(){l+=1,a.classList.add("is-hidden"),n.classList.remove("is-hidden"),await g()}$.addEventListener("submit",R);a.addEventListener("click",E);
//# sourceMappingURL=commonHelpers.js.map
