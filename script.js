const get_courses=async ()=>{
    let response=await fetch("http://localhost:3000/courses");
    let json=await response.json();
    //console.log(json);
    return json;
}

function search(){
    const search=document.querySelector(".search-input").value;
    const courses_element=document.querySelector(".py-crses");
    
    while (courses_element.firstChild) {
        courses_element.removeChild(courses_element.lastChild);
    }
    json2.then((json)=>{
        const courses_element=document.querySelector(".py-crses");
        for (const course_key in json){
            const course=json[course_key];
            if(!(course["title"].toLowerCase().includes(search.toLowerCase())))continue;
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

let json2=get_courses();
json2.then((json)=>{
    const courses_element=document.querySelector(".py-crses");
    for (const course_key in json){
        const course=json[course_key];
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