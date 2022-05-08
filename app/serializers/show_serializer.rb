class ShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :rating, :photo
  has_many :posts
  has_many :ratings




end
