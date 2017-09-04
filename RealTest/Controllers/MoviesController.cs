using System.Net;
using System.Web.Mvc;
using MovieAPI.Model;


namespace RealTest.Controllers
{
    public class MoviesController : Controller
    {
        MovieAPIService apiService = new MovieAPIService();
        
        // GET: Movies 
        public ActionResult Index(string movieGenre, string searchString)
        {
            var genreList = apiService.GetGenres();
            ViewBag.movieGenre = new SelectList(genreList);
            
            var movies = apiService.GetMovies(movieGenre, searchString);
            return View(movies);
        }

        // GET: Movies/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var movies = apiService.GetMovie(id);

            return View(movies);
        }

        // GET: Movies/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Movies/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Movie movie)
        {
            var result = apiService.PostMovie(movie);
            if(result == true)
            {
                return RedirectToAction("Index");
            }
            else
            {
                HttpNotFound();
            }

            return View(movie);
        }

        // GET: Movies/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var movie = apiService.GetMovie(id);

            if (movie.Equals(null))
            {
                return HttpNotFound();
            }
            return View(movie);
        }

        // POST: Movies/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Movie movie)
        {
            var result = apiService.EditMovie(movie);

            if(result == true)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return HttpNotFound();
            }
        }
        
        // GET: Movies/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var movie = apiService.GetMovie(id);

            if (movie.Equals(null))
            {
                return HttpNotFound();
            }
            return View(movie);
        }

        // POST: Movies/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            var result = apiService.DeleteMovie(id);

            if (result == true)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return HttpNotFound();
            }
        }
    }
}
