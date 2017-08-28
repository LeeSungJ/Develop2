using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Web;
using System.Web.Mvc;
using System.Net;



namespace RealTest.Model
{
    public class DBCon
    {
        private MovieDBContext2 db = new MovieDBContext2();


        public IList<Movie> GetMovies(string movieGenre, string searchString)
        {

            var movies = from m in db.Movies
                         select m;

            if (!String.IsNullOrEmpty(searchString))
            {
                movies = movies.Where(s => s.Title.Contains(searchString));
            }
            
            if (!string.IsNullOrEmpty(movieGenre))
            {
                movies = movies.Where(x => x.Genre == movieGenre);
            }
            
            return movies.ToList();
        }        

        //Post
        public bool DeleteMovie(int id)
        {
            Movie movie = db.Movies.Find(id);

            if(movie == null)
            {
                return false;
            }
            else
            {
                var delete = db.Movies.Remove(movie);

                var dbChange = db.SaveChanges();

                
            }
            
            return true;

        }

        //Post
        public bool EditMovie(Movie movie)
        {
            var modify = db.Entry(movie).State = EntityState.Modified;
            var dbChange = db.SaveChanges();
            return true;
        }


        public bool AddMovie(Movie movie)
        {                             
               var add = db.Movies.Add(movie);
               var dbChange = db.SaveChanges();
               return true;
        }

        
        public IList<string> GetGenre()
        {
            var genreLst = new List<string>();

            var genreQry = from m in db.Movies
                           orderby m.Genre
                           select m.Genre;

            genreLst.AddRange(genreQry.Distinct());

            return genreLst;
        }

        public bool FindId(int? id)
        {
            Movie movie = db.Movies.Find(id);
            return true;
        }
        
        
    }


    

}