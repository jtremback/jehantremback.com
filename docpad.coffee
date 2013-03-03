# Define the Configuration
docpadConfig = {
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
}

# Export the Configuration
module.exports = docpadConfig