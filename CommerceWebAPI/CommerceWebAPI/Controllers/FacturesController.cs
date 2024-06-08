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
    public class FacturesController : ControllerBase
    {
        private readonly CommerceContext _context;

        public FacturesController(CommerceContext context)
        {
            _context = context;
        }

        // GET: api/Factures
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Facture>>> GetFactures()
        {
            return await _context.Factures.ToListAsync();
        }

        // GET: api/Factures/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Facture>> GetFacture(int id)
        {
            var facture = await _context.Factures.FindAsync(id);

            if (facture == null)
            {
                return NotFound();
            }

            return facture;
        }

        // PUT: api/Factures/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFacture(int id, Facture facture)
        {
            if (id != facture.Id)
            {
                return BadRequest();
            }

            // Update the date with today's date
            facture.Date = DateTime.Now;

            // Update the facture
            _context.Entry(facture).State = EntityState.Modified;

            // Update associated facture data
            foreach (var factureData in facture.FactureData)
            {
                _context.Entry(factureData).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();

            // Retrieve the updated facture from the database
            var updatedFacture = await _context.Factures
                                                .Include(f => f.FactureData) // Include related FactureData
                                                .FirstOrDefaultAsync(f => f.Id == id);

            // Return the updated facture
            return Ok(updatedFacture);
        }



        // POST: api/Factures
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Facture>> PostFacture(Facture facture)
        {
            _context.Factures.Add(facture);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFacture", new { id = facture.Id }, facture);
        }

        // DELETE: api/Factures/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFacture(int id)
        {
            var facture = await _context.Factures.FindAsync(id);
            if (facture == null)
            {
                return NotFound();
            }

            _context.Factures.Remove(facture);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FactureExists(int id)
        {
            return _context.Factures.Any(e => e.Id == id);
        }

        // GET: api/Factures/ByGeneral/{generalId}
        [HttpGet("ByGeneral/{generalId}")]
        public async Task<ActionResult<Facture>> GetFactureByGeneral(int generalId)
        {
            var facture = await _context.Factures
                .Include(f => f.FactureData) // Include FactureData
                .FirstOrDefaultAsync(f => f.GeneralId == generalId);

            if (facture == null)
            {
                return NotFound();
            }

            return facture;
        }



    }
}
