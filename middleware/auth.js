export default async function ({ redirect, store }) {
  if (store.state.user.email) return;

  return store.dispatch("getUserInfo")
    .then()
    .catch(() => { redirect('/auth/sign-in') })
}
