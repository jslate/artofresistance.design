require "sinatra"
require "slim"
require 'json'
require "sinatra/reloader" if development?

IMAGES = [{:filename=>"books.svg", :key=>"books", :categories=>["education"]},
 {:filename=>"miracle-elixir.svg", :key=>"miracle-elixir",  title: 'Miracle Elixir', :categories=>["science"]},
 {:filename=>"pc-sa.svg", :key=>"pc-sa", title: 'Politically Correctness', :categories=>["science"]},
 {:filename=>"dead-earth.svg", :key=>"dead-earth", :categories=>["science", "environment"]},
 {:filename=>"reading-on-phone.svg", :key=>"reading-on-phone", :categories=>["science"]},
 {:filename=>"hug.svg", :key=>"hug-a-scientist", :categories=>["science"]},
 {:filename=>"save-our-planet-bird.svg", :key=>"save-our-planet-bird", :categories=>["environment"]},
 {:filename=>"save-our-planet-dolphin.svg", :key=>"save-our-planet-dolphin", :categories=>["environment"]},
 {:filename=>"save-our-planet.svg", :key=>"save-our-planet", :categories=>["environment"]},
 {:filename=>"womens-rights-body.svg", :key=>"womens-rights-body", :categories=>["women's rights"]},
 {:filename=>"womens-rights-emancipation.svg", :key=>"womens-rights-emancipation", :categories=>["women's rights"]},
 {:filename=>"womens-rights-group.svg", :key=>"womens-rights-group", :categories=>["women's rights"]},
 {:filename=>"womens-rights-woman.svg", :key=>"womens-rights-woman", :categories=>["women's rights"]}]

get "/" do
  slim :index, locals: { page: 'index'}
end

get "/about" do
  slim :about, locals: { page: 'about'}
end

get '/image-page/:key' do
  title = IMAGES.detect{ |image| image[:key] == params[:key]}[:title] rescue nil
  slim :image_page, locals: {page: '', title: title}
end
