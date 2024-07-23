//Registro y login
import RegisterNuevo from "../components/RegisterNuevo.vue";
import LoginNuevo from "../components/LoginNuevo.vue";


//Pagina principal o inicio
import Home from "../components/Home.vue";


//Opcion Mantenimiento y sus modulos 
import Mantenimiento from "../components/Mantenimiento.vue";
import Personas from "../components/MantenimientoC/Personas.vue";

import Labores from "../components/MantenimientoC/Labores.vue";
import Pagos from "../components/MantenimientoC/Pagos.vue";
import UnidadesMedida from "../components/MantenimientoC/UnidadesMedida.vue";
import Eps from "../components/MantenimientoC/Eps.vue";
import TipoDocumento from "../components/MantenimientoC/TipoDocumento.vue";
import Lotes from "../components/MantenimientoC/Lotes.vue";
import Etapas from "../components/MantenimientoC/Etapas.vue";
import Fincas from "../components/MantenimientoC/Fincas.vue";
import Empaques from "../components/MantenimientoC/Empaques.vue";
import Soporte from "../components/MantenimientoC/Soporte.vue";


//Opcion costos y sus modulos
import Costos from "../components/Costos.vue";
import PagosC from "../components/CostosC/PagosC.vue";
import GastosMensuales from "../components/CostosC/GastosMensuales.vue";
import GastosOcasionales from "../components/CostosC/GastosOcasionales.vue";


//Opcion pedidos y sus modulos
import Pedidos from "../components/Pedidos.vue";
import PedidosM from "../components/PedidosC/PedidosM.vue";


//Opcion conversion y sus modulos
import Conversion from "../components/Conversion.vue";
import ProcesoDiario from "../components/ConversionC/ProcesoDiario.vue";
import MateriaPC from "../components/ConversionC/MateriaPC.vue";
import Empacados from "../components/ConversionC/Empacados.vue";


//Opcion inventario y sus modulos
import Inventario from "../components/Inventario.vue";
import Bodegas from "../components/InventarioC/Bodegas.vue";
import Categorias from "../components/InventarioC/Categorias.vue";
import Marcas from "../components/InventarioC/Marcas.vue";
import Productos from "../components/InventarioC/Productos.vue";


//Opcion reportes y sus modulos
import Reportes from "../components/Reportes.vue";
import Rconversion from "../components/ReportesC/Rconversion.vue";
import Rcostos from "../components/ReportesC/Rcostos.vue";
import Rinventario from "../components/ReportesC/Rinventario.vue";
import Rpedidos from "../components/ReportesC/Rpedidos.vue";
import Rmantenimiento from "../components/ReportesC/Rmantenimiento.vue";


import Principal from "../components/Principal.vue";

export const routes = [

  { path: "/", component: LoginNuevo },


  { path: "/RegisterNuevo", component: RegisterNuevo },


  {
    path: "/Principal",
    component: Principal,
    children: [
      { path: "Home", component: Home },



//Mantenimiento
      { path: "Mantenimiento", component: Mantenimiento },

      { path: "Personas", component: Personas },

      

      { path: "Labores", component: Labores },
      
      { path: "Pagos", component: Pagos },

      { path: "UnidadesMedida", component: UnidadesMedida },

      { path: "Eps", component: Eps },

      { path: "TipoDocumento", component: TipoDocumento },

      { path: "Lotes", component: Lotes },

      { path: "Etapas", component: Etapas },

      { path: "Fincas", component: Fincas },

      { path: "Empaques", component: Empaques },

      { path: "Soporte", component: Soporte },


//Costos
      { path: "Costos", component: Costos },

      { path: "PagosC", component: PagosC },

      { path: "GastosMensuales", component: GastosMensuales },

      { path: "GastosOcasionales", component: GastosOcasionales },


//Pedidos
      { path: "Pedidos", component: Pedidos },

      { path: "PedidosM", component: PedidosM },


//Conversion
      { path: "Conversion", component: Conversion },

      { path: "ProcesoDiario", component: ProcesoDiario },

      { path: "MateriaPC", component: MateriaPC },

      { path: "Empacados", component: Empacados },


//Inventario
      { path: "Inventario", component: Inventario },

      { path: "Bodegas", component: Bodegas },

      { path: "Categorias", component: Categorias },

      { path: "Marcas", component: Marcas },

      { path: "Productos", component: Productos },


//Reportes
      { path: "Reportes", component: Reportes },

      { path: "Rconversion", component: Rconversion },

      { path: "Rcostos", component: Rcostos },

      { path: "Rinventario", component: Rinventario },

      { path: "Rmantenimiento", component: Rmantenimiento },

      { path: "Rpedidos", component: Rpedidos },


    ],
  },
];











// Version anterior

// import Register from "../components/Register.vue"
// import Login from "../components/Login.vue"

// import Home from "../components/Home.vue"

// import Mantenimiento from "../components/Mantenimiento.vue"
// import Personas from "../components/MantenimientoC/Personas.vue"

// import Costos from "../components/Costos.vue"

// import Pedidos from "../components/Pedidos.vue"

// import Conversion from "../components/Conversion.vue"

// import Inventario from "../components/Inventario.vue"

// import Reportes from "../components/Reportes.vue"

// export const routes = [
//     {path: "/", component:Login},

//     {path: "/register", component:Register},

//     {path: "/Home", component:Home},

//     {path: "/Mantenimiento", component:Mantenimiento},

//     {path: "/Personas", component:Personas},

//     {path: "/Costos", component:Costos},

//     {path: "/Pedidos", component:Pedidos},

//     {path: "/Conversion", component:Conversion},

//     {path: "/Inventario", component:Inventario},

//     {path: "/Reportes", component:Reportes},
// ]
