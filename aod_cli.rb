#!/usr/bin/env ruby

require 'bundler/setup'
require 'slim'
require 'ostruct'
require 'json'
require 'thor'
require './lib/app_data'
require './lib/image'

class AodCli < Thor

  desc 'create_public_dirs', 'Create the required directories in public'
  def create_public_dirs
    `mkdir -p public/svgs`
    `mkdir -p public/pngs/small`
    `mkdir -p public/pngs/medium`
    `mkdir -p public/pngs/large`
  end

  desc 'copy_svgs', 'Copy the SVG images to public/'
  def copy_svgs
    `cp svgs/*.svg public/svgs/`
  end

  desc 'generate_images', 'Generate small, medium, and large PNG images for each SVG'
  def generate_images
    puts `node genimages.js`
  end

  desc 'generate_index', 'Generate the index page'
  def generate_index
    render_static_page('index', '/')
  end

  desc 'generate_about', 'Generate the about page'
  def generate_about
    render_static_page('about', '/about.html')
  end

  desc 'generate_what_is_svg', 'Generate the what is SVG page'
  def generate_what_is_svg
    render_static_page('what_is_svg', '/what_is_svg.html')
  end

  desc 'generate_image_pages', 'Generate an HTML page for each SVG image'
  def generate_image_pages
    AppData::IMAGES.map{|h|Image.new(h)}.each do |image|
      slim = File.open("views/image_page.slim", "rb").read
      contents = Slim::Template.new { slim }.render(image)
      File.open(image.full_html_path, 'w') do |output|
        output.write layout.render(image) { contents }
      end
    end
  end

  desc 'webpack', 'Run webpack to bundle up the Javascript and SCSS'
  def webpack
    `webpack`
  end

  desc 'build', 'Run all the generators and webpack'
  def build
    create_public_dirs
    generate_images
    generate_index
    generate_about
    generate_what_is_svg
    generate_image_pages
    webpack
    copy_svgs
    copy_misc_stuff_to_public
  end

  desc 'sync_to_s3', 'Sync everythign to S3. THIS MEANS LIVE.'
  def sync_to_s3
    Dir.chdir('public') do
      `aws s3 sync . s3://artofresistance.design --acl public-read`
    end
  end

  private

    def render_static_page(name, server_path)
      slim = File.open("views/#{name}.slim", "rb").read
      contents = Slim::Template.new { slim }.render(OpenStruct.new(images: AppData::IMAGES))
      File.open("public/#{name}.html", 'w') do |output|
        output.write layout.render(OpenStruct.new(
          png_server_path: '/pencil_shorter_in_fist-300px.png',
          description: "High quality vector graphics with free and open license agreements that you can use for activities.",
          server_html_path: server_path,
          page: name)) { contents }
      end
    end

    def copy_misc_stuff_to_public
      `cp assets/pencil_shorter_in_fist-300px.png public/`
      `cp assets/abe.png public/`
    end

    def layout
      return @layout if @layout
      layout_contents = File.open("views/layout.slim", "rb").read
      @layout = Slim::Template.new { layout_contents }
    end

end

AodCli.start(ARGV)
