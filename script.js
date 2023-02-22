// function varTest() {
//     var x = 1;
//     console.log(x, 'a')
//     if (true) {
//         var x = 2; // область видимости у var будет на глобальном уровне всегда кроме в функциях
//         console.log(x, 'b')
//     }
//     console.log(x, 'c');
// }
// varTest();

// const letTest = () => {
//     let x = 1
//     console.log(x, 'a')
//     if (true) {
//         let x = 2 // область видимости у let будет на локальном уровне
//         console.log(x, 'b')
//     }
//     console.log(x, 'c')
// }
// letTest();

// const btns = document.querySelectorAll('button');
// console.log(btns);

// btns.forEach((item) => {
//     // console.log(item)
//     item.addEventListener('click', (event) => {
//         console.log(event.target)
//         // первый вариант записи
//         // if (event.target.classList.contains('red')) {
//         //     event.target.classList.remove('red');
//         // }else {
//         //     event.target.classList.add('red');
//         // }

//         // второй вариант записи, проверяет теги на наличие классов
//         event.target.classList.toggle('red');
//     })
// })

// // создаем кнопку через js
// const wrapper = document.querySelector('.wrapper');
// const newBtn = document.createElement('button');

// wrapper.append(newBtn); // засовывает кнопку в newBtn

// wrapper.addEventListener('click', (event) => {
//     console.dir(event.target);
//     if (event.target.tagName === 'BUTTON') {
//         if (event.target.classList.contains('red')) {
//             event.target.classList.remove('red');
//         }else {
//             event.target.classList.add('red');
//         }
//     }
// })

// const arr = [1, 2, 3, 4, 5, 6, 7 , 8]
// arr.map((item, idx) => {
//     console.log(item * 10, idx)
// })
// console.log(arr);

// const fruits = ['apple', 'banana', 'watermelon', 'peach']
// const result = fruits.filter((item) => {
//     return item.length > 5
// })
// console.log(result)

// const arr2 = [1, 2, 3, 4, 5, 6]
// console.log(arr2.slice(0, 4))
// console.log(arr2.slice(4))

// const str = '123123123'
// console.log(str.split('').reverse().join(''))

// const arr3 = [4, 5, 89, 110, 7]
// // const result = arr3.reduce((prev, curr) => {
// //     return prev + curr
// // }, 9)
// // console.log(result)

// const newArr = []
// const result2 = arr2.reduce((prev, curr) => {
//     const item = curr + 10
//     return newArr.push(item)
// }, newArr)
// console.log(newArr);


/* 
    САЙТ
*/

const tabs = document.querySelectorAll(".tabheader__item")
const tabsParent = document.querySelector(".tabheader__items")
const tabContent = document.querySelectorAll(".tabcontent")
const tabContentImg = document.querySelectorAll('.tabcontent img')

const hideTabContent = () => {
    tabContent.forEach((item) => {
        item.style.display = "none"
    })
    tabs.forEach((item) => {
        item.classList.remove("tabheader__item_active")
    })
    tabContentImg.forEach((item) => {
        item.style.opacity = '0.5'
    })
}

const showTabContent = (i = 3) => {
    tabContent[i].style.display = "block"
    setTimeout(() => {
        tabContentImg[i].style.opacity = '1'
    },0)
    tabs[i].classList.add("tabheader__item_active")
}

hideTabContent()
showTabContent()

hideTabContent()
showTabContent()

tabsParent.addEventListener("click", (event) => {
    const target = event.target
    if(target.classList.contains("tabheader__item")){
        tabs.forEach((item, i) => {
            if(target === item){
                console.log(i)
                hideTabContent()
                showTabContent(i)
            }
        })
    }
})

let currSlide = 0;
setInterval(() => {
    if (currSlide < 3) {
        currSlide++
        hideTabContent()
        showTabContent(currSlide)
    } else {
        currSlide = 0
        hideTabContent()
        showTabContent(currSlide)
    }
},1500);

const modal = document.querySelector(".modal")
const modalTrigger = document.querySelector(".btn_white")
const closeModalBtn = document.querySelector(".modal__close")

const openModal = () => {
    modal.classList.add("show")
    modal.classList.remove("hide")
    document.body.style.overflow = "hidden"

}

modalTrigger.addEventListener("click", openModal)

const closeModal = () => {
    modal.classList.add("hide")
    modal.classList.remove("show")
    document.body.style.overflow = ""
}
closeModalBtn.addEventListener('click',closeModal);

let isModalOpened = false
window.onscroll = () => {
    if (document.documentElement.scrollTop >= 3400 && isModalOpened === false) {
        isModalOpened = true
        openModal();
    }
}

document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('show')) {
        closeModal();
    }
});



const message = {
    loading: 'Идет загрузка...',
    success: 'Спасибо, скоро свяжемся!',
    fail: 'Что-то пошло не так'
}

const forms = document.querySelectorAll('form')

const postData = (form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault() // остановить перезагрузку

        const messageBlock = document.createElement('div')
        messageBlock.textContent = message.loading
        form.append(messageBlock)

        const request = XMLHttpRequest()
        request.open('POST', 'server.php')
        request.setRequestHeader('Content-type', 'application/json')
        
        const formData = new FormData(form)
        const object = {}
    
        formData.forEach((item) => {
            console.log(item)
        })
    
        forms.forEach((item, i) => {
            const arr = [item, i]
            console.log(arr)
            object[i] = item
        })
        console.log(object)

        const json = JSON.stringify(obj)

        request.send(json)

        request.addEventListener('load', () => {
            if (request.statues === 20) {
                console.log('ok')
                messageBlock.textContent = message.success
            }else {
                console.log('not ok')
                messageBlock.textContent = message.fail
            }
        })
    })
}

// ДЗ - на вторую кнопку задавать модальное окно и выводить алертами и закрывать автоматически через какое то время