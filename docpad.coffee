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
        id: "web_apps"
        name: "Web Apps"
        default: "hypothesis"
      ,
        id: "mobile_apps",
        name: "Mobile Apps",
        default: "scope"
      ,
        id: "web_sites"
        name: "Web Sites"
        default: "eddan"
      ,
        id: "id",
        name: "Industrial",
        default: "wbtm"
      ]

      projects: [
        slug: "hypothesis",
        name: "Hypothesis",
        frontpic: "hypothesis_main"
      ,
        slug: "scope",
        name: "Scope",
        frontpic: "scope_main"
      ,
        slug: "chronometer",
        name: "Chronometer",
        frontpic: "chronometer_main"
      ,
        slug: "expdesigner",
        name: "Expression Designer",
        frontpic: "expdesigner_main"
      ,
        slug: "hactus",
        name: "Hactus",
        frontpic: "hactus_main"
      ]



    getPreparedTitle: -> if @document.title then "#{@document.title} | #{@site.title}" else "#{@site.title}"

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
