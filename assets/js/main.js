$(function(){
    /**
     * @대표작품소개_슬라이드
     */
    fetch('./assets/data/mainBanner.json')
    .then(res=>res.json())
    .then(json=>{
        data=json.items;
        let html='';
        data.forEach(element => {
            typeClass=(element.nobadge)?`nobadge`:'';

            moreEl=(element.snippet.relation)?`<div class="more"><img src="./assets/images/badge-more.svg" alt="이 느낌으로 더"></div>`:'';
            wait3El=(element.snippet.wait3)?`<img src="./assets/images/badge-wait3.svg" alt="3시간마다 무료">`:'';
            waitEl=(element.snippet.wait)?`<img src="./assets/images/badge-wait.svg" alt="기다리면 무료">`:'';
            eventEl=(element.snippet.event)?`<img src="./assets/images/badge-event.svg" alt="이벤트">`:'';
            newEl=(element.snippet.new)?`<img src="./assets/images/badge-new.svg" alt="신작">`:'';
            freeEl=(element.snippet.free)?`<img src="./assets/images/badge-free.svg" alt="연재무료">`:'';
            upEl=(element.snippet.up)?`<img src="./assets/images/badge-up.svg" alt="새회차 업로드">`:'';
            dot1El=(element.snippet.dot1)?`<img src="./assets/images/dot.svg" alt>`:'';
            dot2El=(element.snippet.dot2)?`<img src="./assets/images/dot.svg" alt>`:'';
            switch (element.snippet.age) {
                case 19:
                    ageEl=`<img src="./assets/images/badge-19.svg" alt="19세 이용가">`;
                    break;
                case 15:
                    ageEl=`<img src="./assets/images/badge-15.svg" alt="15세 이용가">`;
                    break;
                default:
                    ageEl='';
                    break;
            }
            switch (element.snippet.theme) {
                case 1:
                    themeEl='웹툰';
                    break;
                case 2:
                    themeEl='웹소설';
                    break;
                case 3:
                    themeEl='채팅소설';
                    break;
                case 4:
                    themeEl='책';
                    break;
                default:
                    themeEl='';
                    break;
            }

            html+=`<li class="swiper-slide main-item ${typeClass}">
            <a href="">
                <div class="img-area">
                    <img src="${element.thumb}" alt>
                </div>
                <div class="text-area">
                    <h3 class="title"><img src="${element.title.img}" alt="${element.title.name}"></h3>
                    <div class="desc">${element.desc}</div>
                    <div class="text-wrap">
                        ${moreEl}
                        <div class="badge-box">
                            ${wait3El} ${waitEl} ${eventEl} ${newEl} ${freeEl}
                            ${ageEl} ${upEl}
                        </div>
                        <div class="desc-box">
                            <span>${themeEl}</span>
                            ${dot1El}
                            <span>${element.snippet.cate}</span>
                            ${dot2El}
                            <span>${element.snippet.info}</span>
                        </div>
                    </div>
                </div>
            </a>
            </li>`;
        });
        $('#mainList').html(html);   

        const mainSlide = new Swiper('.main-slide',{
            slidesPerView: 1,
            loop:true,
            autoplay: {
                    delay: 1700,
                    disableOnInteraction: false
            },
            pagination:{
                el:'.fraction',
                type:'fraction'
            },
            breakpoints:{
                767:{
                    slidesPerView: 1.5,
                    spaceBetween:3,
                    centeredSlides:true,
                }
            }
        });
    });
    

    /**
     * @작품리스트
     */
    function productList(sortNum,frame,type){
        fetch('./assets/data/productData.json')
        .then(res=>res.json())
        .then(json=>{
            allData=json.items;
            result = allData.filter(function(data){
                return data.sort.indexOf(sortNum) >= 0;
            });
            let html='';
            result.forEach(element => {

                titleEl = (type === 1)?`<img src="${element.title.img}" alt="${element.title.name}">`:element.title.name

                wait3El=(element.snippet.wait3)?`<img src="./assets/images/badge-wait3.svg" alt="3시간마다 무료">`:'';
                waitEl=(element.snippet.wait)?`<img src="./assets/images/badge-wait.svg" alt="기다리면 무료">`:'';
                eventEl=(element.snippet.event)?`<img src="./assets/images/badge-event.svg" alt="이벤트">`:'';
                newEl=(element.snippet.new)?`<img src="./assets/images/badge-new.svg" alt="신작">`:'';
                freeEl=(element.snippet.free)?`<img src="./assets/images/badge-free.svg" alt="연재무료">`:'';
                upEl=(element.snippet.up)?`<img src="./assets/images/badge-up.svg" alt="새회차 업로드">`:'';
                switch (element.snippet.age) {
                    case 19:
                        ageEl=`<img src="./assets/images/badge-19.svg" alt="19세 이용가">`;
                        break;
                    case 15:
                        ageEl=`<img src="./assets/images/badge-15.svg" alt="15세 이용가">`;
                        break;
                    default:
                        ageEl='';
                        break;
                }
                switch (element.snippet.theme) {
                    case 1:
                        themeEl='웹툰';
                        break;
                    case 2:
                        themeEl='웹소설';
                        break;
                    case 3:
                        themeEl='채팅소설';
                        break;
                    default:
                        themeEl='책';
                        break;
                }
                descEl = (type === 1)?element.snippet.info:themeEl

                html+=`<li class="swiper-slide">
                <a href="">
                    <div class="img-area">
                        <div class="badge-box">
                            <div class="left">
                                ${wait3El} ${waitEl} ${eventEl} ${newEl} ${freeEl} ${upEl}
                            </div>
                            <div class="right">
                                ${ageEl}
                            </div>
                        </div>
                        <img src="${element.thumb}" alt>
                    </div>
                    <div class="text-area">
                        <h3 class="title">${titleEl}</h3>
                        <div class="desc">${descEl}</div>
                    </div>
                </a>
                </li>`;
            });
            $(frame).html(html);
        });
    };
    /**
     * @param sortnum
     * @param frame
     * @param designtype
     * 
     * @sort1 = 3다무-3시간마다무료 웹툰
     * @sort2 = 3다무-3시간마다무료 웹소설
     * @sort3 = 밀리언 페이지
     * @sort4 = #영상화까지! 3다무 웹툰
     * @sort5 = 신작 웹툰 베스트
     */
    productList(1,'#list1',1);
    productList(2,'#list2',1);
    productList(3,'#list3',2);
    productList(4,'#list4',1);
    productList(5,'#list5',1);

    const prdSlide = new Swiper('.prd-slide',{
        slidesPerView: 'auto',
        spaceBetween:3,
        freeMode: true,
    });


    /**
     * @실시간랭킹
     */
    function rankList(sortNum,frame){
        fetch('./assets/data/rankData.json')
        .then(res=>res.json())
        .then(json=>{
            allData=json.items;
            result = allData.filter(function(data){
                return data.sort.indexOf(sortNum) >= 0;
            });
            let html='';
            let rank=1;
            result.forEach(element => {
                wait3El=(element.snippet.wait3)?`<img src="./assets/images/badge-wait3.svg" alt="3시간마다 무료">`:'';
                waitEl=(element.snippet.wait)?`<img src="./assets/images/badge-wait.svg" alt="기다리면 무료">`:'';
                eventEl=(element.snippet.event)?`<img src="./assets/images/badge-event.svg" alt="이벤트">`:'';
                newEl=(element.snippet.new)?`<img src="./assets/images/badge-new.svg" alt="신작">`:'';
                freeEl=(element.snippet.free)?`<img src="./assets/images/badge-free.svg" alt="연재무료">`:'';
                upEl=(element.snippet.up)?`<img src="./assets/images/badge-up.svg" alt="새회차 업로드">`:'';
                dot1El=(element.snippet.dot1)?`<img src="./assets/images/dot2.svg" alt>`:'';
                dot2El=(element.snippet.dot2)?`<img src="./assets/images/dot2.svg" alt>`:'';
                switch (element.snippet.age) {
                    case 19:
                        ageEl=`<img src="./assets/images/badge-19.svg" alt="19세 이용가">`;
                        break;
                    case 15:
                        ageEl=`<img src="./assets/images/badge-15.svg" alt="15세 이용가">`;
                        break;
                    default:
                        ageEl='';
                        break;
                }

                html+=`<li class="prd-item">
                <a href="">
                    <div class="img-area">
                        <div class="badge-box">
                            <div class="left">
                                ${wait3El} ${waitEl} ${eventEl} ${freeEl}
                            </div>
                            <div class="right">
                                ${ageEl}
                            </div>
                        </div>
                        <img src="${element.thumb}" alt>
                    </div>
                    <div class="text-area">
                        <div class="rank">${rank}</div>
                        <h3 class="title">
                            ${upEl} ${newEl} 
                            ${element.title.name}
                        </h3>
                        <div class="desc-box">
                            <span>${element.snippet.cate}</span>
                            ${dot1El}
                            <span>${element.snippet.info1}</span>
                            ${dot2El}
                            <span>${element.snippet.info2}</span>
                        </div>
                    </div>
                </a>
                </li>`;
                rank++;
            });
            $(frame).html(html);
        });
    };
    /**
     * @param sortnum
     * @param frame
     */
    rankList(1,'#rank1')
    rankList(2,'#rank2')

    $('.sc-ranking .group-nav a').click(function(e){
        e.preventDefault();

        target=$(this).data('prd');

        $(this).addClass('active').siblings().removeClass('active');
        $(target).addClass('active').siblings().removeClass('active');
    });


    /**
     * @신작책베스트_슬라이드
     */
    fetch('./assets/data/bookData.json')
    .then(res=>res.json())
    .then(json=>{
        data=json.items;
        let html='';
        data.forEach(element => {
            moreEl=(element.snippet.relation)?`<div class="more"><img src="./assets/images/badge-more.svg" alt="이 느낌으로 더"></div>`:'';
            wait3El=(element.snippet.wait3)?`<img src="./assets/images/badge-wait3.svg" alt="3시간마다 무료">`:'';
            waitEl=(element.snippet.wait)?`<img src="./assets/images/badge-wait.svg" alt="기다리면 무료">`:'';
            eventEl=(element.snippet.event)?`<img src="./assets/images/badge-event.svg" alt="이벤트">`:'';
            newEl=(element.snippet.new)?`<img src="./assets/images/badge-new.svg" alt="신작">`:'';
            freeEl=(element.snippet.free)?`<img src="./assets/images/badge-free.svg" alt="연재무료">`:'';
            upEl=(element.snippet.up)?`<img src="./assets/images/badge-up.svg" alt="새회차 업로드">`:'';
            dot1El=(element.snippet.dot1)?`<img src="./assets/images/dot.svg" alt>`:'';
            dot2El=(element.snippet.dot2)?`<img src="./assets/images/dot.svg" alt>`:'';
            switch (element.snippet.age) {
                case 19:
                    ageEl='성인';
                    break;
                case 15:
                    ageEl='청소년';
                    break;
                default:
                    ageEl='';
                    break;
            }
            switch (element.snippet.theme) {
                case 1:
                    themeEl='웹툰';
                    break;
                case 2:
                    themeEl='웹소설';
                    break;
                case 3:
                    themeEl='채팅소설';
                    break;
                case 4:
                    themeEl='책';
                    break;
                default:
                    themeEl='';
                    break;
            }

            html+=`<li class="swiper-slide book-item ${typeClass}">
            <a href="">
                <div class="img-area">
                    <img src="${element.thumb}" alt>
                </div>
                <div class="text-area">
                    <h3 class="title"><img src="${element.title.img}" alt="${element.title.name}"></h3>
                    <div class="desc">${element.desc}</div>
                    <div class="text-wrap">
                        ${moreEl}
                        <div class="badge-box">
                            ${wait3El} ${waitEl} ${eventEl} ${newEl} ${freeEl}
                            ${ageEl} ${upEl}
                        </div>
                        <div class="desc-box">
                            <span>${themeEl}</span>
                            ${dot1El}
                            <span>${element.snippet.cate}</span>
                            ${dot2El}
                            <span>${element.snippet.info}</span>
                        </div>
                    </div>
                </div>
            </a>
            </li>`;
        });
        $('#bookList').html(html);  

        const bookSlide = new Swiper('.book-slide',{
            loop:true,
            slidesPerView: 1,
            autoplay: {
                    delay: 1700,
                    disableOnInteraction: false
                },
            pagination:{
                el:'.fraction',
                type:'fraction'
            },
            breakpoints:{
                767:{
                    slidesPerView: 2,
                    spaceBetween:10,
                },
            }
        });

        $(function(){
            if(window.innerWidth >= 768) {
                bookSlide.disable();
                bookSlide.autoplay.disable();
            }else{
                bookSlide.enable();
                bookSlide.autoplay.start();
            }
        });
        $(window).resize(function(){
            if(window.innerWidth >= 768){
                bookSlide.disable();
                bookSlide.autoplay.disable();
            }else{
                bookSlide.enable();
                bookSlide.autoplay.start();
            }
        });
    });


    /**
     * @이벤트배너
     */
    fetch('./assets/data/eventData.json')
    .then(res=>res.json())
    .then(json=>{
        data=json.items;
        let html='';
        data.forEach(element => {
            html+=`<li class="event-item">
            <a href="">
                <div class="img-area">
                    <img src="${element.thumb}" alt="${element.title.name} ${element.desc}">
                </div>
            </a>
            </li>`;    
        });
        $('#event').html(html);
    });


    /**
     * @푸터사업자정보_버튼
     */
    $('.btn-addr').click(function(){
        $('.addr-area').toggleClass('on');
    });
});