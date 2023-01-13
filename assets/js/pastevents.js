const { createApp } = Vue

createApp({
    data(){
        return {
            cards: null,
            objetos : [],
            valueBusqueda:"",
            checked: [],
            categorias:[],
            objetosFiltrados: [],
        }
    }, 
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(data => {
            this.objetos = data.events.filter(upComingEvent => upComingEvent.date <= data.currentDate)
            this.objetosFiltrados = [... this.objetos]
            this.categorias = [ ...new Set(this.objetos.map(datEvent => datEvent.category)) ]
        })
        .catch()
    },
    methods: {
        filtroCruzado: function(){
                let filtroPorBusqueda = this.objetos.filter( datEvent => datEvent.name.toLowerCase().includes( this.valueBusqueda.toLowerCase()))
                if( this.checked.length === 0 ){
                    this.objetosFiltrados = filtroPorBusqueda
                }else{
                    let filtradosPorCheck = filtroPorBusqueda.filter( datEvent => this.checked.includes( datEvent.category ))
                    this.objetosFiltrados = filtradosPorCheck 
            } 
        }
    },






}).mount('#apppp')