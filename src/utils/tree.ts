export const toTree = <T extends Record<string, any>>(
  data: T[],
  options: {
    idKey?: string
    parentKey?: string
    childrenKey?: string
  } = {}
) => {
  const { idKey = 'id', parentKey = 'parentId', childrenKey = 'children' } = options
  const map = new Map<string | number, T>()
  const result: T[] = []

  data.forEach((item) => {
    map.set(item[idKey], { ...item, [childrenKey]: [] })
  })

  data.forEach((item) => {
    const node = map.get(item[idKey])!
    if (item[parentKey]) {
      const parent = map.get(item[parentKey])
      if (parent) {
        parent[childrenKey].push(node)
      }
    } else {
      result.push(node)
    }
  })

  return result
}
