require 'slim'
require 'ostruct'
require 'json'
require './app_data'

`mkdir -p public/svgs`
`mkdir -p public/pngs/small`
`mkdir -p public/pngs/medium`
`mkdir -p public/pngs/large`

`node genimages.js`

`cp svgs/*.svg public/svgs/`

layout_contents = File.open("views/layout.slim", "rb").read
layout = Slim::Template.new { layout_contents }

['index', 'about'].each do |page|
  contents = File.open("views/#{page}.slim", "rb").read
  contents = Slim::Template.new { contents }.render
  File.open("public/#{page}.html", 'w') do |output|
    output.write layout.render(OpenStruct.new(page: page, images: AppData::IMAGES)) { contents }
  end
end

AppData::IMAGES.each do |image|
  contents = File.open("views/image_page.slim", "rb").read
  contents = Slim::Template.new { contents }.render(OpenStruct.new(image))
  File.open("public/#{image[:key]}.html", 'w') do |output|
    output.write layout.render(OpenStruct.new(page: '', images: AppData::IMAGES)) { contents }
  end
end

`webpack`

# aws s3 sync . s3://artofresistance.design --acl public-read
