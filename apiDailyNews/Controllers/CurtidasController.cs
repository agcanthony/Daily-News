using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class CurtidasController : ControllerBase
{
  private readonly DataContext context;

  public CurtidasController(DataContext Context)
  {
    context = Context;
  }

  [HttpPost]
  public async Task<ActionResult> Post([FromBody] Curtidas model)
  {
    try
    {
      context.Curtidas.Add(model);
      await context.SaveChangesAsync();
      return Ok("Curtidas salvo com sucesso");
    }
    catch
    {
      return BadRequest("Falha ao cadastrar o Curtidas");
    }
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Curtidas>>> Get()
  {
    try
    {
      return Ok(await context.Curtidas.ToListAsync());
    }
    catch (Exception ex)
    {
      return BadRequest("Erro ao consultar os Curtidas " + ex.Message);
    }
  }

  [HttpGet("{artigoId}")]
  public async Task<ActionResult<IEnumerable<Curtidas>>> Get(int artigoId)
  {
    try
    {
      var curtidas = await context.Curtidas.Where(c => c.ArtigoID == artigoId).ToListAsync();
      return Ok(curtidas);
    }
    catch (Exception ex)
    {
      return BadRequest("Erro ao consultar as Curtidas " + ex.Message);
    }
  }

  [HttpPut("{id}")]
  public async Task<ActionResult> Put([FromRoute] int id, [FromBody] Curtidas model)
  {
    if (id != model.Id)
      return BadRequest();

    try
    {
      if (await context.Curtidas.AnyAsync(p => p.Id == id) == false)
        return NotFound();

      context.Curtidas.Update(model);
      await context.SaveChangesAsync();
      return Ok("Alterado com sucesso");
    }
    catch
    {
      return BadRequest();
    }
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> Delete([FromRoute] int id)
  {
    try
    {
      Artigo? model = await context.Artigo.FindAsync(id);

      if (model == null)
        return NotFound();

      context.Artigo.Remove(model);
      await context.SaveChangesAsync();
      return Ok("Excluído com sucesso");
    }
    catch
    {
      return BadRequest("Falha ao excluir");
    }
  }
}