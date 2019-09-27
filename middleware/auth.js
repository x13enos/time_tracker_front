export default function ({ store, redirect }) {
  if (!store.getters.userAuthorized) {
    return redirect('/auth/sign-in')
  }
}
