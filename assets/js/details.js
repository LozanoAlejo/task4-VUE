const { createApp } = Vue

createApp({
    data(){
        return {
            objetos : null,
            id: undefined,
            parametros: undefined,
            idcard: undefined,
        }
    }, 
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(data => {
            this.objetos = data.events
            //console.log(this.objetos)
            this.parametros = new URLSearchParams(location.search)
            this.id = this.parametros.get("idCard")
            this.idcard = this.objetos.find(objeto => objeto._id == this.id)
        })
        .catch(error => console.log(error))
    },

}).mount('#app2')