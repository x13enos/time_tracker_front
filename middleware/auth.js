export default function ({ store }) {
  if (store.state.user.email) return
  store.dispatch("getUserInfo")
}
