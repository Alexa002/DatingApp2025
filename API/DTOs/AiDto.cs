using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AiDto
    {
        [JsonPropertyName("choices")]
        public List<OpenAiChoice> Choices { get; set; }
    }

    
    public class OpenAiChoice
    {
        [JsonPropertyName("message")]
        public OpenAiMessage Message { get; set; }
    }

    
    public class OpenAiMessage
    {
        [JsonPropertyName("content")]
        public string Content { get; set; }
    }
}
