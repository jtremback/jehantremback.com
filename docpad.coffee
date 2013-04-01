_ = require('underscore')
categories = {}

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

    # turns root relative url to hash
    rootRelHashify: (url) ->
      regex = /\/([^.]*)/
      result = regex.exec(url)

      return "#" + result[1]

    # gets json encoded list of all categories and pages therein (will become all json needed by frontend)
    makeJSON: ->
      # establish object to hold everything
      categories = {}
      # test ability to log documents
      console.log(@getCollection('documents'))

      # iterate thru documents
      @getCollection('documents').each (document) ->
        documentName = document.getMeta().get('basename')
        documentCategories = document.getMeta().get('category')

        # iterate thru categories 
        for documentCategory in documentCategories

          # check if a key for category already exists in categories obj 
          if categories.documentCategory?
            # add the document name to it
            categories.documentCategory.push documentName
          else
            # or create it with the document name
            categories.documentCategory = [documentName]

      return categories
}

# Export the Configuration
module.exports = docpadConfig
