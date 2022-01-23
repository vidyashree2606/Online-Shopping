using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backendAPI.Controllers
{
  
    public class ErrorController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }
        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails { Title="This is a bad request"});

        }
        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        }
        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("1stProblem","Error number 1");
            ModelState.AddModelError("2ndProblem", "Error number 2");
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("Server Error");
        }
    }
}
