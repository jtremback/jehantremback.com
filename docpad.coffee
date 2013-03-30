_ = require('underscore')

# Define the Configuration
docpadConfig = {
  growl: false
  templateData:
    site:
      title: "Jehan's Portfolio"

    getPreparedTitle: (input) -> if @document.title then "#{@document.title} #{input} #{@site.title}" else "#{@site.title} #{input}"

    # gets all pages in a certain category passed in
    getPages: (category) ->
      @getCollection("html").findAllLive({category: category})

    # gets json encoded list of all categories and pages therein (will become all json needed by frontend)
    makeJSON: ->
      # establish object to hold everything
      categories = {};
      # iterate thru documents
      for document in @getCollection('documents')
        documentName = document.getMeta().get('basename')
        documentCategories = document.getMeta().get('categories')
        for documentCategory in documentCategories
          if categories.documentCategory?
            categories.documentCategory.push documentName
          else
            categories.documentCategory = [documentName]


    # turns root relative url to hash
    rootRelHashify: (url) ->
      regex = /\/([^.]*)/
      result = regex.exec(url)

      return "#" + result[1]

}

# Export the Configuration
module.exports = docpadConfig
