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
        private MovieDao dao;

        public MoviesController()
        {
            dao = new MovieDao();
        }

        // GET: Movie
        public ActionResult Index()
        {
            return Json(new { Id = 1, Name = "simon" }, JsonRequestBehavior.AllowGet);
        }

        [Route("")]
        [HttpGet]
        public ActionResult Get()
        {
            var movies = dao.GetMovies();

            return Json(new { movies }, JsonRequestBehavior.AllowGet);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            var movies = dao.DeleteMovie(id);

            if(movies == true)
            {
                var result = dao.GetMovies();

                return Json(new { result });
            }
            else
            {
                return Json(new { reason = "Fail"});
            }
        }

        [HttpPost]
        public ActionResult Post(Movie movie)
        {
            var movies = dao.AddMovie(movie);

            if (movies == true)
            {
                var result = dao.GetMovies();

                return Json(new { result });
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
                    var movies = dao.GetMovies();

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