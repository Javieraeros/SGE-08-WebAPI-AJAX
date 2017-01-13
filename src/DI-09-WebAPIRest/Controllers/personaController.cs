using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DI_09_WebAPIRest_Bl.Manejadoras;
using DI_09_WebAPIRest_Ent;
using DI_09_WebAPIRest_Bl.Listados;

namespace DI_09_WebAPIRest.Controllers
{
    [Route("api/[controller]")]
    public class personaController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<Persona> Get()
        {
            ListadosBL miListado = new ListadosBL();
            return miListado.listadoPersonasBL();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Persona Get(int id)
        {
            manejadoraPersonaBL miMane = new manejadoraPersonaBL();
            Persona p=miMane.selectPersonaBL(id);
            if (p == null)
            {
                Response.StatusCode = 404;
            }
            
            return p;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] Persona value)
        {
            manejadoraPersonaBL miMane = new manejadoraPersonaBL();
            miMane.insertPersonaBL(value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Persona persona)
        {

            manejadoraPersonaBL miMane = new manejadoraPersonaBL();
            if (miMane.selectPersonaBL(id)!=null ){
                persona.id = id;
                miMane.updatePersonaBL(persona);
            }else
            {
                Response.StatusCode = 404;
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            manejadoraPersonaBL miMane = new manejadoraPersonaBL();
            if (miMane.deletePersonaBL(id)!=0)
            {

            }else
            {
                Response.StatusCode = 404;
            }
        }
    }
}
