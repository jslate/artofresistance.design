class Image

  attr_accessor :title, :key, :categories

  def initialize(hash)
    @title = hash[:title]
    @key = hash[:key]
    @categories = hash[:categories]
  end

  def filename
    "#{@key}.svg"
  end

  def png_filename
    "#{@key}.png"
  end

  def png_server_path
    "/pngs/medium/#{png_filename}"
  end

  def full_html_path
    "public/#{@key}.html"
  end

  def server_html_path
    "/#{@key}.html"
  end

  def page
    key
  end

  def description
    "An open license vector graphic from artofresistance.design."
  end


end
