using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using RealTest.Model;


namespace RealTest.Controllers
{
    public class MoviesController : Controller
    {
        private MovieDBContext db = new MovieDBContext();
        MovieDao con = new MovieDao();

        // GET: Movies
        public ActionResult Index(string movieGenre, string searchString)
        {                     
            
            var genreLst = con.GetGenre();
            
                ViewBag.movieGenre = new SelectList(genreLst, "action");
                                   
            var movies = con.Find(movieGenre, searchString);

            return View(movies);
        }
       

        // GET: Movies/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            // Movie movie = db.Movies.Find(id);

            var movies = con.FindId(id);

            //if (movie == null)
            //{
            //    return HttpNotFound();
            //}

            if(movies == true)
            {
                return View(con.FindId(id));
            }
            else
            {
                return HttpNotFound();
            }
            
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
        public ActionResult Create([Bind(Include = "ID, Title, ReleaseDate, Genre, Price, Rating, Review")] Movie movie)
        {

            if (ModelState.IsValid)
            {                               
                var result = con.AddMovie(movie);

                if(result == true)
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    HttpNotFound();
                }
                                
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

            var movie = db.Movies.Find(id);

            if (movie == null)
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
        public ActionResult Edit([Bind(Include = "ID, Title, ReleaseDate, Genre, Price, Rating, Review")] Movie movie)
        {
            if (ModelState.IsValid)
            {
                var result = con.EditMovie(movie);

                if(result == true)
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    return HttpNotFound();
                }
                
                
            }
            return View(movie);
        }
        
        // GET: Movies/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            Movie movie = db.Movies.Find(id);

            if (movie == null)
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
            var result = con.DeleteMovie(id);

            if (result == true)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return HttpNotFound();
            }
            
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        
    }
}
