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
        private MovieDao dao = new MovieDao();

        // GET: Movie
        public ActionResult Index()
        {
            return Json(new { Id = 1, Name = "simon" }, JsonRequestBehavior.AllowGet);
        }
        
        [HttpGet]
        public ActionResult GetMovies(string movieGenre, string searchString)
        {
            var movies = dao.GetMovies(movieGenre, searchString);
			
            return Json(movies, JsonRequestBehavior.AllowGet);
        }

        //Index화면 장르 목록
        [HttpGet]
        public ActionResult GetGenres()
        {
            var genre = dao.GetGenres();
            return Json(genre, JsonRequestBehavior.AllowGet);
        }

		[HttpGet]
		public ActionResult GetGenreList()
		{
			var genre = dao.GetGenresList();
			return Json(genre, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public ActionResult GetPriceMovies(int? firstPrice, int? endPrice)
		{
			var priceMovie = dao.GetPrices(firstPrice, endPrice);
			return Json(priceMovie, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
        public ActionResult GetMovie(int id)
        {
            var movies = dao.GetMovie(id);
            return Json(movies, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Delete(int id)
        {
            var movies = dao.DeleteMovie(id);

            if (movies == true)
            {
                var result = dao.GetMovies("", "");
                return Json( result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(null);
            }
        }

        [HttpPost]
        public ActionResult Post(Movie movie)
        {
            var movies = dao.AddMovie(movie);

            if (movies == true)
            {
                var result = dao.GetMovies("", "");
                return Json( result );
            }
            else
            {
                return HttpNotFound();
            }
        }

        [HttpPost]
        public ActionResult Edit(Movie movie)
        {
            if (ModelState.IsValid)
            {
                var result = dao.EditMovie(movie);
                if (result == true)
                {
                    var movies = dao.GetMovies("", "");
                    return Json(movies);
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