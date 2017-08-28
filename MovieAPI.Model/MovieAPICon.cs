using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using RealTest.Model;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Formatting;

namespace MovieAPI.Model
{
    public class MovieAPICon
    {
        private const string URL = "http://localhost/";
        HttpClient client = new HttpClient();

        public bool Get()
        {
            client.BaseAddress = new Uri(URL);

            // JSON 형식에 대한 Accept 헤더 추가
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = client.GetAsync("movies/Get").Result;
            Console.WriteLine(response);
            if (response.IsSuccessStatusCode)
            {
                //응답 본문 파싱. 블록킹??
                var movies = response.Content.ReadAsAsync<IEnumerable<Movie>>().Result;
                //foreach (var m in movies)
                //{
                //    Console.WriteLine("{0}\t{1}\t{2}\t{3}\t{4}\t{5}\t{6}", m.ID, m.Title, m.ReleaseDate, m.Genre, m.Price, m.Rating, m.Review);
                //}
                return true;
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
                return false;
            }
        }

        public bool Post(Movie movie)
        {
            client.BaseAddress = new Uri(URL);
            // JSON 형식에 대한 Accept 헤더 추가
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            //POST
            var nmovies = movie ;
            Uri nmoviesUri = null;

            HttpResponseMessage response = client.PostAsJsonAsync("movies/post",nmovies).Result;
            if (response.IsSuccessStatusCode)
            {
                nmoviesUri = response.Headers.Location;
                return true;
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
                return false;
            }
        }

        public bool Delete(int id)
        {
            client.BaseAddress = new Uri(URL);
            // JSON 형식에 대한 Accept 헤더 추가
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            Uri dmoivesUri = null;
            HttpResponseMessage response = client.DeleteAsync("movies/Delete/"+id).Result;
            if (response.IsSuccessStatusCode)
            {
                dmoivesUri = response.Headers.Location;
                return true;
            }
            else
            {
                Console.Write("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
                return false;
            }
        }

        public bool Put(int id,Movie movie)
        {           
            client.BaseAddress = new Uri(URL);
            // JSON 형식에 대한 Accept 헤더 추가
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));            
            
            Uri pmoviesUri = null;

            
            HttpResponseMessage response = client.PutAsJsonAsync("movies/Put/" + id, movie).Result;
            if (response.IsSuccessStatusCode)
            {
                pmoviesUri = response.Headers.Location ;
                return true;
            }
            else
            {
                Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
                return false;
            }

            
        }


    }
}
