using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DI_09_WebAPIRest_Ent
{
    public class Persona
    {
        public int id { get; set; }
        [Required,MaxLength(20)]
        public string Nombre { get; set; }
        [MaxLength(50)]
        public string Apellidos { get; set; }
        [DisplayFormat(ApplyFormatInEditMode =true,DataFormatString ="{0:d}")]
        public DateTime FechaNac { get; set; }
        [MaxLength(10)]
        public string telefono { get; set; }
        [MaxLength(100)]
        public string direccion { get; set; }

        public Persona(){
            id = 0;
            Nombre = "";
            Apellidos = "";
            FechaNac = new DateTime();
            direccion = "Mi casa";
            telefono = "teléeefono";
            }

        public Persona(int parId,string nombre, string apellidos, DateTime fechaNac,
            string direccion,string telefono)
        {
            this.id = parId;
            this.Nombre = nombre;
            this.Apellidos = apellidos;
            this.FechaNac = fechaNac;
            this.telefono = telefono;
            this.direccion = direccion;
        }
    }
}
