import Viaje from "../models/Viajes.js";
import Testimonial from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {
  //consultar 3 viajes del modelo Viajes
  
  const promiseDB = [];
  promiseDB.push(Viaje.findAll( {limit:3} ));
  promiseDB.push(Testimonial.findAll({limit:3}));
  try { 
    const resultado = await Promise.all(promiseDB);
    res.render("inicio", {
      pagina: "Inicio",
      clase: 'home',
      viajes:resultado[0],
      testimoniales: resultado[1]  
    });
  } catch (error) {
    console.log(error);
  }

  //res.send("Hola");send es un metodo para mostrar algo en pantalla
  
};

const paginaNosotros = (req, res) => {
  res.render("nosotros", {
    pagina: "Nosotros",
  });
};

const paginaViajes = async (req, res) => {
  //consultar bd
  const viajes = await Viaje.findAll();
  console.log(viajes);

  //res.send("Hola");send es un metodo para mostrar algo en pantalla
  res.render("viajes", {
    pagina: "Viajes",
    viajes,
  });
};

const paginaTestimoniales = async (req, res) => {
  try {
    const testimoniales = await Testimonial.findAll();
    res.render("testimoniales", {
      pagina: "Testimoniales",
      testimoniales
    });

  } catch (error) {
    console.log(error);
  }
};

//Muestra un viaje por su Slug
const paginaDetalleViaje = async (req, res) => {
  const { slug } = req.params;
  try {
      const viaje = await Viaje.findOne({
          where:{
            slug
          }
      });
      res.render('viaje', {
          pagina: 'Información Viaje',
          viaje
      })
      
  } catch (error) {
      console.log(error);
  }
};

export { paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje};
