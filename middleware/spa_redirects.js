const redirects = [
  {
    "from": "/",
    "to": "/tasks"
  }
]

export default function({ redirect, route }) {
  const redirectItem = redirects.find(r => r.from === route.path)

  if (redirectItem) {
    return redirect(redirectItem.to)
  }
}
