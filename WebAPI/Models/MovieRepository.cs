using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RealTest.Model;

namespace WebAPI.Models
{
    public class MovieRepository : IMovieRepository
    {
        MovieDBContext dbCon = new MovieDBContext();
        MovieDao con = new MovieDao();

        private List<Movie> movies = new List<Movie>();
        private int _nextId = 1;

        public MovieRepository()
        {
            //Add(new Movie { Title = "Movie Name", Genre = "Action", Price = 10, ReleaseDate = DateTime.Today, Rating = "A", Review = "So" });
        }

        public IEnumerable<Movie> GetAll()
        {
            string movieGenre = null;
            string searchString = null;
            var movies = con.Find(movieGenre, searchString);

            return movies;
        }

        public bool Get(int id)
        {
            
            var movie = con.FindId(id);

            if(movie == true)
            {
                return con.FindId(id);
            }
            else
            {
                return false;
            }
        }

        public Movie Add(Movie item)
        {
            if(item == null)
            {
                throw new ArgumentNullException("item");
            }
            item.ID = _nextId++;
            movies.Add(item);
            return item;
        }

        public void Remove(int id)
        {
            var moive = con.DeleteMovie(id);
        }

        public bool Update(Movie item)
        {
            if(item == null)
            {
                throw new ArgumentNullException("item");

            }
            int index = movies.FindIndex(p => p.ID == item.ID);
            if(index == -1)
            {
                return false;
            }
            movies.RemoveAt(index);
            movies.Add(item);

            //con.EditMovie(item);
            
            return true;
        }

            
    }
}