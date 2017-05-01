require "sinatra"
require "slim"
require 'json'
require './app_data'
require "sinatra/reloader" if development?

get "/" do
  slim :index, locals: { page: 'index'}
end

get "/about" do
  slim :about, locals: { page: 'about'}
end

get '/image-page/:key' do
  title = AppData::IMAGES.detect{ |image| image[:key] == params[:key]}[:title] rescue nil
  slim :image_page, locals: {page: '',
    title: title}
end
