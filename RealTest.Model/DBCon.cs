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


        public IList<GSModel> GetMovies(string movieGenre, string searchString)
        {

            var movies = from m in db.Movies2
                         select m;

            if (!String.IsNullOrEmpty(searchString))
            {
                movies = movies.Where(s => s.Title.Contains(searchString));
            }
            
            if (!string.IsNullOrEmpty(movieGenre))
            {
                movies = movies.Where(x => x.Genre == movieGenre);
            }
            
            return movies.ToList() ;
        }        

        //Post
        public bool DeleteMoviePost(int id)
        {
            GSModel movie = db.Movies2.Find(id);
            db.Movies2.Remove(movie);
            db.SaveChanges();
            return true;

        }

        //Post
        public bool EditMoviePost(GSModel movie)
        {
            db.Entry(movie).State = EntityState.Modified;
            db.SaveChanges();
            return true;
        }


        public bool AddMovie(GSModel movie)
        {                             
                db.Movies2.Add(movie);
                db.SaveChanges();
                return true;
        }

        
        public IList<string> GetGenre()
        {
            var GenreLst = new List<string>();

            var GenreQry = from m in db.Movies2
                           orderby m.Genre
                           select m.Genre;

            GenreLst.AddRange(GenreQry.Distinct());

            return GenreLst;
        }

        public bool FindId(int? id)
        {
            GSModel movie = db.Movies2.Find(id);
            return true;
        }
        

    }


    

}