using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Interfaces
{
    public interface IAiChatService
    {
        Task<string> GetAiResponseAsync(string userMessage, string conversationContext, string userContext, AiPromptType promptType = AiPromptType.Chat);
    }
    
}