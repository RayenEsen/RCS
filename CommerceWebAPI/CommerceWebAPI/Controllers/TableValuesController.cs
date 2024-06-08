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
    public class TableValuesController : ControllerBase
    {
        private readonly CommerceContext _context;

        public TableValuesController(CommerceContext context)
        {
            _context = context;
        }

        // GET: api/TableValues
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TableValues>>> GetTableValues()
        {
            return await _context.TableValues.ToListAsync();
        }

        // GET: api/TableValues/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TableValues>> GetTableValues(int id)
        {
            var tableValues = await _context.TableValues.FindAsync(id);

            if (tableValues == null)
            {
                return NotFound();
            }

            return tableValues;
        }

        // PUT: api/TableValues
        [HttpPut]
        public async Task<IActionResult> PutTableValues(List<TableValues> tableValues)
        {
            foreach (var item in tableValues)
            {
                _context.Entry(item).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();

            // Calculate the sum of Benefice_net from all tableValues
            var sumBeneficeNet = tableValues.Sum(tv => tv.Benefice_net);

            // Retrieve the GeneralId from the first item in tableValues
            var generalId = tableValues.FirstOrDefault()?.GeneralId;

            if (generalId.HasValue)
            {
                // Find the corresponding General entity
                var general = await _context.Generals.FindAsync(generalId.Value);

                if (general != null)
                {
                    // Update the MontantTotal property
                    general.MontantTotal = sumBeneficeNet;

                    await _context.SaveChangesAsync();
                }
            }

            return NoContent();
        }


        // POST: api/TableValues
        [HttpPost]
        public async Task<ActionResult<TableValues>> PostTableValues(int generalId)
        {
            var tableValues = new TableValues
            {
                GeneralId = generalId,
                Client = "Nouveau Client",
            };

            _context.TableValues.Add(tableValues);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTableValues", new { id = tableValues.Id }, tableValues);
        }

        // DELETE: api/TableValues/DeleteByGeneralId/{generalId}
        [HttpDelete("DeleteByGeneralId/{generalId}")]
        public async Task<IActionResult> DeleteTableValuesByGeneralId(int generalId, List<TableValues> tableValues)
        {
            var tableValueIds = tableValues.Select(tv => tv.Id).ToList();

            var tableValuesToDelete = await _context.TableValues
                .Where(tv => tv.GeneralId == generalId && tableValueIds.Contains(tv.Id))
                .ToListAsync();

            if (tableValuesToDelete == null || !tableValuesToDelete.Any())
            {
                return NotFound();
            }

            _context.TableValues.RemoveRange(tableValuesToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // GET: api/TableValues/ByGeneralId/{generalId}
        [HttpGet("ByGeneralId/{generalId}")]
        public async Task<ActionResult<IEnumerable<TableValues>>> GetTableValuesByGeneralId(int generalId)
        {
            var tableValues = await _context.TableValues
                .Where(tv => tv.GeneralId == generalId)
                .ToListAsync();

            if (tableValues == null || !tableValues.Any())
            {
                return NotFound();
            }

            return tableValues;
        }

        // POST: api/TableValues/AddMultiple
        [HttpPost("AddMultiple")]
        public async Task<ActionResult<IEnumerable<TableValues>>> PostMultipleTableValues(List<TableValues> tableValues)
        {
            if (tableValues == null || !tableValues.Any())
            {
                return BadRequest("No table values provided.");
            }

            _context.TableValues.AddRange(tableValues);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTableValues", tableValues);
        }



        private bool TableValuesExists(int id)
        {
            return _context.TableValues.Any(e => e.Id == id);
        }
    }
}
