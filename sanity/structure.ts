import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('homeBanner').title('Home Banner'),
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('blogPost').title('Posts'),
      S.divider(),
      S.documentTypeListItem('siteSettings').title('Site Settings'),
      S.divider(),
    ])
 