source "http://rubygems.org"

gem "sinatra"
gem "thin"
gem "rack-contrib"
gem "middleman", "~> 2.0.8"
gem "execjs"
gem "rack-codehighlighter"
gem "coderay"
gem 'sprockets', :git => 'https://github.com/sstephenson/sprockets.git'

group :production do
  gem 'therubyracer-heroku', '0.8.1.pre3'
end

group :development do
  gem "redcarpet"
  gem "builder"
  gem "middleman", "~> 2.0.8"
  gem "heroku"
end