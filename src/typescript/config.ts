export const getHost = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.PRODUCTION_HOSTNAME as string
  } else {
    return process.env.STAGING_HOSTNAME as string
  }
}

export const getArticlesPerPage = (): number => {
  return parseInt(process.env.ARTICLES_PER_PAGE || '0', 10)
}

export const getEntriesPerApiPage = (): number => {
  return parseInt(process.env.ENTRIES_PER_API_PAGE || '0', 10)
}