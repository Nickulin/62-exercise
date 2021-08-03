window.addEventListener("DOMContentLoaded", ()=> {

    const tabs = document.querySelectorAll('.tabheader__item '),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabParent = document.querySelector(".tabheader__items");

        console.log('dsdaf');

    function hideContent(){
        tabsContent.forEach(item =>{
            item.classList.add("hide");
            item.classList.remove("show", 'fade');
        });  
        
        tabs.forEach(item =>{
            item.classList.remove("tabheader__item_active");
        });  
    }

    function showContent(i = 0) { // i = 0 можно так
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }
    hideContent();
    showContent();

    tabParent.addEventListener('click', (event)=>{
        const target = event.target;
        if (target && target.classList.contains("tabheader__item")){
            tabs.forEach((item, i)=>{ // (item, i) в скобках, как одна переменная
                if ( target == item ){
                    hideContent();
                    showContent(i);
                }
            });
        }
    });

    //timer 

    const deadline = "2021-09-01";
    
    
    function getTimeRemaining(endtime){
         const t = Date.parse(endtime) - Date.parse(new Date()),
         days = Math.floor(t/(1000*60*60*24)),
         hours = Math.floor((t/1000/60/60)%24),
         minutes = Math.floor((t/1000/60)%60),
         seconds = Math.floor((t/1000)%60);
         
         return{
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
         };
    }
    function zero(num){
        if(num<10 && num >=0){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function timeUpdate(selector, endtime){
        const a = document.querySelector(selector),
        days = a.querySelector("#days"),
        hours = a.querySelector("#hours"),
        minutes = a.querySelector("#minutes"),
        seconds = a.querySelector("#seconds"),
        setTime = setInterval(setClock, 1000);

        setClock();

        function setClock(){
           const t = getTimeRemaining(endtime);
           if (t.total <= 0){
               clearInterval(timeUpdate);
               days.innerHTML = 0;
               minutes.innerHTML = 0;
               hours.innerHTML = 0;
               seconds.innerHTML = 0;
           }else{
            days.innerHTML = zero(t.days);
            minutes.innerHTML = zero(t.minutes);
            hours.innerHTML = zero(t.hours);
            seconds.innerHTML = zero(t.seconds);
           }
        }
    }
    timeUpdate(".timer" , deadline);

    // modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modalClose = document.querySelector('[data-close]'),
          modal = document.querySelector(".modal");

    function openModal (){
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden"; // none scroll down top
        clearInterval(modalTimeout);
    }

    modalTrigger.forEach(item =>{
        item.addEventListener("click", openModal);
    });  

    function closeModal(){
        modal.classList.remove("show");
        modal.classList.add("hide");
        document.body.style.overflow = ""; // scroll , 'visible'
     }

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e)=>{
        if (e.target === modal){
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) =>{//m-l.c-t.c-s("show")всегда будет срабатывать если не прописать
        if (e.code === 'Escape' && modal.classList.contains("show")){ // e.which == 27 https://keycode.info/
            closeModal();  
        }
    });

    const modalTimeout = setTimeout( openModal, 50000);

    function showOnceModal(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal(); // open only in down
            window.removeEventListener('scroll', showOnceModal); // удалит саму себя, при однократном выполнении
        }
    }
    window.addEventListener('scroll', showOnceModal);

    //homework
   class MenuCard {
       constructor (src, alt, subtitle, title, price, parentName){
           this.src = src;
           this.alt = alt;
           this.subtitle = subtitle;
           this.title = title;
           this.price = price;
           this.mnoj = 22;
           this.parent = document.querySelector(parentName);
           this.changeToUAH();
       }
       changeToUAH(){
           this.price = this.price * this.mnoj;
       }
       render(){
           const element = document.createElement('div');
           element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.title}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
           `
           this.parent.append(element);
       }
   }
    new MenuCard("img/tabs/vegy.jpg",
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    '5',
    '.menu .container'
    ).render();

    new MenuCard("img/tabs/elite.jpg",
    'elite',
    'Меню "“Премиум”"',
    'Меню "“Премиум”" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    '15',
    '.menu .container'
    ).render();

    new MenuCard("img/tabs/post.jpg",
    'post',
    'Меню "Постное"',
    'Меню "Постное" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    '21',
    '.menu .container'
    ).render();

    //FORMS
    // есть два формата json и formDate
    const forms = document.querySelectorAll("form");
    const message = {
        loading: 'Загрузка',
        succes: 'Спасибо! скоро с вами свяжемся',
        failure: 'Не получилось',
    }

    forms.forEach(item =>{ // подвязываем form к postDate
        postDate(item);
    })

    function postDate(form){//Очень удобно навесить событие
        form.addEventListener("submit", (event)=>{// submit -отправка.
            event.preventDefault();

            const statusMessage = document.createElement("div");
            statusMessage.classList.add("status");// просто сделали для эксперимента и не использовали
            statusMessage.textContent = message.loading;   // textContent добавляем текст а не контент
            form.append(statusMessage);

            const request = new XMLHttpRequest(); // передача данных ассинхроно или синхроно
            request.open("POST", "server.php"); // настройка запроса

            request.setRequestHeader("Content-type", 'application/json');// application/json к current.json, multipart к FormData
            const formData = new FormData(form); // из чего берем данные!!! смотрим input в верстке, там всегда должен быть "name=.."
        
            const object = {};
            formData.forEach( (value, key) =>{// перебор данных
                object[key] = value;
            });

            const json = JSON.stringify(object);// преобразует данные JavaScript в строку JSON, JSON.parse()-наоборот
            
            request.send(json); // formData если бы не было перебора. отправляем данные 

            request.addEventListener("load", () =>{
                if(request.status === 200 ){
                    console.log(request.response);
                    statusMessage.textContent = message.succes;
                    form.reset();// очистка input.value 
                    setTimeout(()=>{// через 2 сек удаляем новый элемент
                        statusMessage.remove();
                    },2000);
                }else{
                    statusMessage.textContent = message.failure;
                }
            });
        })
    }
   
});