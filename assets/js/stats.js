const {createApp} = Vue

createApp({
    data(){ // las variables que puedo usar en el html
      return {

        data: undefined,
        upcomingFiltered: undefined,
        pastFiltered: undefined,
        maxminPorcentaje: [],

      }  
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
            .then( response => response.json())
            .then(informacion => {
                this.data = informacion
                this.upcomingFiltered = this.data.events.filter(event => event.date > this.data.currentDate)
                this.pastFiltered = this.data.events.filter(event => event.date < this.data.currentDate)
                let listaPorcentaje = this.newPropertyPercentage(this.data)
                console.log(this.newPropertyPercentage(this.data))
                this.capacidadMax(this.data.events)
                this.porcentajeMayor(listaPorcentaje)
                this.porcentajeMin(listaPorcentaje)
                
                
            })
            .catch(err => console.log(err))
    },
    methods:{
        revenues : function (prices, estimatesOrAssistance){ //reemplazar por data.(price o estimate o assistance)
            let rev = prices * estimatesOrAssistance
            return rev.toLocaleString()
    },
        percentageOfAttendance : function (capacities, estimatesOrAssistance){
        let percentage = (estimatesOrAssistance / (capacities/100)).toFixed(0)
        return percentage
    },
        newPropertyPercentage : function (data){
        let list = []
        let filteredAssistance = data.events.filter( event => event.assistance)
        
            for (let i = 0; i < filteredAssistance.length; i++) {
                    list.push(filteredAssistance[i]);
                    
                
                
                    list[i].percentage = this.percentageOfAttendance(list[i].capacity, list[i].assistance);
                
            }
            
            return [...list.sort((event1, event2) => event2.percentage - event1.percentage)]
        },
        porcentajeMayor : function (events2){
            let porcentajeMayor = [...events2.sort((event1, event2) => event2.percentage - event1.percentage)]
            this.maxminPorcentaje[0] = {name: porcentajeMayor[0].name + " with " , percentage: porcentajeMayor[0].percentage +"%"}
            
            
        },
        
        porcentajeMin : function (events2){
            let porcentajeMinimo = [...events2.sort((event1, event2) => event1.percentage - event2.percentage)]
            this.maxminPorcentaje[1] = {name: porcentajeMinimo[0].name + " with ", percentage: porcentajeMinimo[0].percentage + "%"}
        },
        capacidadMax : function (events){
            let capacidadMaxima = events.sort((event1, event2) => event2.capacity - event1.capacity)
            this.maxminPorcentaje[2] = {name: capacidadMaxima[0].name + " with ", capacity: (capacidadMaxima[0].capacity).toLocaleString() + " of capacity."} 
        }

        
    }
}).mount("#app")