using DI_09_WebAPIRest_Dal.Conexion;
using DI_09_WebAPIRest_Ent;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DI_09_WebAPIRest_Dal.Listados
{
    public class ListadosDAL
    {
        /// <summary>
        /// Devuelve un listado de personas de la base de datos, o lanza una excepción en caso de que 
        /// la conexión falle, o algo bloquee la tabla personas
        /// </summary>
        /// <returns></returns>
        public List<Persona> listadoPersonas()
        {
            Persona miPer;
            List<Persona> devolver = new List<Persona>();
            MyConnection conn = new MyConnection();
            SqlCommand consulta = new SqlCommand();
            SqlDataReader lector;
            try
            {
                //Abrimos la conexión
                conn.openConnection();
                //Cambiar todo por enum o constantes!!!
                consulta.CommandText = "Select IDPersona,nombre,apellidos,fechaNac," +
                    "direccion,telefono From personas";
                consulta.Connection = conn.connection;
                lector = consulta.ExecuteReader();

                if (lector.HasRows)
                {
                    while (lector.Read())
                    {
                        miPer = new Persona();
                        miPer.id = (int)lector["IDPersona"];
                        miPer.Nombre = (String)lector["nombre"];
                        miPer.Apellidos = (String)lector["apellidos"];
                        miPer.FechaNac = (DateTime)lector["fechaNac"];
                        miPer.direccion = (String)lector["direccion"];
                        miPer.telefono = (String)lector["telefono"];
                        devolver.Add(miPer);
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                conn.closeConnection();
                
            }
            return devolver;
        }
    }
}
