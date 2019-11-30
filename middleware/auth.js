export default async function ({ store }) {
  if (store.state.user.email) return
  await store.dispatch("getUserInfo")
}
