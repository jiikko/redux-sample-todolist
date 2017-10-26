# API ちょう雑だからあんま気にしないで
require 'bundler'
Bundler.require
require 'json'

REDIS = ENV['REDIS_URL'] ? Redis.new(url: ENV['REDIS_URL']) : Redis.new

get '/' do
  haml :react
end

def res
  {incomplete: JSON.parse(REDIS.get("todo_sample_redux/incomplete") || [].to_json), complete: JSON.parse(REDIS.get("todo_sample_redux/complete") || [].to_json)}.to_json
end

get '/api/todos' do
  content_type :json

res
end

post '/api/todos' do
  content_type :json
 
  title = JSON.parse(request.body.read)['title']
  incomplete = JSON.parse(REDIS.get("todo_sample_redux/incomplete") || [].to_json)
  incomplete << {id: SecureRandom.uuid, title: title}
  REDIS.set("todo_sample_redux/incomplete", incomplete.to_json)
  
  res
end

put '/api/todos/:id' do
  content_type :json

  incomplete = JSON.parse(REDIS.get("todo_sample_redux/incomplete") || [].to_json)
  task = incomplete.select{|x| x["id"] == params[:id] }.first
  incomplete.reject!{|x| x["id"] == params[:id] }

  complete = JSON.parse(REDIS.get("todo_sample_redux/complete") || [].to_json)
  complete << task
  
  REDIS.set("todo_sample_redux/incomplete", incomplete.to_json)
  REDIS.set("todo_sample_redux/complete", complete.to_json)
  
  res
end

put '/api/todos/:id/restore' do
  content_type :json

  complete = JSON.parse(REDIS.get("todo_sample_redux/complete") || [].to_json)
  task = complete.select{|x| x["id"] == params[:id] }.first
  complete.reject!{|x| x["id"] == params[:id] }

  incomplete = JSON.parse(REDIS.get("todo_sample_redux/incomplete") || [].to_json)
  incomplete << task

  REDIS.set("todo_sample_redux/incomplete", incomplete.to_json)
  REDIS.set("todo_sample_redux/complete", complete.to_json)

  res
end
