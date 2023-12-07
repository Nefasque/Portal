// ---- DATA BASE ----
const helados = [
	{
    id : 0,
		nombre : "McFlurry Oreo", 
		precio : "3.99", 
		precioTachado : "4.95",
		url : "img/McDonalds-Oreo-McFlurry-Pin1-625x938.jpg",
    alternativeText : "McFlurry Oreo",
		ingredientes : [
			"Helado de vainilla", 
			"galletas oreo triturada", 
      "salsa de chocolate"
		],
    cantidadMaxima : 15,
	},

	{
    id : 1,
		nombre : "Sundae de Fresa", 
		precio : "2.99", 
		precioTachado : "3.95",
		url : "./img/sundae-de-fresa.jpg",
    alternativeText : "Sundae de Fresa",
		ingredientes : [
      "helado de vainilla",
      "salsa de fresa",
      "crema batida",
		],	
    cantidadMaxima : 20,
	},

	{
    id : 2,
		nombre : "helado de vainilla", 
		precio : "1.99", 
		precioTachado : "2.55",
		url : "./img/helado-de-vainilla.jpg",
    alternativeText : "helado de vainilla",
		ingredientes : [
      "helado de vainilla",
		],	
    cantidadMaxima : 30,
	},

	{
    id : 3,
		nombre : "helado de chocolate", 
		precio : "1.99", 
		precioTachado : "2.55",
		url : "./img/helado-de-chocolate-casero-destacada.jpg",
    alternativeText : "helado de chocolate",
		ingredientes : [
      "helado de chocolate",
		],	
    cantidadMaxima : 30,
	},
  {
    id : 4,
    nombre : "helado de fresa",
    precio : "1.99",
    precioTachado : "2.55",
    url : "./img/helado-de-fresa-3.jpg",
    alternativeText : "helado de fresa",
    ingredientes : [
      "helado de fresa",
    ],
    cantidadMaxima : 30,

  }
]

// API 
const getHeladoDate = (index) => helados[index];
const getListadoHelados = () => helados;


/// ----- carrito
let carrito =  {
  producto : [], 
  total : 0
}



////--------------------------	
 
// template lits ingredientes
const templateIngredientes = (ingredientes) => {
  const fragment = document.createDocumentFragment();
  ingredientes.forEach((element) => {
    const li = document.createElement("li");
    li.innerHTML = element;
    fragment.appendChild(li);
  })
  
  return fragment
}

function modalClose(modal) {
	modal.style.display = "none"	
}


const modalOpen = (date) => {
	const modal = document.querySelector("#modal-1"); 
	modal.querySelector(".NameProduto").innerHTML = date.nombre

  // load precio
	modal.querySelector(".precio b").innerHTML = date.precio
	modal.querySelector(".precio i").innerHTML = date.precioTachado

  // load ingredientes
  modal.querySelector(".ingredientes").innerHTML = ""
  modal.querySelector(".ingredientes")
    .appendChild(templateIngredientes(date.ingredientes))

  // load img
  modal.querySelector(".img-modal").src = date.url
  modal.querySelector(".img-modal").alt = date.alternativeText

  // load input rager 
  modal.querySelector(".rg-cant").textContent = 0
  modal.querySelector(".form-range").value = 0

  modal.querySelector(".form-range").max = date.cantidadMaxima
  modal.querySelector(".form-range").addEventListener("click", () =>{
    modal.querySelector(".rg-cant").textContent = 
      modal.querySelector(".form-range").value
  })

  modal.querySelector("#id-helado").value = date.id
	modal.style.display = "block"	
}

// load card helados
const pedirHelador = () => {
  const main = document.querySelector(".main")
  const listado = getListadoHelados()

  const fragment = document.createDocumentFragment()

  listado.forEach((element,index) => {
    const div = document.createElement("div")
    div.classList.add("col-sm-12", "col-md-6", "card", "p-0", "my-1", "helado")
    div.innerHTML = `
        <img class="w-100 card-img-top" src="${element.url}" alt="${element.alternativeText}">

        <div class="card-body p-2">
          <h3 class="card-tittle">${element.nombre}</h3> 
          <p class="precio"><b>${element.precio}$</b>
            <span class="precio-tachado">
              <i>${element.precioTachado}</i></span>
          </p>
        </div>
    `

    div.addEventListener("click", () => {
			modalOpen(getHeladoDate(index))				
    })

    fragment.appendChild(div)
  })
  main.appendChild(fragment)
}

pedirHelador()

document.querySelector(".btn-close").addEventListener("click",()=>{
  modalClose(document.querySelector("#modal-1"))
})
document.querySelector("#modal-1").addEventListener("click",(e)=>{
  modalClose(e.target)
})

document.querySelector(".modal-dialog").addEventListener("click",(e)=>{
  //detener propagacion
  e.stopPropagation()
})


// add carrito, si no esta lo agrega si no lo edita
document.querySelector("#btn-agregar").addEventListener("click", () =>{
  const modal = document.querySelector("#modal-1")
  const cantidad = Number(modal.querySelector(".form-range").value)
  const date = getHeladoDate(modal.querySelector("#id-helado").value)
  const total = Number(date.precio * cantidad);

  if (cantidad === 0) {
    alert("ingrese una cantidad")
    return
  }
  
  const index = carrito.producto.findIndex((element) => element.producto.id === date.id)

  if (index === -1){
    carrito.producto.push({
    producto : date,
    cantidad,
    total })
  }
  else {
    carrito.producto[index].total = Number(total.toFixed(2))
    carrito.producto[index].cantidad = cantidad
  }
  
  let totalCarrito = 0
  carrito.producto.forEach((element) => {
    totalCarrito += element.total
  })
  
  carrito.total = totalCarrito.toFixed(2)
  
  document.querySelector("#btn-mostrar-carrito p span").textContent = carrito.total

  console.log(carrito)
  modalClose(modal)
})


// botoon de mostrar carrito
const btnCar =  document.querySelector("#btn-mostrar-carrito")
btnCar.addEventListener("click",() =>{
  if (carrito.producto.length === 0){
    alert("carrito vacio")
    return
  }
  document.querySelector(".tb-carrito").innerHTML = ""

  const modal = document.querySelector("#modal-2")
  modal.style.display = "block"
   

  const fragment = document.createDocumentFragment()

  carrito.producto.forEach((element) => {
    const tr = document.createElement("tr") 
    tr.innerHTML = `
      <td>${element.producto.nombre}</td>
      <td>${element.producto.precio}</td>
      <td>${element.cantidad}</td>
      <td>${element.total}</td>
    `
    fragment.appendChild(tr)
  })
  
  const tr = document.createElement("tr")
  tr.innerHTML = `
      <td colspan="3">Total</td>
      <td>${carrito.total}</td>
  `
  fragment.appendChild(tr)
  
  document.querySelector(".tb-carrito").appendChild(fragment)
})

document.querySelector("#modal-2").addEventListener("click",(e)=>{
  modalClose(e.target)
})
document.querySelector("#modal-2 .btn-close").addEventListener("click",()=>{
  modalClose(document.querySelector("#modal-2"))
})

document.querySelector("#modal-2 .modal-dialog").addEventListener("click",(e)=>{
  e.stopPropagation()
})





