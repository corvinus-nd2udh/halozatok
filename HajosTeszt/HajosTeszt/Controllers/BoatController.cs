using HajosTeszt.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class BoatController : ControllerBase
    {
        [HttpGet]
        [Route("questions/all")]
        public ActionResult M1()
        {
            hajostesztContext context = new hajostesztContext();
            var kerdesek = from x in context.Questions
                           select x.QuestionText;
            return new JsonResult(kerdesek);
        }

        [HttpGet]
        [Route("questions/{sorszam}")]
        public ActionResult M2(int sorszam)
        {
            hajostesztContext context = new hajostesztContext();
            var kerdes = (from x in context.Questions
                          where x.QuestionId == sorszam
                          select x).FirstOrDefault();

            if (kerdes == null) return BadRequest("Nincs ilyen sorszamu kerdes");
            return new JsonResult(kerdes);
        }

        [HttpGet]
        [Route("questions/count")]
        public ActionResult M3()
        {
            hajostesztContext context = new hajostesztContext();
            var osszSzam = (from x in context.Questions
                            select x).Count();
            return new JsonResult(osszSzam);
        }
    }
}
