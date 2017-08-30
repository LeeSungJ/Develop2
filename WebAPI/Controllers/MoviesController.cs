using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using RealTest.Model;
using WebAPI.Models;
using System.Linq.Expressions;
using WebAPI.DTOs;



namespace WebAPI.Controllers
{
    [RoutePrefix("api/movies")]
    public class MoviesController : ApiController
    {
       
        private MovieDBContext db = new MovieDBContext();
        MovieDao con = new MovieDao();

       
       
    
        // GET: api/Movies
        [Route("")]
        public IList<Movie> GetMovies()  //public IQueryable<MovieDto> GetMovies()
        {
            string movieGenre = null;
            string searchString = null;

            var movies = con.Find(movieGenre, searchString);

            return movies;
        }


        // GET: api/Movies/id
         //public Movie GetMovies(int id)
         //{
         //   Movie item = repository.Get(id);
         //   if(item == null)
         //   {
         //       throw new HttpResponseException(HttpStatusCode.NotFound);
         //   }
         //   return item;
         //}
                

        // GET: api/Movies/5
        [ResponseType(typeof(Movie))]
        public async Task<IHttpActionResult> GetMovie(int id)
        {
            Movie movie = await db.Movies.FindAsync(id);

            var movies = con.FindId(id);

            if (movies == false)
            {
                return NotFound();
            }
            else
            {
                return Ok(movie);
            }            
        }
        
        
      

        //GET Details
        [Route("{id:int}/details")]
        [ResponseType(typeof(MovieDetailDto))]
        public async Task<IHttpActionResult> GetMovieDetail(int id)
        {
            var movie = await (from m in db.Movies.Include(m => m.Title)
                               where m.ID == id
                               select new MovieDetailDto
                               {
                                   Title = m.Title,
                                   Genre = m.Genre,
                                   ReleaseDate = m.ReleaseDate,
                                   Price = m.Price,
                                   Review = m.Review,
                                   Rating = m.Rating 
                                   
                               }).FirstOrDefaultAsync();

            var chkecMovie = con.FindId(id);


            if(chkecMovie == false)
            {
                return NotFound();
            }
            else
            {
                return Ok(movie);
            }
        }

        //GET 장르별
        //[Route("{genre}")]
        //public IQueryable<MovieDto> GetMoviesByGenre(string genre)
        //{
        //    return db.Movies2.Include(m => m.Title)
        //        .Where(m => m.Genre.Equals(genre, StringComparison.OrdinalIgnoreCase))
        //        .Select(AsMovieDto);
        //}

        //[Route("date/{pubdate:datetime:regex(\\d{4}-\\d{2}-\\d{2})}")]
        //[Route("date/{*pubdate:datetime:regex(\\d{4}/\\d{2}/\\d{2})}")] // new
        //public IQueryable<MovieDto> GetMovies(DateTime pubdate)
        //{
        //    return db.Movies2.Include(m => m.Title)
        //        .Where(m => DbFunctions.TruncateTime(m.ReleaseDate)
        //        == DbFunctions.TruncateTime(pubdate))
        //        .Select(AsMovieDto);
        //}


        // PUT: api/Movies/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMovie(int id, Movie movie)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != movie.ID)
            {
                return BadRequest();
            }

            db.Entry(movie).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!MovieExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Movies
        //[ResponseType(typeof(Movie))]
        //public async Task<IHttpActionResult> PostMovie(Movie movie)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Movies2.Add(movie);
        //    await db.SaveChangesAsync();

        //    return CreatedAtRoute("DefaultApi", new { id = movie.ID }, movie);
        //}

        public bool PostMovie(Movie item)
        {
            var movies = con.EditMovie(item);

            if(movies == true)
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        // DELETE: api/Movies/5
        [ResponseType(typeof(Movie))]
        public async Task<IHttpActionResult> DeleteMovie(int id)
        {
            Movie movie = await db.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            db.Movies.Remove(movie);
            await db.SaveChangesAsync();

            return Ok(movie);
        }

        

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MovieExists(int id)
        {
            return db.Movies.Count(e => e.ID == id) > 0;
        }
    }
}