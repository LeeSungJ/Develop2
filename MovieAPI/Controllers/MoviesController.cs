using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RealTest.Model;

namespace MovieAPI.Controllers
{
    public class MoviesController : Controller
    {
        private MovieDBContext2 dbCon = new MovieDBContext2();
        DBCon con = new DBCon();
        // GET: Movie
        public ActionResult Index()
        {
            return Json(new { Id = 1, Name = "simon" }, JsonRequestBehavior.AllowGet);
        }

        [Route("")]

        [HttpGet]
        public ActionResult Get()
        {
            string movieGenre = null;
            string searchString = null;

            var movies = con.GetMovies(movieGenre, searchString);

            return Json(new { movies }, JsonRequestBehavior.AllowGet );
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var movies = con.DeleteMovie(id);

            if(movies == true)
            {
                string movieGenre = null;
                string searchString = null;

                var result = con.GetMovies(movieGenre, searchString);

                return Json(new { result });
            }
            else
            {
                return Json(new { reason = "Fail"});
            }
        }

        [HttpPost]
        public ActionResult Post([Bind(Include = "ID, Title, ReleaseDate, Genre, Price, Rating, Review")] Movie movie)
        {
            var movies = con.AddMovie(movie);

            if (movies == true)
            {
                string movieGenre = null;
                string searchString = null;

                var result = con.GetMovies(movieGenre, searchString);

                return Json(new { result });
            }
            else
            {
                return HttpNotFound();
            }
        }

        [HttpPost]
        public ActionResult Put([Bind(Include = "ID, Title, ReleaseDate, Genre, Price, Rating, Review")] Movie movie)
        {
            if (ModelState.IsValid)
            {
                var result = con.EditMovie(movie);

                if (result == true)
                {
                    string movieGenre = null;
                    string searchString = null;

                    var movies = con.GetMovies(movieGenre, searchString);

                    return Json(new { movies });
                }
                else
                {
                    return HttpNotFound();
                }


            }
            return View(movie);
        }
    }
}