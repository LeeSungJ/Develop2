using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RealTest.Model;

namespace WebAPI.DTOs
{
    public class MovieDto
    {
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string Genre { get; set; }

        //public static implicit operator MovieDto(Movie v)
        //{
        //    throw new NotImplementedException();
        //}
    }
}