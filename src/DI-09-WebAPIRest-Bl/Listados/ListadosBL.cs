using DI_09_WebAPIRest_Dal.Listados;
using DI_09_WebAPIRest_Ent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DI_09_WebAPIRest_Bl.Listados
{
    public class ListadosBL
    {
        public List<Persona> listadoPersonasBL()
        {
            List<Persona> devolver;
            ListadosDAL listDAL = new ListadosDAL();
            devolver = listDAL.listadoPersonas();
            return devolver;
        }
    }
}
