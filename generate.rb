require 'slim'
require 'ostruct'
require 'json'
require './app_data'
require './image'

`mkdir -p public/svgs`
`mkdir -p public/pngs/small`
`mkdir -p public/pngs/medium`
`mkdir -p public/pngs/large`

`node genimages.js`

`cp svgs/*.svg public/svgs/`
`cp pencil_shorter_in_fist-300px.png public/`

layout_contents = File.open("views/layout.slim", "rb").read
layout = Slim::Template.new { layout_contents }

# index
contents = File.open("views/index.slim", "rb").read
contents = Slim::Template.new { contents }.render(OpenStruct.new(images: AppData::IMAGES))
File.open("public/index.html", 'w') do |output|
  output.write layout.render(OpenStruct.new(
    png_server_path: '/pencil_shorter_in_fist-300px.png',
    description: "High quality vector graphics with free and open license agreements that you can use for resistance activities.",
    server_html_path: "/",
    page: 'index',
    images: AppData::IMAGES)) { contents }
end

# about
contents = File.open("views/about.slim", "rb").read
contents = Slim::Template.new { contents }.render(OpenStruct.new(images: AppData::IMAGES))
File.open("public/about.html", 'w') do |output|
  output.write layout.render(OpenStruct.new(
    png_server_path: '/pencil_shorter_in_fist-300px.png',
    description: "High quality vector graphics with free and open license agreements that you can use for resistance activities.",
    server_html_path: "/about.html",
    page: 'about',
    images: AppData::IMAGES)) { contents }
end

AppData::IMAGES.map{|h|Image.new(h)}.each do |image|
  contents = File.open("views/image_page.slim", "rb").read

  contents = Slim::Template.new { contents }.render(image)
  File.open(image.full_html_path, 'w') do |output|
    output.write layout.render(image) { contents }
  end
end

`webpack`

# aws s3 sync . s3://artofresistance.design --acl public-read
