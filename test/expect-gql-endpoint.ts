export type Query = { variables: Record<string, unknown>; query: string }

function hasErrors(response: any) {
  return response?.body?.errors || response.body === undefined
}

export function displayErrors(response: any) {
  if (hasErrors(response)) {
    const formattedError = JSON.stringify(response.body, null, 2)
    console.error(formattedError)
  }
}

export function getDataKey(query: Query) {
  const graphqlDataKeyPattern = /.+?{\s*(.+?)\s*[({]/

  const [, dataKey] = query.query.match(graphqlDataKeyPattern)

  return dataKey
}