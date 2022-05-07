class User < ApplicationRecord
    has_secure_password
    has_many :posts
    has_many :comments, through: :posts
    has_many :shows, through: :posts
    has_many :friends
    has_many :ratings
    
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :age, presence: true, numericality: {greater_than_or_equal_to: 18}
    validates :photo, presence: true
end
