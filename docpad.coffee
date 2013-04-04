_ = require('underscore')
categories = {}

# Define the Configuration
docpadConfig = {
  growl: false

  # collections:
  #     posts: ->
  #         @getCollection("html").findAllLive({relativeOutDirPath: 'posts'},[{date:-1}])

  templateData:
    site:
      title: "Jehan's Portfolio"

      categories: [
        id: "id",
        name: "Industrial Design",
        default: "wbtm"
      ,
        id: "web_sites"
        name: "Web Sites"
        default: "eddan"
      ,
        id: "mobile_apps",
        name: "Mobile Apps",
        default: "scope"
      ,
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
