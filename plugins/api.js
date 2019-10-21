import Api from "@/services/api/requests";

export default ({ app }, inject) => {
  inject('api', new Api(app.router));
}
