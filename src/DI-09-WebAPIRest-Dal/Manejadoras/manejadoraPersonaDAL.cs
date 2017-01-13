using DI_09_WebAPIRest_Dal.Conexion;
using DI_09_WebAPIRest_Ent;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DI_09_WebAPIRest_Dal.Manejadoras
{
	public class manejadoraPersonaDAL{
		
		private MyConnection miCon;
		
		public manejadoraPersonaDAL(){
			miCon=new MyConnection();
		
		}
		/// <summary>
        /// NO ACABADA
        /// </summary>
        /// <param name="persona"></param>
        /// <returns></returns>
		public int insertPersonaDAL(Persona persona){
			int i=0;

            SqlCommand miComando = new SqlCommand();
            miComando.Parameters.Add("@nombre", System.Data.SqlDbType.VarChar).Value = persona.Nombre;
            miComando.Parameters.Add("@apellidos", System.Data.SqlDbType.VarChar).Value = persona.Apellidos;
            miComando.Parameters.Add("@fechaNac", System.Data.SqlDbType.DateTime).Value = persona.FechaNac;
            miComando.Parameters.Add("@direccion", System.Data.SqlDbType.VarChar).Value = persona.direccion;
            miComando.Parameters.Add("@telefono", System.Data.SqlDbType.VarChar).Value = persona.telefono;

            try
            {
				miCon.openConnection();

                miComando.CommandText = "Insert Into personas(nombre,apellidos,fechaNac,direccion,telefono) VALUES "
                    +"(@nombre,@apellidos,@fechaNac,@direccion,@telefono)";
                miComando.Connection = miCon.connection;
                i=miComando.ExecuteNonQuery();
				
			}catch(SqlException){
                throw;
            }
			finally{
				miCon.closeConnection();
			}
			return i;
		}


        public int deletePersonaDAL(int id)
        {
            int delete = 0;
            SqlCommand miComando = new SqlCommand();

            try
            {
                miCon.openConnection();
                miComando.Connection = miCon.connection;
                miComando.Parameters.Add("@id",System.Data.SqlDbType.Int).Value=id;

                miComando.CommandText = "Delete From personas where IdPersona=@id";
                miComando.Connection = miCon.connection;
                delete = miComando.ExecuteNonQuery();

            }
            catch (SqlException) {
                throw;
            }
            finally
            {
                miCon.closeConnection();
            }

            return delete;
        }
        /// <summary>
        /// Mñetodo que actualiza una persona
        /// </summary>
        /// <param name="persona"></param>
        /// <returns>0 si la actualización no ha sido correcto. Otro número en caso contrario</returns>
        public int updatePersonaDAL(Persona persona)
        {
            int correcto=0;
            SqlCommand miCommand = new SqlCommand();

            try
            {
                miCon.openConnection();
                miCommand.Connection = miCon.connection;
                miCommand.Parameters.Add("@id",System.Data.SqlDbType.Int).Value=persona.id;
                miCommand.Parameters.Add("@nombre", System.Data.SqlDbType.VarChar).Value = persona.Nombre;
                miCommand.Parameters.Add("@apellidos", System.Data.SqlDbType.VarChar).Value = persona.Apellidos;
                miCommand.Parameters.Add("@fechaNac", System.Data.SqlDbType.DateTime).Value = persona.FechaNac;
                miCommand.Parameters.Add("@direccion", System.Data.SqlDbType.VarChar).Value = persona.direccion;
                miCommand.Parameters.Add("@telefono", System.Data.SqlDbType.VarChar).Value = persona.telefono;

                miCommand.CommandText = "Update personas set nombre=@nombre,apellidos=@apellidos," +
                    "fechaNac=@fechaNac,direccion=@direccion,telefono=@telefono Where IDPersona=@id";
                correcto=miCommand.ExecuteNonQuery();
                correcto = correcto + 1;
                correcto--;
            }
            catch (SqlException)
            {
                throw;
            }
            finally
            {
                miCon.closeConnection();
            }
            return correcto;
        }

        public Persona selectPersonaDAL(int id)
        {
            Persona p =null;
            SqlCommand miCommand = new SqlCommand();
            SqlDataReader lector;
            try
            {
                miCon.openConnection();
                miCommand.Connection = miCon.connection;
                miCommand.Parameters.Add("@id", System.Data.SqlDbType.Int).Value = id;
                miCommand.CommandText = "Select nombre,apellidos,fechaNac,direccion,telefono from personas where IDPersona=@id";
                lector=miCommand.ExecuteReader();

                
                if (lector.HasRows)
                {
                    lector.Read();
                    p = new Persona();
                    p.id = id;
                    p.Nombre = (String)lector["nombre"];
                    p.Apellidos = (String)lector["apellidos"];
                    p.FechaNac = (DateTime)lector["fechaNac"];
                    p.direccion = (String)lector["direccion"];
                    p.telefono = (String)lector["telefono"];
                }
            }
            catch (SqlException)
            {
                throw;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                miCon.closeConnection();
            }

            return p;
        }
	}
}
