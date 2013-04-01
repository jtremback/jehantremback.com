_ = require('underscore')
categories = {}

# Define the Configuration
docpadConfig = {
  growl: false
  templateData:


    site:
      title: "Jehan's Portfolio"

      categories: [
        id: "web_apps"
        name: "Web Apps" 
      ,
        id: "web_sites"
        name: "Web Sites"
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
