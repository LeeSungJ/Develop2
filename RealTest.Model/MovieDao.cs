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
    public class MovieDao
    {
        //Get
        public IList<Movie> GetMovies()
        {
            using(var db = new MovieDBContext())
            {
                var movies = from m in db.Movies
                             select m;

                return movies.ToList();
            }
        }

        //기존 프로젝트에서 장르랑 입력한 값 검색하는 메소드
        public IList<Movie> Find(string movieGenre, string searchString)
        {
            using(var db = new MovieDBContext())
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
            
        }        

        //Delete
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
                    var delete = db.Movies.Remove(movie);

                    var dbChange = db.SaveChanges();
                }

                return true;
            }
        }

        //Put
        public bool EditMovie(Movie movie)
        {
            using (var db = new MovieDBContext())
            {
                var edit = db.Entry(movie).State = EntityState.Modified;
                var dbChange = db.SaveChanges();

                return true;
            }
        }

        //Post
        public bool AddMovie(Movie movie)
        {
            using(var db = new MovieDBContext())
            {
                var add = db.Movies.Add(movie);
                var dbChange = db.SaveChanges();
                return true;
            }
         
        }

        //장르 가져오기 본 프로젝트랑 연동하면서 써야한다.
        public IList<string> GetGenre()
        {
            using(var db = new MovieDBContext())
            {
                var genreLst = new List<string>();

                var genreQry = from m in db.Movies
                               orderby m.Genre
                               select m.Genre;

                genreLst.AddRange(genreQry.Distinct());

                return genreLst;
            }
        }

        //필요없을거 같은데 본 프로젝트랑 연동하면서 지우고 소스 고쳐보자.
        public bool FindId(int? id)
        {   
            using (var db = new MovieDBContext())
            {
                var movie = db.Movies.Find(id);

                return true;
            }
        }
        
    }


    

}