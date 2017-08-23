using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MovieAPI.Controllers;
using System.Web;
using RealTest.Model;

namespace MovieAPI.Model
{
    public class MovieAPICon
    {
        MoviesController mcon = new MoviesController();

        public bool GetAPI()
        {
            var movies = mcon.Get();

            return true;
        }

        public bool PostAPI(Movie movie)
        {
            var movies = mcon.Post(movie);

            return true;
        }

        public bool DeleteAPI(int id)
        {
            var movies = mcon.Delete(id);

            return true;
        }

        public bool PutAPI(Movie movie)
        {
            var movies = mcon.Put(movie);

            return true;
        }

    }
}
