using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AiAssistanceRequest
    {
        public string UserMessage { get; set; }
        public string ConversationContext { get; set; }

        public string UserContext { get; set; }
    }
}