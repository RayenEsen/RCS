using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CommerceWebAPI.Models;

namespace CommerceWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneralsController : ControllerBase
    {
        private readonly CommerceContext _context;

        public GeneralsController(CommerceContext context)
        {
            _context = context;
        }

        // GET: api/Generals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<General>>> GetGenerals()
        {
            return await _context.Generals.ToListAsync();
        }

        // GET: api/Generals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<General>> GetGeneral(int id)
        {
            var general = await _context.Generals.FindAsync(id);

            if (general == null)
            {
                return NotFound();
            }

            return general;
        }



        // POST: api/Generals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<General>> PostGeneral(General general)
        {
            // Initialize properties
            general.DateDebut = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
            int lastDayOfMonth = DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month);
            general.DateFin = new DateTime(DateTime.Now.Year, DateTime.Now.Month, lastDayOfMonth);
            general.MontantTotal = 0;
            general.TableValues = new List<TableValues> { new TableValues() };
            general.Facture = new Facture();
            general.Facture.Date = DateTime.Now;
            general.TableValues[0].Client = "Nouveau Client";

            // Create FactureData instances with specified descriptions and montant values
            general.Facture.FactureData = new List<FactureData>
    {
        new FactureData { Description = "Assistance", Montant = 0 },
        new FactureData { Description = "TVA", Montant = 0 },
        new FactureData { Description = "Timbre", Montant = 1 }
    };

            // Add to context and save changes
            _context.Generals.Add(general);
            await _context.SaveChangesAsync();

            // Return the newly created object
            return CreatedAtAction("GetGeneral", new { id = general.Id }, general);
        }


        // DELETE: api/Generals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGeneral(int id)
        {
            var general = await _context.Generals.FindAsync(id);
            if (general == null)
            {
                return NotFound();
            }

            _context.Generals.Remove(general);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool GeneralExists(int id)
        {
            return _context.Generals.Any(e => e.Id == id);
        }
    }
}
