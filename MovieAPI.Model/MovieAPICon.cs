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
using Newtonsoft.Json;
using System.Web.Http;
using System.Net;


namespace MovieAPI.Model
{
    public class MovieAPICon
    {
        

        public IList<char> Get()
        {
            string URL = "http://localhost/";
            var client = new HttpClient();

            client.BaseAddress = new Uri(URL);

            // JSON 형식에 대한 Accept 헤더 추가
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            //GetAsync는 HTTP GET 요청을 전송.(비동기적)
            var response = client.GetAsync("movies/Get").Result;
            
            if (response.IsSuccessStatusCode)
            {
                //응답이 성공하면 목록이 응답 본문에 JSON 형태로 담겨짐. 본문 파싱.        
                var movies = response.Content.ReadAsStringAsync().Result;
               
                return movies.ToList();
            }
            else
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        public string Post(Movie movie)
        {
            string URL = "http://localhost/";
            var client = new HttpClient();
            client.BaseAddress = new Uri(URL);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            
            var response = client.PostAsJsonAsync("movies/post", movie).Result;
            if (response.IsSuccessStatusCode)
            {
                var result = Newtonsoft.Json.JsonConvert.SerializeObject(movie);
                return result;
            }
            else
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        public bool Delete(int id)
        {
            string URL = "http://localhost/";
            var client = new HttpClient();
            client.BaseAddress = new Uri(URL);
            // JSON 형식에 대한 Accept 헤더 추가
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            
            var response = client.DeleteAsync("movies/Delete/"+id).Result;

            if (response.IsSuccessStatusCode)
            {
                return true;
            }
            else
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        public string Edit(Movie movie)
        {
            string URL = "http://localhost/";
            var client = new HttpClient();
            client.BaseAddress = new Uri(URL);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = client.PostAsJsonAsync("movies/Edit/{movie.ID}", movie).Result;

            if (response.IsSuccessStatusCode)
            {
                var result = Newtonsoft.Json.JsonConvert.SerializeObject(movie);
                return result;
            }
            else
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            

        }
        
    }

}
