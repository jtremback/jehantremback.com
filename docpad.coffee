_ = require('underscore')
categories = {}

# Define the Configuration
docpadConfig = {
  growl: false

  collections:
    posts: ->
      @getCollection("html").findAllLive({relativeOutDirPath: 'posts'},[{date: -1}]).on "add", (model) ->
        model.setMetaDefaults({layout: "post"})

    projects: ->
      @getCollection("html").findAllLive({relativeOutDirPath: 'projects'},[{title: 1}]).on "add", (model) ->
        model.setMetaDefaults({layout: "project"})

    pages: ->
      @getCollection("html").findAllLive({relativeOutDirPath: 'pages'}).on "add", (model) ->
        model.setMetaDefaults({layout: "page"})

    pictures: ->
      @getCollection("html").findAllLive({relativeOutDirPath: 'pictures'},[{date: -1}]).on "add", (model) ->
        model.setMetaDefaults({layout: "picture"})
  
  templateData:
    site:
      title: "Jehan's Portfolio"

      categories: [
        id: "web_apps"
        name: "Web Apps"
        default: "hypothesis"
      ]



    getPreparedTitle: (input) -> if @document.title then "#{@document.title} #{input} #{@site.title}" else "#{@site.title} #{input}"

    # gets all pages in a certain category passed in
    getPagesByCategory: (category) ->
      @getCollection("html").findAllLive({category: category})

    # turns root relative url to hash
    rootRelHashify: (url) ->
      regex = /\/([^.]*)/
      result = regex.exec(url)

      return "#" + result[1]
}

# Export the Configuration
module.exports = docpadConfig
