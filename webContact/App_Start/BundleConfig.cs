using System.Web;
using System.Web.Optimization;

namespace webContact
{
    public class BundleConfig
    {
       public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularJS").Include(
                      "~/Scripts/Angular1.3.5/angular.js",
                      "~/Scripts/Angular1.3.5/angular-route.js",
                      "~/Scripts/Angular1.3.5/angular-resource.js",
                      "~/Scripts/Angular1.3.5/angular-animate.js",
                      "~/Scripts/Angular1.3.5/angular-ui-bootstrap.js",
                      "~/Scripts/Angular1.3.5/Plugins/loading-bar.js",
                      "~/Scripts/Angular1.3.5/Plugins/toaster.js"));

            bundles.Add(new ScriptBundle("~/bundles/tutorialApp").Include(
                       "~/App/tutorialApp.js",
                       "~/App/appRoute.js",
                       "~/App/contact/service/contactDataService.js",
                       "~/App/contact/controller/contactController.js",
                       "~/App/user/service/userDataService.js",
                       "~/App/user/controller/userController.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/bootstrap.footer.bottom.css",
                      "~/Content/loading-bar.css",
                      "~/Content/toaster.css"));
       }
    }
}
