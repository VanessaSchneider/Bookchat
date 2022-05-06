class User < ApplicationRecord
    has_secure_password
    has_many :posts
    has_many :comments, through: :posts
    has_many :shows, through: :posts
    has_many :friends
    has_many :ratings
end
