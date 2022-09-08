class OrderList {
    static edited;

    static getLists() {
        var list = JSON.parse(localStorage.getItem('orders'));
        if (list === null || list === undefined) OrderList.tab = [];
        else OrderList.tab = list;
        //console.log(OrderList.tab);
    }

    static printOrderList () {
        var dest = document.querySelector('#listInside');
        if (OrderList.tab === null || OrderList.tab.length === 0) dest.innerHTML = '<p class="text-center fs-4">Nie ma jeszcze żadnych zamówień</p><hr />';
        else {
            //console.log("wypisuje koszyk");
            var listOfOrders = '';
            for (let index = 0; index < OrderList.tab.length; index++) {
                listOfOrders += 
                    `<div class="orderListItem d-flex flex-column" id="order-${index}"> 
                        <span> Imie: ${OrderList.tab[index].name}</span>
                        <span> Nazwisko: ${OrderList.tab[index].surname}</span>
                        <span> Adres e-mail: ${OrderList.tab[index].email}</span>
                        <span> Numer telefonu: ${OrderList.tab[index].number}</span>
                        <span> Sposób zapłaty: ${OrderList.tab[index].payment}</span>
                        <span> Kraj: ${OrderList.tab[index].country}</span>
                        <span class="h_color_muted">Wartość zamówienia: ${OrderList.tab[index].value} zł</span>
                    </div>
                    <br />
                    <div class="orderListItem d-flex flex-column h_color_muted" id="orderItems-${index}">`;
                for (let i = 0; i < OrderList.tab[index].products.length; i++) {
                    listOfOrders += 
                        `<span>${i +1}. ${OrderList.tab[index].products[i].name}
                         - ${OrderList.tab[index].products[i].price} zł 
                         - ${OrderList.tab[index].products[i].quantity} szt</span>`;
                }
                listOfOrders += 
                    `</div>
                    <div class="orderListItemBtns text-center mt-3">
                        <button class='btn btn-warning m-1 mx-3 fw-bold deleteItemBtn' id='deleteItme-${index}'> Usuń </button>
                        <button class='btn btn-info m-1 mx-3 fw-bold' id='editItem-${index}' data-bs-toggle='modal' data-bs-target='#myModal'> Edytuj </button>
                    </div>
                    <hr />`;
            }
            dest.innerHTML = listOfOrders;
        }
    }

    static orderListAction(e) {
        if (e.target !== e.currentTarget) {
          var btn = e.target.id;
          if (btn.includes("delete")) {
            btn = btn.slice(11);
            // console.log("d" + btn);
            OrderList.deleteOrder(btn);
          } else {
            btn = btn.slice(9);
            // console.log("e" + btn);
            // console.log("no kiedy tu");
            OrderList.printItemsInModal(parseInt(btn));
            OrderList.editOrder(parseInt(btn));
            OrderList.edited = parseInt(btn);
          }
        }
        e.stopPropagation();
    }

    static printItemsInModal(index){
        var ModalItemsList = ''

        for (let i = 0; i < OrderList.tab[index].products.length; i++) {
            ModalItemsList += 
                `<span>${i +1}. ${OrderList.tab[index].products[i].name}
                 - ${OrderList.tab[index].products[i].price} zł 
                 - <input class="quantityInput" id="E_q${index}-I${i}" type="number" min="1" max="10" /> szt </span>`;
        }


        E_items.innerHTML = ModalItemsList
    }

    static editOrder(i) {
        document.getElementById("E_i").value = OrderList.tab[i].name;
        document.getElementById("E_n").value = OrderList.tab[i].surname;
        document.getElementById("E_e").value = OrderList.tab[i].email;
        document.getElementById("E_t").value = OrderList.tab[i].number;
        document.getElementById("E_c").value = OrderList.tab[i].country;
        var arr = document.getElementsByName("E_p");
        for (let opc = 0; opc < arr.length; opc++) {
            if (arr[opc].value === OrderList.tab[i].payment) {
                //console.log("opc: " + arr[opc].value);
                arr[opc].checked = true;
                
            }
        }
        for (let item = 0; item < OrderList.tab[i].products.length; item++) {
            document.getElementById("E_q" + i + "-I" + item).value = OrderList.tab[i].products[item].quantity;
        }
        //console.log("editorderFinish");
        // document.getElementById("E_p"). = OrderList.tab[i].payment;
        // ${OrderList.tab[index].products[i].quantity} szt
    }

    static saveChanges() {
        OrderList.tab[OrderList.edited].name = document.getElementById("E_i").value;
        OrderList.tab[OrderList.edited].surname = document.getElementById("E_n").value;
        OrderList.tab[OrderList.edited].email = document.getElementById("E_e").value;
        OrderList.tab[OrderList.edited].number = document.getElementById("E_t").value;
        OrderList.tab[OrderList.edited].country = document.getElementById("E_c").value;
        var arr = document.getElementsByName("E_p");
        for (let opc = 0; opc < arr.length; opc++) {
            if (arr[opc].checked) {
                OrderList.tab[OrderList.edited].payment = arr[opc].value;
            }
        }
        var editedValue = 0;

        for (let item = 0; item < OrderList.tab[OrderList.edited].products.length; item++) {
            OrderList.tab[OrderList.edited].products[item].quantity = document.getElementById("E_q" + OrderList.edited + "-I" + item).value;

            if (OrderList.tab[OrderList.edited].products[item].quantity == 0) {
                OrderList.tab[OrderList.edited].products.splice(item, 1)
            }
            editedValue += OrderList.tab[OrderList.edited].products[item].quantity * OrderList.tab[OrderList.edited].products[item].price;
        }
        OrderList.tab[OrderList.edited].value = editedValue;
        localStorage.setItem("orders", JSON.stringify(OrderList.tab));
        OrderList.printOrderList();
    }

    static deleteOrder(i) {
        if (confirm("Usunąć zamówienie?")) OrderList.tab.splice(i, 1);
        localStorage.setItem("orders", JSON.stringify(OrderList.tab));
        OrderList.printOrderList();
    }

    static checkInputText(text_id, regex) {
        var text = document.getElementById(text_id).value;
        if (!regex.test(text)) return false;     
        else return true;
    }

    static validateChanges(){ 
        var correct = true;
        var anyItems = false;
        var patternFirstname = /^[A-ZĄĆĘŚŃÓŁŹŻ][a-ząęśćńóżź]{1,20}(\s[A-ZĄĆĘŚŃÓŁŹŻ][a-ząęśćńóżź]{1,20})*$/;
        var patternSurname = /^[A-ZĄĆĘŚŃÓŁŹŻ][a-ząęśćńóżź]{1,20}(-[A-ZĄĆĘŚŃÓŁŹŻ][a-ząęśćńóżź]{1,20})*$/;
        var patternEmail = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
        var patternNumber = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/;

        if (!OrderList.checkInputText("E_i", patternFirstname)) {
            correct = false;
            alert("Wpisz poprawnie imie!");
        }

        if (!OrderList.checkInputText("E_n", patternSurname)) {
            correct = false;
            alert("Wpisz poprawnie nazwisko!");
        }

        if (!OrderList.checkInputText("E_e", patternEmail)) {
            correct = false;
            alert("Wpisz poprawnie adres email!");
        } 

        if (!OrderList.checkInputText("E_t", patternNumber)) {
            correct = false;
            alert("Wpisz poprawnie numer telefonu!");
        }

        for (let index = 0; index < OrderList.tab[OrderList.edited].products.length; index++) {
            if (!Number.isInteger(parseFloat(document.getElementById("E_q" + OrderList.edited + "-I" + index).value))) {
                alert("Niepoprawna liczba sztuk!");
                correct = false;
            }
            if (parseFloat(document.getElementById("E_q" + OrderList.edited + "-I" + index).value) < 0) {
                alert("Niepoprawna liczba sztuk!");
                correct = false;
            }
            if (document.getElementById("E_q" + OrderList.edited + "-I" + index).value > 0) {
                anyItems = true;
            }
        }
        if (anyItems) {
            if (correct) {
                if (window.confirm("Zapisać zmiany?")) {
                    return correct;
                } else return false;
            } else return false;
        } else {
            alert("Zamówienie musi zawierać jakies produkty!")
            return false;
        }

    }

}

OrderList.getLists();
OrderList.printOrderList();

listInside.addEventListener("click", OrderList.orderListAction);
acceptChanges.addEventListener("click", () => {
    if (OrderList.validateChanges()) {
        OrderList.saveChanges();
    }
});
