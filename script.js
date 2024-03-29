const get_courses=async ()=>{
    let response=await fetch("http://localhost:3000/categories");
    let json=await response.json();
    //console.log(json);
    return json;
}

function search(){
    const search=document.querySelector(".search-input").value;
    const courses_element=document.querySelector(".courses");
    
    while (courses_element.childElementCount) {
        courses_element.removeChild(courses_element.lastChild);
    }
    courses_element.classList.add("d-flex");
    courses_element.classList.add("flex-wrap");
    courses_element.classList.add("justify-content-between");
    json2.then((json)=>{
        json=json[0]["courses"]
        const courses_element=document.querySelector(".courses");
        for (const course_key in json){
            const course=json[course_key];
            if(!(course["title"].toLowerCase().includes(search.toLowerCase())))continue;
            //console.log(course);
            const newcourse_element=document.createElement("div");
            newcourse_element.classList.add("py-crs");
            newcourse_element.classList.add("m-2");
    
            const cover=document.createElement("img");
            cover.classList.add("crs-img");
            cover.setAttribute("src",course["cover-image"]);
            newcourse_element.appendChild(cover);
    
            const title=document.createElement("h3");
            title.classList.add("crs-name");
            title.textContent=course["title"];
    
    
            newcourse_element.appendChild(title);
    
            const instructor=document.createElement("h6");
            instructor.textContent=course["instructor"]
    
            newcourse_element.appendChild(instructor);
            
            const rate=document.createElement("div");
            rate.classList.add("rate");
            const rate_label=document.createElement("label");
            rate_label.textContent=course["rate"];
            rate.appendChild(rate_label);
            const rate_stars=document.createElement("img");
            rate_stars.setAttribute("src","images/4_5_StarRating.png");
            rate_stars.classList.add("stars_rate");
            rate.appendChild(rate_stars);
    
            newcourse_element.appendChild(rate);
    
            const price=document.createElement("h4");
            price.textContent="E£"+course["price"];
            
            const old_price=document.createElement("strike");
            old_price.textContent="E£"+course["old-price"];
            price.appendChild(old_price);
    
            newcourse_element.appendChild(price);
            courses_element.appendChild(newcourse_element);
    
        }
    })
}
let width_body=document.body.clientWidth;
let op;
if(width_body<750){
    op=1
}else if(width_body<1050){
    op=2
}else if(width_body<1400){
    op=3
}else{
    op=4;
}
let json2=get_courses();

let courses_json;
json2.then((json)=>{
    courses_json=json;
    for(const cat in json){
        //TODO add tabs per category
        const tabs_element=document.querySelector("#myTab");
        const course_tab=document.createElement("li");
        course_tab.classList.add("nav-item");
        course_tab.setAttribute("role","presentation");

        const tab_button=document.createElement("button");
        tab_button.classList.add("nav-link-courses");
        tab_button.classList.add("fw-bold");
        tab_button.classList.add("border-0");
        if(cat==0){
            tab_button.classList.add("active");
        }
        tab_button.textContent=json[cat]["name"];
        tab_button.setAttribute("id",`${json[cat]["name"]}-tab`);
        tab_button.setAttribute("data-bs-toggle",`tab`);
        tab_button.setAttribute("data-bs-target",`#${json[cat]["name"]}-tab-pane`);
        tab_button.setAttribute("type",`button`);
        tab_button.setAttribute("role",`tab`);
        tab_button.setAttribute("aria-controls",`excel-tab-pane"`);
        tab_button.setAttribute("aria-selected",`true`);
        

        course_tab.appendChild(tab_button);
        tabs_element.appendChild(course_tab);


        //TODO add courses-panel per category
        const content=document.querySelector("#myTabContent");
        const panel=document.createElement("div");
        panel.classList.add("tab-pane");
        panel.classList.add("fade");
        if(cat==0){
            panel.classList.add("show");
            panel.classList.add("active");
        }
        panel.classList.add("tab-crs");
        panel.setAttribute("id",`${json[cat]["name"]}-tab-pane`);
        panel.setAttribute("role","tabpanel");
        panel.setAttribute("aria-labelledby",`${json[cat]["name"]}-tab`)
        panel.setAttribute("tabindex",cat);

        const course_header=document.createElement("h2");
        course_header.textContent=`Expand your career opportunities with ${json[cat]["name"]}`;
        panel.appendChild(course_header);

        const course_breif=document.createElement("p");
        course_breif.classList.add("brief-crs");
        course_breif.textContent=json[cat]["brief"];
        panel.appendChild(course_breif);

        const explore_button=document.createElement("button");
        explore_button.classList.add("explore-btn");
        explore_button.classList.add("nav-btn");
        explore_button.textContent=`Explore ${json[cat]["name"]}`
        panel.appendChild(explore_button);
        /** 
        const courses_panel=document.createElement("div");
        courses_panel.classList.add("py-crses");
        courses_panel.classList.add(`${json[cat]["name"]}-courses`);
        panel.appendChild(courses_panel);*/
        const courses_panel=document.createElement("div");
        courses_panel.classList.add("carousel");
        courses_panel.classList.add("slide");
        courses_panel.setAttribute("id",`${json[cat]["name"]}-carousel`);
        courses_panel.setAttribute("data-bs-ride","carousel");

        const inner_carousel=document.createElement("div");
        inner_carousel.classList.add("carousel-inner");

        for(let i=0;i<json[cat]["courses"].length/op;i++){
            const carousel_item=document.createElement("div");
            carousel_item.classList.add("carousel-item");
            if(i==0){
                carousel_item.classList.add("active");
            }

            const flexing=document.createElement("div");
            flexing.classList.add("d-flex");
            flexing.classList.add("flex-row");
            flexing.classList.add("course-wraper");
            flexing.setAttribute("id",`${json[cat]["name"]}-${i}`);

            carousel_item.appendChild(flexing);

            inner_carousel.appendChild(carousel_item);
        }
        
        courses_panel.appendChild(inner_carousel);
        const carousel_btns=document.createElement("div");
        const prev_btn=document.createElement("button");
        prev_btn.classList.add("carousel-control-prev");
        prev_btn.classList.add("carousel-btn");
        prev_btn.setAttribute("type","button");
        prev_btn.setAttribute("data-bs-target",`#${json[cat]["name"]}-carousel`);
        prev_btn.setAttribute("data-bs-slide","prev");
        const span_carousel1=document.createElement("span");
        span_carousel1.classList.add("carousel-control-prev-icon");
        span_carousel1.setAttribute("aria-hidden","true");
        prev_btn.appendChild(span_carousel1);
        const span_carousel2=document.createElement("span");
        span_carousel2.classList.add("visually-hidden");
        
        prev_btn.appendChild(span_carousel2);
        carousel_btns.appendChild(prev_btn);

        const next_btn=document.createElement("button");
        next_btn.classList.add("carousel-control-next");
        next_btn.classList.add("carousel-btn");
        next_btn.setAttribute("type","button");
        next_btn.setAttribute("data-bs-target",`#${json[cat]["name"]}-carousel`);
        next_btn.setAttribute("data-bs-slide","next");
        const span_carousel1_next=document.createElement("span");
        span_carousel1_next.classList.add("carousel-control-next-icon");
        span_carousel1_next.setAttribute("aria-hidden","true");
        next_btn.appendChild(span_carousel1_next);
        const span_carousel2_next=document.createElement("span");
        span_carousel2.classList.add("visually-hidden");
        
        next_btn.appendChild(span_carousel2_next);
        carousel_btns.appendChild(prev_btn);
        carousel_btns.appendChild(next_btn);
        courses_panel.appendChild(carousel_btns);

        panel.appendChild(courses_panel);

        content.appendChild(panel);

    }
    console.log(json);
    
    for(const cat in json){
        //TODO add courses per category
        
        //console.log(cat);
        for (const course_key in json[cat]["courses"]){
            const courses_element=document.querySelector(`#${json[cat]["name"]}-${Math.floor(course_key/op)}`);
            console.log(`.${json[cat]["name"]}-${Math.floor(course_key/op)}`);
            const course=json[cat]["courses"][course_key];
            //console.log(course);
            //console.log(course);
            const newcourse_element=document.createElement("div");
            newcourse_element.classList.add("py-crs");

            const cover=document.createElement("img");
            cover.classList.add("crs-img");
            cover.setAttribute("src",course["cover-image"]);
            newcourse_element.appendChild(cover);

            const title=document.createElement("h3");
            title.classList.add("crs-name");
            title.textContent=course["title"];


            newcourse_element.appendChild(title);

            const instructor=document.createElement("h6");
            instructor.textContent=course["instructor"]

            newcourse_element.appendChild(instructor);
            
            const rate=document.createElement("div");
            rate.classList.add("rate");
            const rate_label=document.createElement("label");
            rate_label.textContent=course["rate"];
            rate.appendChild(rate_label);
            const rate_stars=document.createElement("img");
            rate_stars.setAttribute("src","images/4_5_StarRating.png");
            rate_stars.classList.add("stars_rate");
            rate.appendChild(rate_stars);

            newcourse_element.appendChild(rate);

            const price=document.createElement("h4");
            price.textContent="E£"+course["price"];
            
            const old_price=document.createElement("strike");
            old_price.textContent="E£"+course["old-price"];
            price.appendChild(old_price);

            newcourse_element.appendChild(price);
            courses_element.appendChild(newcourse_element);

        }
    }
    
})

function rendercourses(){
    width_body=document.body.clientWidth;
    if(width_body<750){
        op=1
    }else if(width_body<1050){
        op=2
    }else if(width_body<1400){
        op=3
    }else{
        op=4;
    }
    let json=courses_json;
    const pretabs_element=document.querySelector("#myTab");
    while(pretabs_element.firstChild)pretabs_element.firstChild.remove();
    const precontent=document.querySelector("#myTabContent");
    while(precontent.firstChild)precontent.firstChild.remove();
    for(const cat in json){
        //TODO add tabs per category
        const tabs_element=document.querySelector("#myTab");
        const course_tab=document.createElement("li");
        course_tab.classList.add("nav-item");
        course_tab.setAttribute("role","presentation");

        const tab_button=document.createElement("button");
        tab_button.classList.add("nav-link-courses");
        tab_button.classList.add("fw-bold");
        tab_button.classList.add("border-0");
        if(cat==0){
            tab_button.classList.add("active");
        }
        tab_button.textContent=json[cat]["name"];
        tab_button.setAttribute("id",`${json[cat]["name"]}-tab`);
        tab_button.setAttribute("data-bs-toggle",`tab`);
        tab_button.setAttribute("data-bs-target",`#${json[cat]["name"]}-tab-pane`);
        tab_button.setAttribute("type",`button`);
        tab_button.setAttribute("role",`tab`);
        tab_button.setAttribute("aria-controls",`excel-tab-pane"`);
        tab_button.setAttribute("aria-selected",`true`);
        

        course_tab.appendChild(tab_button);
        tabs_element.appendChild(course_tab);


        //TODO add courses-panel per category
        const content=document.querySelector("#myTabContent");
        const panel=document.createElement("div");
        panel.classList.add("tab-pane");
        panel.classList.add("fade");
        if(cat==0){
            panel.classList.add("show");
            panel.classList.add("active");
        }
        panel.classList.add("tab-crs");
        panel.setAttribute("id",`${json[cat]["name"]}-tab-pane`);
        panel.setAttribute("role","tabpanel");
        panel.setAttribute("aria-labelledby",`${json[cat]["name"]}-tab`)
        panel.setAttribute("tabindex",cat);

        const course_header=document.createElement("h2");
        course_header.textContent=`Expand your career opportunities with ${json[cat]["name"]}`;
        panel.appendChild(course_header);

        const course_breif=document.createElement("p");
        course_breif.classList.add("brief-crs");
        course_breif.textContent=json[cat]["brief"];
        panel.appendChild(course_breif);

        const explore_button=document.createElement("button");
        explore_button.classList.add("explore-btn");
        explore_button.classList.add("nav-btn");
        explore_button.textContent=`Explore ${json[cat]["name"]}`
        panel.appendChild(explore_button);
        /** 
        const courses_panel=document.createElement("div");
        courses_panel.classList.add("py-crses");
        courses_panel.classList.add(`${json[cat]["name"]}-courses`);
        panel.appendChild(courses_panel);*/
        const courses_panel=document.createElement("div");
        courses_panel.classList.add("carousel");
        courses_panel.classList.add("slide");
        courses_panel.setAttribute("id",`${json[cat]["name"]}-carousel`);
        courses_panel.setAttribute("data-bs-ride","carousel");

        const inner_carousel=document.createElement("div");
        inner_carousel.classList.add("carousel-inner");

        for(let i=0;i<json[cat]["courses"].length/op;i++){
            const carousel_item=document.createElement("div");
            carousel_item.classList.add("carousel-item");
            if(i==0){
                carousel_item.classList.add("active");
            }

            const flexing=document.createElement("div");
            flexing.classList.add("d-flex");
            flexing.classList.add("flex-row");
            flexing.classList.add("course-wraper");
            flexing.setAttribute("id",`${json[cat]["name"]}-${i}`);

            carousel_item.appendChild(flexing);

            inner_carousel.appendChild(carousel_item);
        }
        
        courses_panel.appendChild(inner_carousel);
        const carousel_btns=document.createElement("div");
        const prev_btn=document.createElement("button");
        prev_btn.classList.add("carousel-control-prev");
        prev_btn.classList.add("carousel-btn");
        prev_btn.setAttribute("type","button");
        prev_btn.setAttribute("data-bs-target",`#${json[cat]["name"]}-carousel`);
        prev_btn.setAttribute("data-bs-slide","prev");
        const span_carousel1=document.createElement("span");
        span_carousel1.classList.add("carousel-control-prev-icon");
        span_carousel1.setAttribute("aria-hidden","true");
        prev_btn.appendChild(span_carousel1);
        const span_carousel2=document.createElement("span");
        span_carousel2.classList.add("visually-hidden");
        
        prev_btn.appendChild(span_carousel2);
        carousel_btns.appendChild(prev_btn);

        const next_btn=document.createElement("button");
        next_btn.classList.add("carousel-control-next");
        next_btn.classList.add("carousel-btn");
        next_btn.setAttribute("type","button");
        next_btn.setAttribute("data-bs-target",`#${json[cat]["name"]}-carousel`);
        next_btn.setAttribute("data-bs-slide","next");
        const span_carousel1_next=document.createElement("span");
        span_carousel1_next.classList.add("carousel-control-next-icon");
        span_carousel1_next.setAttribute("aria-hidden","true");
        next_btn.appendChild(span_carousel1_next);
        const span_carousel2_next=document.createElement("span");
        span_carousel2.classList.add("visually-hidden");
        
        next_btn.appendChild(span_carousel2_next);
        carousel_btns.appendChild(prev_btn);
        carousel_btns.appendChild(next_btn);
        courses_panel.appendChild(carousel_btns);

        panel.appendChild(courses_panel);

        content.appendChild(panel);

    }
    console.log(json);
    
    for(const cat in json){
        //TODO add courses per category
        
        //console.log(cat);
        for (const course_key in json[cat]["courses"]){
            const courses_element=document.querySelector(`#${json[cat]["name"]}-${Math.floor(course_key/op)}`);
            console.log(`.${json[cat]["name"]}-${Math.floor(course_key/op)}`);
            const course=json[cat]["courses"][course_key];
            //console.log(course);
            //console.log(course);
            const newcourse_element=document.createElement("div");
            newcourse_element.classList.add("py-crs");

            const cover=document.createElement("img");
            cover.classList.add("crs-img");
            cover.setAttribute("src",course["cover-image"]);
            newcourse_element.appendChild(cover);

            const title=document.createElement("h3");
            title.classList.add("crs-name");
            title.textContent=course["title"];


            newcourse_element.appendChild(title);

            const instructor=document.createElement("h6");
            instructor.textContent=course["instructor"]

            newcourse_element.appendChild(instructor);
            
            const rate=document.createElement("div");
            rate.classList.add("rate");
            const rate_label=document.createElement("label");
            rate_label.textContent=course["rate"];
            rate.appendChild(rate_label);
            const rate_stars=document.createElement("img");
            rate_stars.setAttribute("src","images/4_5_StarRating.png");
            rate_stars.classList.add("stars_rate");
            rate.appendChild(rate_stars);

            newcourse_element.appendChild(rate);

            const price=document.createElement("h4");
            price.textContent="E£"+course["price"];
            
            const old_price=document.createElement("strike");
            old_price.textContent="E£"+course["old-price"];
            price.appendChild(old_price);

            newcourse_element.appendChild(price);
            courses_element.appendChild(newcourse_element);

        }
    }
}
window.addEventListener('resize', rendercourses);