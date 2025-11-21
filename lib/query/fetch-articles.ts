import { prisma } from "../prisma"


export const fetchArticleByQuery = async(searchText : string, skip : number, take : number) =>{
  const [articles, total]  = await prisma.$transaction([
    prisma.articles.findMany({
      where :{
        OR : [
          {title : {contains : searchText, mode : "insensitive"}},
          {category : {contains : searchText , mode : 'insensitive'}}
        ]
      },
      include : {
        author : {
          select : {
            name : true,
             email : true,
             imageUrl : true
          }
        }
      },
      skip : skip,
      take : take
    }),
    prisma.articles.count({
      where : {
        OR : [
          {title : {contains : searchText, mode : 'insensitive'}},
          {category : {contains : searchText, mode : 'insensitive'}}
        ]
      }
    })
    
  ])
  return {articles, total}
}