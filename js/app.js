//Variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []



cargarEventListeners()

function cargarEventListeners() {
    //Cuando agregad un curso con el botton Agregar Carrito
    listaCursos.addEventListener('click', agregarCurso)

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //Vaciar el carrito 
    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [] // resetear el arreglo

        // carritoHTML()
        limpiarHTML() //Eliminar todo el html

    })



}


//Funciones
function agregarCurso(event) {
    event.preventDefault()
    if (event.target.classList.contains('agregar-carrito')) {
        const cursoSelecionado = event.target.parentElement.parentElement
        leerDatosCurso(cursoSelecionado)
    }
}

//Elimina un curso del carrito stack
function eliminarCurso(el) {
    if(el.target.classList.contains('borrar-curso')){
        const cursoId = el.target.getAttribute('data-id')
        //elima del arreglo por el data id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        carritoHTML() //Iterar sobre el carrito y motras su html

    }
    

}

//Leer info del contenido
function leerDatosCurso(curso) {
// console.log(curso);


//crear objeto
const inforCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1,

}

//revisa si un elemento ya existe en el carrito
const existe = articulosCarrito.some( el => el.id === inforCurso.id)
if(existe) {
    //actualizamos la cantidad
    const cursos = articulosCarrito.map( el => {
        if(el.id === inforCurso.id) {
            el.cantidad++
            return el //retorna el objeto actuazalido
        } else {
            return el //retorna los objetos que no son los duplicados
        }
    })
} else {
    //agregamos el curso al carrito
    //agrega elemento al carrito
    articulosCarrito = [...articulosCarrito, inforCurso]
}



console.log(articulosCarrito);
carritoHTML()
}


//mueestra al carrito de compras en el HTML
function carritoHTML() {

    //limpiar HTML
    limpiarHTML()

    //Recorrer el carrito y genera HTML
    articulosCarrito.forEach( el => {
        //destructuring
        const { imagen, titulo, precio, cantidad, id } = el
        const row = document.createElement('tr')
        row.innerHTML = `
        <td><img src="${imagen}" alt="" width="100"/></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td> 
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `

        //Agregar el HTML del carrito al tbody
        contenedorCarrito.appendChild(row)

    })

}


//Elimina los cursos del tbody
function limpiarHTML() {
    // contenedorCarrito.innerHTML = ''
    //Se recomienda

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
    
}