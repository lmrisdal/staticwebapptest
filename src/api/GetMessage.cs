using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System;

namespace StaticApp.Api
{
    public static class GetMessage
    {
        static HttpClient httpClient { get; set; }
        static GetMessage()
        {
            httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("https://12d26a8f-2153-4d4d-ac09-f4b9c72711c8.mock.pstmn.io");
            //Hente fra KV
            httpClient.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "123");
            //GetToken();
        }
        [FunctionName("GetMessage")]
        public static async Task<string> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "message")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            // string name = req.Query["name"];
            //HttpClient httpClient = new HttpClient();
            // string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            // dynamic data = JsonConvert.DeserializeObject(requestBody);
            // name = name ?? data?.name;
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage()
            {
                RequestUri = new Uri($"{httpClient.BaseAddress}/stations"),
                Method = HttpMethod.Get
            };
            var k = await httpClient.SendAsync(httpRequestMessage);
            return await k.Content.ReadAsStringAsync();


            // string responseMessage = string.IsNullOrEmpty(name)
            //     ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
            //     : $"Hello, {name}. This HTTP triggered function executed successfully.";

            // var responseMessage = new { message = "Hello from the .NET API" };

            // return new OkObjectResult(responseMessage);
        }
        // public void GetToken()
        // {
        //     string r = Environment.GetEnvironmentVariable("OnboardingAPIResource");
        //     string c = KeyVaultConfiguration.GetSecretAsync("EsbClientId").Result;
        //     string s = KeyVaultConfiguration.GetSecretAsync("EsbClientSecret").Result;
        //     string token = auth.GetOAuthTokenAsApp(r, c, s).AccessToken;
        //     httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        // }
    }
}
