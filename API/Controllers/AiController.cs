using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AiController : BaseApiController
    {
         private readonly IAiChatService _openAi;

        public AiController(IAiChatService openAi)
        {
            _openAi = openAi;

        }

        [HttpPost("assist")]
        public async Task<IActionResult> GetAssistance([FromBody] AiAssistanceRequest request)
        {
            try
            {
                var response = await _openAi.GetAiResponseAsync(request.UserMessage, request.ConversationContext, request.UserContext);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Failed to get AI assistance / " + ex.Message });
            }
        }
    }
}