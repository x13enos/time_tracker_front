import GlobalMethods from "@/services/global_methods";

export default (ctx, inject) => {
  inject('appMethods', GlobalMethods);
  inject('currentFontClass', () => { return ctx.i18n.locale == 'ru' ? 'montserrat' : 'poppins' })
}
