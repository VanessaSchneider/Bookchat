class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :email, :photo, :age, :bio
  has_many :posts
  has_many :comments
  has_many :shows
  has_many :ratings
end
