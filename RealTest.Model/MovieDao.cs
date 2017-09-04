using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;



namespace RealTest.Model
{
    public class MovieDao
    {
        public IList<Movie> GetMovies(string movieGenre, string searchString)
        {
            using(var db = new MovieDBContext())
            {
                IQueryable<Movie> query = db.Movies.AsNoTracking();

                if (string.IsNullOrEmpty(movieGenre) == false)
                {
                    query = query.Where(m => m.Genre == movieGenre);
                }

                if (string.IsNullOrEmpty(searchString) == false)
                {
                    query = query.Where(m => m.Title.Contains(searchString));
                }

                return query.ToList();
            }
        }        
        
        public bool DeleteMovie(int id)
        {            
            using (var db = new MovieDBContext())
            {
                var movie = db.Movies.Find(id);
                if(movie == null)
                {
                    return false;
                }
                else
                {
                    var delete = db.Entry(movie).State = EntityState.Deleted;
                    var dbChange = db.SaveChanges();
                }
                return true;
            }
        }
        
        public bool EditMovie(Movie movie)
        {
            using (var db = new MovieDBContext())
            {
                if(movie == null)
                {
                    return false;
                }
                else
                {
                    var edit = db.Entry(movie).State = EntityState.Modified;
                    var dbChange = db.SaveChanges();
                }
                return true;
            }
        }
        
        public bool AddMovie(Movie movie)
        {
            using(var db = new MovieDBContext())
            {
                var addMovie = db.Movies.Add(movie);
                var dbChange = db.SaveChanges();
                return true;
            }
        }
        
        public IList<string> GetGenres()
        {
            using(var db = new MovieDBContext())
            {
                var genreList = new List<string>();

                var genreQuery = from m in db.Movies
                               orderby m.Genre
                               select m.Genre;

                genreList.AddRange(genreQuery.Distinct());

                return genreList;
            }
        }
        
        public Movie GetMovie(int? id)
        {   
            using (var db = new MovieDBContext())
            {
                var movie = db.Movies.Find(id);
                return movie;
            }
        }
    }
}