using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;
using RealTest.Model;

namespace WebApi.Controllers
{
    public class ProductsController : ApiController
    {
        private MovieDBContext2 db = new MovieDBContext2();
        DBCon con = new DBCon();

        
        

        public IEnumerable<GSModel> GetAllProducts()
        {
            var movies = from m in db.Movies2
                         select m;

            return movies.ToList();
        }

        public IHttpActionResult GetProduct(int id)
        {
            GSModel movie = db.Movies2.Find(id);

            if(movie == null)
            {
                return NotFound();
            }
            return Ok(movie);
        }

    
    }
}
