// var dest = document.querySelector('#itemsContainer');


// var data = showItem(4, "kubek gwiezdny", "25.50")

// dest.innerHTML = data;

// item_1.style.display = "none";

class Cart {
    // static Item_inCart = [0,0,0,0,0,0,0,0];
    // static Quantity_inCart = [0,0,0,0,0,0,0,0];
    static valueOfCart = 0;

    static getCart() {
        var ca = JSON.parse(sessionStorage.getItem('cart'));
        if (ca === null || ca === undefined) Cart.cart = [];
        else Cart.cart = ca;

        var IiC = JSON.parse(sessionStorage.getItem('itemsInCart'));
        if (IiC === null || IiC === undefined) Cart.Item_inCart = [0,0,0,0,0,0,0,0];
        else Cart.Item_inCart = IiC;

        var QiC = JSON.parse(sessionStorage.getItem('quantityOfItems'));
        if (QiC === null || QiC === undefined) Cart.Quantity_inCart = [0,0,0,0,0,0,0,0];
        else Cart.Quantity_inCart = QiC;
    }

    static saveInCart (name, quantity, price) {
        var item = {};
        item.name = name;
        item.quantity = quantity;
        item.price = price;

        Cart.cart.push(item);
        sessionStorage.setItem("cart", JSON.stringify(Cart.cart));
        sessionStorage.setItem("itemsInCart", JSON.stringify(Cart.Item_inCart));
        sessionStorage.setItem("quantityOfItems", JSON.stringify(Cart.Quantity_inCart));
        Cart.setSizeOfCart();
        Cart.showCart();
    }

    static deleteFromCart (index, name) {
        //console.log(Cart.cart);
        var i = 0;
        Cart.cart.forEach(item => {
            if(item.name === name) {
                Cart.cart.splice(i, 1);
            }
            i++;
        });
        Cart.Item_inCart[index-1] = 0;
        Cart.Quantity_inCart[index-1] = 0;
        sessionStorage.setItem("cart", JSON.stringify(Cart.cart));
        sessionStorage.setItem("itemsInCart", JSON.stringify(Cart.Item_inCart));
        sessionStorage.setItem("quantityOfItems", JSON.stringify(Cart.Quantity_inCart));
        Cart.setSizeOfCart();
        Cart.showCart();
    }

    static setSizeOfCart() {
        pill = document.querySelector('#sizeOfCart')
        let size = 0;
        for (let i = 0; i < Cart.Item_inCart.length; i++) {
            size += Cart.Item_inCart[i]*Cart.Quantity_inCart[i];
        }
        if(!size){
            pill.innerHTML = size;
            pill.style.visibility = "hidden"
        } else {
            pill.style.visibility = "visible"
            pill.innerHTML = size;
        }
    }

    static showCart() {
        var el = document.querySelector('#cartDisplay');
        var str = "";
        var cartValue = 0;
        if (Cart.cart === null || Cart.cart.length === 0) el.innerHTML = str + '<hr /><p class="text-center fs-4 h3_color">Koszyk jest pusty</p>';
        else {
            //console.log("wypisuje koszyk");
            str = 
            '<div class="h_color_muted" id="cartHeader">' + 
                '<hr />' +
                '<div class="text-center row">' +
                    // '<div class="col-1" id="delItBtnCol"></div>' +
                    '<div class="col" id="nameIt">Nazwa produktu</div>' +
                    '<div class="col" id="priceIt">Sztuk</div>' +
                    '<div class="col" id="quantityIt">Cena (za sztuke)</div>'+
                '</div>' +
                '<hr />' +
            '</div>' +
            '<div id="cartInside">';

          for (let i = 0; i < Cart.cart.length; i++) {
            str += 
                '<div class="text-center row p_color" id="list' + i +'">' +
                    // '<div class="col-1" id="delItBtnCol">' +
                    //     '<button class="btn btn-warning m-1 usun" id="deleteIt' +
                    //     i +'" > X </button>' +
                    // '</div>' +
                    '<div class="col" id="nameIt">' +
                        Cart.cart[i].name +
                    '</div>' +
                    '<div class="col" id="priceIt">' + 
                        Cart.cart[i].quantity +
                    '</div>' +
                    '<div class="col" id="quantityIt">' + 
                        Cart.cart[i].price +
                    '</div>'+
                '</div>' +
                '<hr />';
            cartValue += Cart.cart[i].price * Cart.cart[i].quantity;
          }
          str += 
            '</div>' +
            '<div class="h_color_muted" id="cartFooter">' +
                '<hr />' +
                '<div class="row text-center">' +
                    '<div class="col">' +
                        '<span id="cartValueName">Wartość koszyka: </span>' +
                        '<span id="cartValue"></span>' +
                        cartValue +
                        '<span> zł</span>' +
                    '</div>' +
                '</div>' +
                '<hr />' +
            '</div>'

          el.innerHTML = str;
            Cart.valueOfCart = cartValue;
        //   Koszyk.koszykWidoczny = 1;
        }
    }

    static deleteItem(i) {
        if (confirm("Usunąć przedmiot z koszyka?")) Cart.cart.splice(i, 1);
        sessionStorage.setItem("cart", JSON.stringify(Cart.cart));
        Cart.setSizeOfCart();
        Cart.showCart();
    }


}

class Orders {
    static getOrders() {
        var tab = JSON.parse(localStorage.getItem('orders'));
        if (tab === null || tab === undefined) Orders.orders = [];
        else Orders.orders = tab;
    }

    static saveOrder(name, surname, email, number, country, paymentMethod, listOfItems, value) {
        var order = {};
        order.name = name;
        order.surname = surname;
        order.email = email;
        order.number = number;
        order.country = country;
        order.payment = paymentMethod;
        order.products = listOfItems;
        order.value = value;
        Orders.orders.push(order);
        localStorage.setItem("orders", JSON.stringify(Orders.orders));
    }
}

document.addEventListener("DOMContentLoaded", () => { 
    Cart.getCart();
    Orders.getOrders();
    
    //console.log(Cart.cart);
    //console.log(Cart.Item_inCart);
    //console.log(Cart.Quantity_inCart);
    loadButtons();
    Cart.setSizeOfCart();
    Cart.showCart();
    
    function loadButtons() {
        var i = 1;
        Cart.Item_inCart.forEach(element => {
            if(element != 0){
                document.querySelector('#toCartBtn' + i).style.display= "none";
                document.querySelector('#outOfCartBtn' + i).style.display= "block";
                document.querySelector('#qInput' + i).value = Cart.Quantity_inCart[i-1];
            } else {
                document.querySelector('#qInput' + i).value = '';
            }
            i++; 
        });
    }
    
    

    function changeButton (index) { 
        if (Cart.Item_inCart[index-1] === 0) {
            var q = document.querySelector('#qInput' + index).value;
            if (q === '' || parseInt(q) <= 0) {
                alert("Przed dodaniem do koszyka należy wprowadzić poprawną ilość");
                return;
            }
            if (!Number.isInteger(parseFloat(q))) {
                alert("Niepoprawna liczba sztuk!");
                return;
            }
            document.querySelector('#toCartBtn' + index).style.display= "none";
            document.querySelector('#outOfCartBtn' + index).style.display= "block";
            Cart.Item_inCart[index-1] = 1;
            Cart.Quantity_inCart[index-1] = parseInt(q);
            n = document.querySelector('#item' + index + '_title').textContent;
            p = document.querySelector('#price_item' + index).textContent;
            //console.log( p +n + q);
            Cart.saveInCart(n, q, p);
        } else {
            document.querySelector('#outOfCartBtn' + index).style.display= "none";
            document.querySelector('#toCartBtn' + index).style.display= "block";
            document.querySelector('#qInput' + index).value = '';
            n = document.querySelector('#item' + index + '_title').textContent;
            
            Cart.deleteFromCart(index, n);
        }
        //onsole.log(Cart.Item_inCart);
        //console.log(Cart.Quantity_inCart);
    }

    function hideElement(name) {
        document.getElementById(name).style.display = "none";
    } 

    function showElement(name) {
        document.getElementById(name).style.display = "block";
    }

    function X_btn(e) {
        if (e.target !== e.currentTarget) {
            var btn = e.target.id;
            if (btn.includes("deleteIt")) {
                btn = btn.slice(8);
                Cart.deleteItem(btn);
            }
        }
        e.stopPropagation();
    }
    
    toCart1.addEventListener("click", () => {
        changeButton(1);
    }, false);
    
    toCart2.addEventListener("click", () => {
        changeButton(2);
    }, false);
    
    toCart3.addEventListener("click", () => {
        changeButton(3);
    }, false);
    
    toCart4.addEventListener("click", () => {
        changeButton(4);
    }, false);
    
    toCart5.addEventListener("click", () => {
        changeButton(5);
    }, false);
    
    toCart6.addEventListener("click", () => {
        changeButton(6);
    }, false);
    
    toCart7.addEventListener("click", () => {
        changeButton(7);
    }, false);
    
    toCart8.addEventListener("click", () => {
        changeButton(8);
    }, false);


    // cartDisplay.addEventListener("click", X_btn);

    findBtn.addEventListener("click", () => {
        for (let i = 1; i <= 8; i++) {
            showElement('item_'+i);
        }
        var string = document.querySelector('#searchingString').value.toLowerCase();
        var finded = 0;
        if (string === "") {
            alert("Nie podano nazwy szukanego produktu");
            return;
        }

        for (let i = 1; i <= 8; i++) {
            var productName = 'item' + i +'_title';
            if (!document.getElementById(productName).textContent.toLocaleLowerCase().includes(string)) {
                hideElement('item_'+i);
            } else finded = 1;
        }
        if (finded === 0) {
            alert("Nie znaleziono produktu o podanej nazwie");
        }
    }, false);

    clearFind.addEventListener("click", () => {
        document.querySelector('#searchingString').value = '';
        for (let i = 1; i <= 8; i++) {
            showElement('item_'+i);
        }
    }, false);
});

function checkInputText(text_id, regex) {
    var text = document.getElementById(text_id).value;
    if (!regex.test(text)) return false;     
    else return true;
}

function checkInputRadio(radio_name) {
    var obj = document.getElementsByName(radio_name);
    for (i = 0; i < obj.length; i++) {
        selected = obj[i].checked;
        if (selected) return true;
    }
    return false;
}

function getRadioValue(radio_name) {
    var opc = document.getElementsByName(radio_name);
    for (i = 0; i < opc.length; i++) {
        if (opc[i].checked) {
            var selectedOpc = opc[i].value;
            break;
        }
    }
    return selectedOpc;
}

function clearCart() {
    Cart.cart = [];
    Cart.Item_inCart = [0,0,0,0,0,0,0,0];
    Cart.Quantity_inCart = [0,0,0,0,0,0,0,0];

    sessionStorage.setItem("cart", JSON.stringify(Cart.cart));
    sessionStorage.setItem("itemsInCart", JSON.stringify(Cart.Item_inCart));
    sessionStorage.setItem("quantityOfItems", JSON.stringify(Cart.Quantity_inCart));
    userDataForm.reset();
    Cart.setSizeOfCart();
    Cart.showCart();

    var i = 1;
        Cart.Item_inCart.forEach(element => {
            if(element === 0){
                document.querySelector('#toCartBtn' + i).style.display= "block";
                document.querySelector('#outOfCartBtn' + i).style.display= "none";
                document.querySelector('#qInput' + i).value = '';
            }
            i++; 
        });
}

function checkForm() {
    var correct = true;
    patternFirstname = /^[A-ZĄĆĘŚŃÓŁŹŻ][a-ząęśćńóżź]{1,20}(\s[A-ZĄĆĘŚŃÓŁŹŻ][a-ząęśćńóżź]{1,20})*$/;
    patternSurname = /^[A-ZĄĆĘŚŃÓŁŹŻ][a-ząęśćńóżź]{1,20}(-[A-ZĄĆĘŚŃÓŁŹŻ][a-ząęśćńóżź]{1,20})*$/;
    patternEmail = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
    patternNumber = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/;
    var info = "Następujące zamówienie zostanie wysłane: \n";

    if (Cart.cart === null || Cart.cart.length === 0) {
        alert("Twój koszyk jest pusty! \n Wybierz z listy produkty które chcesz zamówić")
        return false;
    }
    else {
        //console.log("kontynuuje sprawdzanie");

        if (!checkInputText("firstnameInput", patternFirstname)) {
            correct = false;
            alert("Wpisz poprawnie imie! \n Jeśli chcesz wpisać więcej niż jedno imie: oddziel je spacją.");
            firstnameInput.style.border= "3px solid red";
        } else {
            info += "Imie: " + document.getElementById("firstnameInput").value + "\n";
            firstnameInput.style.border= "";
        }

        if (!checkInputText("surnameInput", patternSurname)) {
            correct = false;
            alert("Wpisz poprawnie nazwisko! \n Jeśli wpisujesz więcej niż jedno nazwisko: oddziel je myślnikiem (' - ')");
            surnameInput.style.border= "3px solid red";
        } else {
            info += "Nazwisko: " + document.getElementById("surnameInput").value + "\n";
            surnameInput.style.border= "";
        }

        if (!checkInputText("emailAdrInput", patternEmail)) {
            correct = false;
            alert("Wpisz poprawnie adres email!");
            emailAdrInput.style.border= "3px solid red";
        } else {
            info += "Adres e-mail: " + document.getElementById("emailAdrInput").value + "\n";
            emailAdrInput.style.border= "";
        }

        if (!checkInputText("telNumberInput", patternNumber)) {
            correct = false;
            alert("Wpisz poprawnie numer telefonu!");
            telNumberInput.style.border= "3px solid red";
        } else {
            info += "Numer: " + document.getElementById("telNumberInput").value + "\n";
            telNumberInput.style.border= "";
        }
        info += "Państwo: " + document.getElementById("countrySelect").value + "\n";

        if(!checkInputRadio("payment")) {
            correct = false;
            alert("Musisz wybrać sposób zapłaty!");
        } else {
            info += "Metoda płatności: " + getRadioValue("payment") + "\n";
        }

        if(correct) {
            info += "\n Zamawiane produkty: \n";
            for (let i = 0; i < Cart.cart.length; i++) {
                info += 
                    Cart.cart[i].name + "\n" +
                    "> Sztuk: " + Cart.cart[i].quantity + "\n" +
                    "> Cena [za 1szt]: " + Cart.cart[i].price + "\n" + "\n";
            }
            info +=
                "Do zapłaty: " + Cart.valueOfCart + " zł";
        }
        if (correct) {
            if (window.confirm(info)) {
                Orders.saveOrder(document.getElementById("firstnameInput").value, document.getElementById("surnameInput").value, document.getElementById("emailAdrInput").value, document.getElementById("telNumberInput").value, document.getElementById("countrySelect").value, getRadioValue("payment"), Cart.cart, Cart.valueOfCart);
                clearCart();
                return correct;
            } else return false;
        } else return false;
    }
    
}

// });
// });