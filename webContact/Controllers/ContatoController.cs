using System.Linq;
using System.Net;
using System.Web.Mvc;
using webContact.Models;

namespace webContact.Controllers
{
    public class ContatoController : Controller
    {
        private ContatoContext ContatosDB = new ContatoContext();

        #region [ GetContatos ]
        public ActionResult GetContatos()
        {
            var contatos = ContatosDB.Contatos;
            return Json(contatos, JsonRequestBehavior.AllowGet);
        } 
        #endregion

        #region [ AddContato ]
        public ActionResult AddContato(Contato entity)
        {
            try
            {
                ContatosDB.Contatos.Add(entity);
                ContatosDB.SaveChanges();
                return new HttpStatusCodeResult(HttpStatusCode.Created);
            }
            catch
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
        } 
        #endregion

        #region [ UpdateContato ]
        public ActionResult UpdateContato(Contato entity)
        {
            try
            {
                ContatosDB.Entry(entity).State = System.Data.Entity.EntityState.Modified;
                ContatosDB.SaveChanges();
                return new HttpStatusCodeResult(HttpStatusCode.Accepted);
            }
            catch
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
        } 
        #endregion

        #region [ DeleteContato ]
        public ActionResult DeleteContato(int id)
        {
            var entityBd = ContatosDB.Contatos.First(r => r.Id == id);
            try
            {
                ContatosDB.Contatos.Remove(entityBd);
                ContatosDB.SaveChanges();
                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }
            catch
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
        } 
        #endregion
    }
}