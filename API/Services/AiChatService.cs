using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Services
{
    public class AiChatService : IAiChatService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiModel;
        private readonly string _apiUrl;

        public AiChatService(IConfiguration config)
        {
            _httpClient = new HttpClient();
            _apiUrl = config["Ollama3:ApiUrl"];
            _apiModel = config["Ollama3:ApiModel"];
        }


        public async Task<string> GetAiResponseAsync(string userMessage, string conversationContext, string userContext, AiPromptType promptType = AiPromptType.Chat)
        {
            try
            {

                var prompt = BuildPrompt(
                    promptType,
                    userMessage,
                    conversationContext,
                    userContext);

                var request = new
                {
                    model = _apiModel,
                    prompt = prompt,
                    stream = false,
                    options = new
                    {
                        temperature = 0.7,
                        top_p = 0.9,
                        top_k = 40
                    }
                };

                var json = JsonSerializer.Serialize(request);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                Console.WriteLine($"Sending request to Ollama...");
                Console.WriteLine($"URL: {_apiUrl}");
                Console.WriteLine($"Request: {json}");

                var response = await _httpClient.PostAsync(_apiUrl, content);

                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    throw new Exception($"Ollama API returned {response.StatusCode}: {errorContent}");
                }

                var responseContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Raw response: {responseContent}");

                var aiResponse = JsonSerializer.Deserialize<AiResponse>(responseContent);

                if (string.IsNullOrEmpty(aiResponse?.response))
                {
                    throw new Exception("AI returned empty or null response");
                }

                return aiResponse.response;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetAiResponseAsync: {ex.Message}");
                throw;
            }
        }



        private string BuildPrompt(
            AiPromptType promptType,
             string userMessage,
             string conversationContext,
             string userContext)
        {
            return promptType switch
            {
                AiPromptType.ProfileReview =>
                    $"You are an expert dating profile reviewer.\n" +
                    $"Profile information: {userContext}\n" +
                    $"User request: {userMessage}\n" +
                    $"Give constructive, friendly feedback.",

                AiPromptType.IceBreaker =>
                    $"You are a dating app assistant specialized in ice breakers.\n" +
                    $"Conversation context: {conversationContext}\n" +
                    $"User profile: {userContext}\n" +
                    $"Generate a playful and engaging first message.",

                AiPromptType.PredictNextReply =>
                    $"You are a conversational AI that predicts the next reply in a dating app chat.\n" +
                    $"Conversation context: {conversationContext}\n" +
                    $"User profile: {userContext}\n" +
                    $"Based on the conversation so far, suggest the most likely next reply from the other person.",


                _ => // Chat (default)
                    $"Conversation context: {conversationContext}\n\n" +
                    $"User's current message: {userMessage}\n" +
                    $"Please provide a helpful and relevant reply in a playful tone.\n" +
                    $"Additional user context: {userContext}"
                
            };
        }



    }
}