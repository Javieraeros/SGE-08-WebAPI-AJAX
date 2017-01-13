using DI_09_WebAPIRest_Dal.Manejadoras;
using DI_09_WebAPIRest_Ent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DI_09_WebAPIRest_Bl.Manejadoras
{
    public class manejadoraPersonaBL
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="persona"></param>
        /// <returns></returns>
        public int insertPersonaBL(Persona persona)
        {
            manejadoraPersonaDAL miManejadora = new manejadoraPersonaDAL();
            return miManejadora.insertPersonaDAL(persona);
        }

        public int deletePersonaBL(int id)
        {
            manejadoraPersonaDAL miManejadora = new manejadoraPersonaDAL();
            return miManejadora.deletePersonaDAL(id);
        }

        public int updatePersonaBL(Persona persona)
        {
            manejadoraPersonaDAL miManejadora = new manejadoraPersonaDAL();
            return miManejadora.updatePersonaDAL(persona);
        }

        public Persona selectPersonaBL(int id)
        {
            manejadoraPersonaDAL miManejadora = new manejadoraPersonaDAL();
            return miManejadora.selectPersonaDAL(id);
        }
    }
}
