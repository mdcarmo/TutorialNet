using System.Linq;
using System.Net;
using System.Web.Mvc;
using webContact.Helpers;
using webContact.Models;

namespace webContact.Controllers
{
    public class ContactController : JsonController
    {
        private ContactContext ContactsDB = new ContactContext();

        #region [ GetContacts ]
        public ActionResult GetContacts()
        {
            var contatos = ContactsDB.Contacts;
            return Json(contatos, JsonRequestBehavior.AllowGet);
        } 
        #endregion

        #region [ AddContact ]
        public ActionResult AddContact(Contact entity)
        {
            try
            {
                ContactsDB.Contacts.Add(entity);
                ContactsDB.SaveChanges();
                return new HttpStatusCodeResult(HttpStatusCode.Created);
            }
            catch
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
        } 
        #endregion

        #region [ UpdateContact ]
        public ActionResult UpdateContact(Contact entity)
        {
            try
            {
                ContactsDB.Entry(entity).State = System.Data.Entity.EntityState.Modified;
                ContactsDB.SaveChanges();
                return new HttpStatusCodeResult(HttpStatusCode.Accepted);
            }
            catch
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
        } 
        #endregion

        #region [ DeleteContact ]
        public ActionResult DeleteContact(int id)
        {
            var entityBd = ContactsDB.Contacts.First(r => r.Id == id);
            try
            {
                ContactsDB.Contacts.Remove(entityBd);
                ContactsDB.SaveChanges();
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