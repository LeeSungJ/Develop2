using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Formatting;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Web.Http;
using System.Net;
using System.ComponentModel.DataAnnotations;

namespace MovieAPI.Model
{
    public class MovieAPIService
    {
        public IEnumerable<Movie> GetMovies(string movieGenre, string searchString)
        {
            using (var client = new HttpClient()) {
                var domain = "http://localhost/";
                client.BaseAddress = new Uri(domain);
                // JSON 형식에 대한 Accept 헤더 추가
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //GetAsync는 HTTP GET 요청을 전송.(비동기적)
                
                var response = client.GetAsync("movies/GetMovies/?movieGenre=" + movieGenre + "&SearchString=" + searchString).Result;
                if (response.IsSuccessStatusCode)
                {     
                    var result = response.Content.ReadAsStringAsync().Result;
                    var movies = JsonConvert.DeserializeObject<IList<Movie>>(result);

                    return movies;
                }
                else
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }
            }
        }

        public IList<string> GetGenres()
        {
            using (var client = new HttpClient())
            {
                var domain = "http://localhost/";
                client.BaseAddress = new Uri(domain);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var response = client.GetAsync("movies/GetGenres").Result;
                if (response.IsSuccessStatusCode)
                {
                    var result = response.Content.ReadAsStringAsync().Result;
                    var movies = JsonConvert.DeserializeObject<IList<string>>(result);

                    return movies;
                }
                else
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }
            } 
        }
        
        public Movie GetMovie(int? id)
        {
            if(id == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                using (var client = new HttpClient())
                {
                    var domain = "http://localhost/";
                    client.BaseAddress = new Uri(domain);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    var response = client.GetAsync("movies/GetMovie/" + id).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        //응답이 성공하면 목록이 응답 본문에 JSON 형태로 담겨짐. 본문 파싱.        
                        var result = response.Content.ReadAsStringAsync().Result;
                        var movies = JsonConvert.DeserializeObject<Movie>(result);

                        return movies;
                    }
                    else
                    {
                        throw new HttpResponseException(HttpStatusCode.NotFound);
                    }
                }
            }
        }

        public bool PostMovie(Movie movie)
        {
            using (var client = new HttpClient())
            {
                var domain = "http://localhost/";
                client.BaseAddress = new Uri(domain);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var response = client.PostAsJsonAsync("movies/Post", movie).Result;
                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
                else
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }
            }
        }

        public bool DeleteMovie(int? id)
        {
            if(id == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                using (var client = new HttpClient())
                {
                    var domain = "http://localhost/";
                    client.BaseAddress = new Uri(domain);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    var response = client.DeleteAsync("movies/Delete/" + id).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        return true;
                    }
                    else
                    {
                        throw new HttpResponseException(HttpStatusCode.NotFound);
                    }
                }
            }
        }

        public bool EditMovie(Movie movie)
        {
            using (var client = new HttpClient())
            {
                var domain = "http://localhost/";
                client.BaseAddress = new Uri(domain);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var response = client.PostAsJsonAsync("movies/Edit/{movie.ID}", movie).Result;
                if (response.IsSuccessStatusCode)
                {
                    return true;
                }
                else
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }
            }
        }
    }
    public class Movie
    {
        public int ID { get; set; }

        [StringLength(60, MinimumLength = 3)]
        public string Title { get; set; }

        [Display(Name = "Release Date"), DataType(DataType.Date)]
        public DateTime ReleaseDate { get; set; }

        [RegularExpression(@"^[A-Z]+[a-zA-Z''-'\s]*$")]
        [Required]
        [StringLength(30)]
        public string Genre { get; set; }

        [Range(1, 100), DataType(DataType.Currency)]
        public decimal Price { get; set; }

        [RegularExpression(@"^[A-Z]+[a-zA-Z''-'\s]*$")]
        [StringLength(5)]
        public string Rating { get; set; }

        [StringLength(5)]
        public string Review { get; set; }
     }
}
