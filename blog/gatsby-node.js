const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
    const { createpage } = actions
    return new Promise((resolve, reject) => {
        graphql(`
        {
            allContentfulBlogPost {
              edges {
                node {
                  id
                  slug
                }
              }
            }
          }
          
        `).then(result => {
            if (result.errors) {
                reject(result.errors)
            }
            result.data.allContentfulBlogPost.edges.forEach((edge) => {
                this.createPages({
                    path: edge.node.slug,
                    component: path.resolve(`./src/templates/blog-post.js`),
                    context: {
                        slug: edge.node.slug
                    }
                })
            })
            resolve()
        })
    })
}