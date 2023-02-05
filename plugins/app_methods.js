import GlobalMethods from "@/services/global_methods";

export default (ctx, inject) => {
  inject('appMethods', GlobalMethods);
}
